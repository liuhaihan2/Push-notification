deepClone
promise
call apply bind
instanceof
throttle
debounce
function debounce(fn, delay = 500) {
	let timer = null
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}
function throttle(fn, delay = 500) {
	let flag = true
	return (...args) => {
		if (!flag) { return }
		flag = false
		setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}
function aa() {
	const name = 'ddd'
	console.log('aa this', this)
	return function bb() {
		console.log('name', name)
		console.log('bb this', this)
	}
}

function _classCallCheck(instance, constructor) {
	if (!(instance instanceof constructor)) {
		throw new Error('please creat with new')
	}
}

function definePropertys(target, property) {
	for(let i = 0; i < property.length; i++) {
		Object.defineProperty(target, property[i].key, {
			...property[i],
			configurable: true,
			eumerable: true,
			writable: true
		})
	}
}

function _createClass(constructor, protoPropertys, staticPropertys) {
	if (protoPropertys.length) {
		definePropertys(constructor.property, protoPropertys)
	}
	if (staticPropertys.length) {
		definePropertys(constructor, staticPropertys)
	}
}

let Parent = () => {
	function P () {
		// init Parent
		_classCallCheck(this, P)
		this.name = 'parent'
	}
	// _createClass(target, [共享方法], [静态方法])
	_createClass(P, [{
		key: 'aa',
		value: function() {
			return 'aa'
		}
	}], [{
		key: 'static',
		value: function() {
			return 'static haha'
		},
	}])
	return P
}

function _inherits(child, parent) {
	child.prototype = Object.create(parent.property, {
		constructor: subclass,
	})
	Object.setPrototypeOf(subclass, superClass)
}

let Child = (Parent => {
	_inherits(C, Parent)
	function C () {
		_classCallCheck(this, C)
		this.name = Child
		//
		let obj = Parent.call(this)
		if (typeof obj === 'object' || typeof obj === 'function') {
			return obj
		}
		return this
	}
	return C
})(Parent)
class Promise {
	// 相当于定义在构造函数的属性
	callbacks = []
	state = 'pending'
	value = null
	constructor(fn) {
		fn(_resolve.bind(this), _reject.bind(this))
	}

	static resolve(value) {
		if (value && value instanceof Promise) {
			return
		} else if (value && typeof value === 'object' && typeof value.then === 'function') {
			let then = value.then
			return new Promise(resolve => {
				then(resolve)
			})
		} else if (value) {
			return new Promise(resolve => resolve(value))
		} else {
			return new Promise(resolve => resolve())
		}
	}

	static reject(error) {
		if (value && typeof value === 'object' && typeof value.then === 'function') {
			let then = value.then
			return new Promise((resolve, reject) => {
				then(reject)
			})
		}
		return new Promise((resolve, reject) => reject(error))
	}

	then(onFulfilled, onRejected) {
		return new Promise((resolve, reject) => (_handle({
			fulfilled: onFulfilled,
			rejected: onRejected,
			resolve,
			reject,
		})))
	}
	
	_handle(callback) {
		if (this.state === 'pending') {
			this.callbacks.push(callback)
			return
		}
		let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
		let ret
		try {
			ret = cb(this.value)
			cb = this.state === 'fufilled' ? callback.resolve : callback.reject
		} catch(err) {
			reject(err)
		} finally {
			cb(ret)
		}
	}

	// 这个等于一个开关，可以让state从pending变成fulfilled
	_resolve(value) {
		if (this.state !== 'pending') {
			return
		}
		// 这里对thenable对象做一个兼容，但是我并不知道什么情况下会用到
		if (value && typeof value === 'object' && typeof value.then === 'function') {
			value.then(this._resolve(), this._reject())
			return 
		}

		this.state = 'fulfilled'
		this.value = value
		this.callbacks.forEach(callback => this._handle(callback))
	}

	_reject(error) {
		if (this.state !== 'pending') {
			return
		}
		this.state = 'rejected'
		this.value = error
		this.callbacks.forEach(callback => this._handle(callback))
	}
}
