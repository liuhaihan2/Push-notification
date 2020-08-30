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

function asyncPool(poolLimit, array, fn) {
	let i = 0
	const ret = []
	const executing = []
	const enqueue = function() {
		if (i === array.length) {
			return Promise.resolve()
		}
		const item = array[i]
		const p = Promise.resolve().then(fn(item, array))
		ret.push(p)
		const e = p.then(() => executing.splice(executing.indexOf(e), 1))
		executing.push(e)

		let r = Promise.resolve()
		if (executing.length >= poolLimit) {
			r = Promise.race(executing)
		}
		return r.then(() => executing())
	}
	return enqueue().then(() => Promise.all(ret))
}

function one() {
	name = 'one'
}
function two() {
	one.call(this)
	age = 18
}
inheritPrototype(two, one)
inheritPrototype(child, parent) {
	const prototype = object.create(parent.prototyp)
	prototype.constructor = child
	child.prototype = prototype
}


function mockNew() {
	let emptyObj = new Object()
	let constructor = Array.prototype.shift.call(arguments)
	emptyObj.constructor = constructor
	emptyObj.__proty__ = constructor.prototype
	let result = constructor.apply(emptyObj, arguments)
	return result
}

function myCall(context) {
	context = context || window
	context._fn = this
	const args = [...arguments].slice(1)
	const result = context._fn(args)
	return results
}

function bind(context) {
	let self = this
	context = context || window
	let args = [...args].slice(1)
	const bound = function() {
		let newArgs = [...arguments]
		if (this instanceof bound) {
			return self.apply(this, args.concat(newArgs))
		} else {
			return self.apply(context, args.concat(newArgs))
		}
	}
	bound.prototype = context.property
	return bound
}

function lcp(arr) {
	if (!arr || !arr.length) {
		return ''
	}
	lcpPreCircle(arr)
}

function lcpPreCircle(arr) {
	const length = arr.length
	const mid = Math.floor(length / 2)
	const leftArr = arr.slice(0, mid)
	const rightArr = arr.slice(mid)

	if (arr.length <= 1) {
		return arr[0]
	}

	return lcpTwoMax(lcpPreCircle(left), lcpPreCircle(right))
}

function lcpTwoMax(first, second) {
	for (let i = 0; i < first.length && i < second.length; i++) {
		if (first.charAt(i) === second.charAt(i)) {
			return first.substring(0, i)
		}
	}
}