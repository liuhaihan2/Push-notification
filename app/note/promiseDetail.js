//Promise 完整的实现
class Promise {
  callbacks = [];
  state = 'pending';//增加状态
  value = null;//保存结果
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve,
        reject,
      });
    });
  }
  catch(onError) {
    return this.then(null, onError);
  }
  finally(onDone) {
    if (typeof onDone !== 'function') return this.then();

    let Promise = this.constructor;
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    );
  }
  static resolve(value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise(resolve => {
        then(resolve);
      });

    } else if (value) {
      return new Promise(resolve => resolve(value));
    } else {
      return new Promise(resolve => resolve());
    }
  }
  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });

    } else {
      return new Promise((resolve, reject) => reject(value));
    }
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let fulfilledCount = 0
      const itemNum = promises.length
      const rets = Array.from({ length: itemNum })
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(result => {
          fulfilledCount++;
          rets[index] = result;
          if (fulfilledCount === itemNum) {
            resolve(rets);
          }
        }, reason => reject(reason));
      })

    })
  }
  static race(promises) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(function (value) {
          return resolve(value)
        }, function (reason) {
          return reject(reason)
        })
      }
    })
  }
  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }

    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;

    if (!cb) {//如果then中没有传递任何东西
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
      cb(this.value);
      return;
    }

    let ret;

    try {
      ret = cb(this.value);
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject
    } finally {
      cb(ret);
    }
  }
  
  _resolve(value) {
    if(this.state !== 'pending') return
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }

    this.state = 'fulfilled';//改变状态
    this.value = value;//保存结果
    this.callbacks.forEach(callback => this._handle(callback));
  }
  _reject(error) {
    if(this.state !== 'pending') return
    this.state = 'rejected';
    this.value = error;
    this.callbacks.forEach(callback => this._handle(callback));
  }
}




// promise 三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class myPromise {
    constructor(executor) {
        this.status = PENDING; // 声明初始状态；
        this.value = undefined; // fulfilled状态时 返回的信息
        this.reason = undefined; // rejected状态时 拒绝的原因；
        this.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
        this.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数
        //=>执行Excutor
        let resolve = result => { // resolve方法
            if (this.status !== PENDING) return;

            // 为什么resolve 加setTimeout?
            // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
            // 这里的平台代码指的是引擎、环境以及promise的实施代码。实践中要确保onFulfilled 和 onRejected方法异步执行，且应该在then方法被调用的那一轮事件循环之后的新执行栈中执行。

            setTimeout(() => {
                //只能由pending状态=>fulfilled状态(避免调用多次resolve reject)
                this.status = FULFILLED;
                this.value = result;
                this.onFulfilledCallbacks.forEach(cb => cb(this.value));
            }, 0);
        }
        
        let reject = reason => { // reject方法
            if (this.status !== PENDING) return;
            setTimeout(() => {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb(this.reason))
            })
        };
        // 捕获在executor执行器中抛出的异常
        try {
            executor(resolveFn, rejectFn);
        }
        catch (err) {
            //=>有异常信息按照rejected状态处理
            reject(err);
        }
    }

    // 添加.then方法
    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === "function" ? onFullfilled : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : reason => {
            throw reason;
        };
        switch (self.status) {
            case PENDING:
                // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
                return promise2 = new myPromise((resolve, reject) => {
                    this.onFulfilledCallbacks.push(()=>{
                        try {
                            let x = onFullfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                        }
                        catch (e) {
                            reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                        }
                    });
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e); // error catch
                        }
                    });
                });
                break;
            case FULFILLED:
                return promise2 = new myPromise(function (resolve, reject) {
                    try {
                        let x = onFullfilled(this.value);
                        //将上次一then里面的方法传递进下一个Promise状态
                        this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);//error catch
                    }
                });
                break;
            case REJECTED:
                return promise2 = new myPromise(function (resolve, reject) {
                    try {
                        let x = onRejected(this.reason);
                        //将then里面的方法传递到下一个Promise的状态里
                        this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                break;
            default:
        }
    }

    // 添加.catch方法
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static deferred() { // 延迟对象
        let defer = {};
        defer.promise = new myPromise((resolve, reject) => {
            defer.resolve = resolve;
            defer.reject = reject;
        });
        return defer;
    }

    static all(promises = []) {
        let index = 0,
            result = [];
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(val => {
                    index++;
                    result[i] = val;
                    if (index === promises.length) {
                        resolve(result)
                    }
                }, reject);
            }
        })
    }
    
    static resolvePromise(promise, x, resolve, reject) {
        if (promise === x) { // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
            throw new TypeError("type error")
        }
        let isUsed;
        if (x !== null && (x instanceof Object || x instanceof Function)) {
            try {
                let then = x.then;
                if (typeof then === "function") {
                    //是一个promise的情况
                    then.call(x,(y) => {
                        if (isUsed) return;
                        isUsed = true;
                        this.resolvePromise(promise, y, resolve, reject);
                    },(e) => {
                        if (isUsed) return;
                        isUsed = true;
                        reject(e);
                    })
                }
                else {
                    //仅仅是一个函数或者是对象
                    resolve(x)
                }
            }
            catch (e) {
                if (isUsed) return;
                isUsed = true;
                reject(e);
            }
        }
        else {
            //返回的基本类型，直接resolve
            resolve(x)
        }
    }
}

module.exports = myPromise;
