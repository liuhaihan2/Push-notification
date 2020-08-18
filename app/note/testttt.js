
class Promise {
  callbacks = []
  state = 'pending'
  value = null // reject value

  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this))
  }

  then(onFullied, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFullied: onFullied || null,
        onRejected: onRejected || null,
        // TODO: 这是什么？
        resolve,
        reject,
      })
    })
  }

  // pending的时候无法执行
  _handle(callback) {
    // 这个callback是指一个对象里面装着各种callback
    if (this.state = 'pending') {
      this.callbacks.push(callback)
      return
    }

    let cb = this.state === 'fulfilled' ? callback.onFullied : callback.onRejected

    // if (!cb) { //如果then里面没有传递任何东西
    //   cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
    //   // TODO: 为什么要执行这个，也就是then必须传参数，不然就是报错
    //   cb(this.value)
    //   return
    // }

    let ret
    try {
      ret = cb(this.value)
      // TODO: 执行这个为什么呢？
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
    } catch (error) {
      ret = error
      cb = callback.reject
    } finally {
      cb(ret)
    }
  }

  // 必须pending的时候执行
  _resolve(value) {
    if (this.state !== 'pending') { return }
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      const then = value.then
      if (typeof then === 'function') {
        // TODO: 如果value是个promise，那么就调用value的then方法并把_resolve和_reject当成参数传入
        // 立即执行这个promise 符合promise里面的内容立即执行的特点
        then.call(value, this._resolve.bind(this), this._reject.bind(this))
        return
      }
    }

    this.state = 'fulfilled'
    this.value = value
    this.callbacks.forEach(callback => this._handle(callback))
  }

  _reject(error) {
    if (this.state !== 'pending') { return }
    this.state = 'rejected'
    this.value = error
    this.callbacks.forEach(callback => this._handle(callback))
  }
}
getJSON("/post/1.json")
  .then(function(post) {
    return getJSON(post.commentURL)
  })
  .then(function funcA(comments) {
    console.log("resolved: ", comments)
  }, function funcB(err){
    console.log("rejected: ", err)
  }) 
