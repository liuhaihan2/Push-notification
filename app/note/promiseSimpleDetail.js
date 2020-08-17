
	function Promise (executor) {
		this.state = 'pending';
		this.data = undefined;
		this.reason= undefined;
		this.fn1Callbacks=[];
		this.fn2Callbacks=[];
		let resolve = value => {
				if(this.state === 'pending'){
						this.state = 'fulfilled';
						this.data = value;
						for(let i = 0; i<this.fn1Callbacks.length; i++){
								self.fn1Callbacks[i](value);
						}
				}
		};
		let reject = reason => {
				if(this.state === 'pending'){
						this.state = 'rejected';
						this.reason = reason;
						for (let i = 0; i < self.fn2Callback.length; i++) {
								self.fn2Callback[i](reason);
						}
				}
		};
		try {
				executor(resolve, reject);
		} catch (err) {
				reject(err);
		}
	}

	Promise.prototype.then = function(fn1, fn2) {
		var self = this
		var promise2
		fn1 = typeof fn1 === 'function' ? fn1 : function(v) {}
		fn2 = typeof fn2 === 'function' ? fn2 : function(r) {}
		if (self.status === 'resolved') {
				return promise2 = new Promise(function(resolve, reject) {
						try {
								var x = fn1(self.data)
								// fn1 执行后，会有返回值，通过 resolve 注入到 then 返回的 promise 中
								resolve(x)
						} catch (e) {
								reject(e)                
						}
				})
		}
		if (self.status === 'rejected') {
				return promise2 = new Promise(function(resolve, reject) {
						try {
								var x = fn2(self.data)
								resolve(x)
						} catch (e) {
								reject(e)
						}
				})
		}
		if (self.status === 'pending') {
				return promise2 = new Promise(function(resolve, reject) {
						this.fn1Callback.push(function(value){
								try {
										var x = fn1(self.data);
										resolve(x)
								} catch (e) {
										reject(e)
								}
						})
						this.fn2Callback.push(function(value) {
								try {
										var x = fn2(self.data);
										reject(x)
								} catch (e) {
										reject(e)
								}
						})
				})
		}
	}