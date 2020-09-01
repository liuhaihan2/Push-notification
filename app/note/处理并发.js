// 实现并发限制
// Promise.all可以保证，promises数组中所有promise对象都达到resolve状态，才执行then回调。这时候考虑一个场景：如果你的promises数组中每个对象都是http请求，或者说每个对象包含了复杂的调用处理。而这样的对象有几十万个。那么会出现的情况是，你在瞬间发出几十万http请求（tcp连接数不足可能造成等待），或者堆积了无数调用栈导致内存溢出。这时候，我们就需要考虑对Promise.all做并发限制。Promise.all并发限制指的是，每个时刻并发执行的promise数量是固定的，最终的执行结果还是保持与原来的Promise.all一致

function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function () {
      // 边界处理，array为空数组
      if (i === array.length) {
          return Promise.resolve();
      }
      // 每调一次enqueue，初始化一个promise
      const item = array[i++];
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      // 放入promises数组
      ret.push(p);
      // promise执行完毕，从executing数组中删除
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      // 插入executing数字，表示正在执行的promise
      executing.push(e);
      // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
      let r = Promise.resolve();
      if (executing.length >= poolLimit) {
          r = Promise.race(executing);
      }
      // 递归，直到遍历完array
      return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}


// 另一种方法
class Limit {
  constructor (n) {
    this.limit = n
    this.count = 0
    this.queue = []
  }

  enqueue (fn) {
    // 关键代码: fn, resolve, reject 统一管理
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
    })
  }

  dequeue () {
    if (this.count < this.limit && this.queue.length) {
      // 等到 Promise 计数器小于阈值时，则出队执行
      const { fn, resolve, reject } = this.queue.shift()
      this.run(fn).then(resolve).catch(reject)
    }
  }

  // async/await 简化错误处理
  async run (fn) {
    this.count++
    // 维护一个计数器
    const value = await fn()
    this.count--
    // 执行完，看看队列有东西没
    this.dequeue()
    return value
  }

  build (fn) {
    if (this.count < this.limit) {
      // 如果没有到达阈值，直接执行
      return this.run(fn)
    } else {
      // 如果超出阈值，则先扔到队列中，等待有空闲时执行
      return this.enqueue(fn)
    }
  }
}

Promise.map = function (list, fn, { concurrency }) {
  const limit = new Limit(concurrency)
  return Promise.all(list.map((...args) => {
    return limit.build(() => fn(...args))
  }))
}


// 另一种方法
class requestQueue {
  constructor(max) {
    this.taskQueue = [];
    this.max = max || 10;
    setTimeout(() => {
      this.next();
    }, 0)
  }
  addTask(task) {
    this.taskQueue.push(task);
  }
  next() {
    const len = this.taskQueue.length;
    if(!len) {
      return;
    }
    const min = Math.min(len, this.max);
    for (let i = 0 ; i < min; i++) {
      this.max --;
      var task = this.taskQueue.shift();
      task().then(res => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.max ++;
        this.next();
      })
    }
  }
}
// 测试例子
const request = new requestQueue();
for(let i = 0; i < 20; i++) {
  request.addTask(function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 2000)
    })
  })
}
