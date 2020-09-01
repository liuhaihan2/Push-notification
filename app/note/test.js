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

// 除法
function accDiv(arg1, arg2) {
	let t1 = 0, t2 = 0, r1, r2
	try {
		t1 = arg1.toString().split(".")[1].length
		t2 = arg2.toString().split(".")[1].length
		r1 = Number(arg1.toString().replace('.', ''))
		r2 = Number(arg2.toString().replace('.', ''))
	} catch (err) {
		console.log(err)
	}
	return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 乘法
function accMul(arg1, arg2) {
	let m, r1 = arg1.toString(), r2 = arg2.toString()
	try {
		m += r1.split('.')[1].length
		m += r2.split('.')[1].length
	} catch (err) {
		console.log(err)
	}
	return Number(r1.replace('.', '')) * Number(r2.replace('.', '')) / Math.pow(10, m)
}

// 加法
function accAdd(arg1, arg2) {
	let m, r1, r2
	try {
		r1 = arg1.toString().split('.')[1].length
		r2 = arg2.toString().split('.')[1].length
		m = Math.pow(10, Math.max(r1, r2))
	} catch (err) {
		console.log('err', err)
	}
	return (arg1 * m + arg2 * m) / m
}

// 减法
function accRed(arg1, arg2) {
	let r1, r2, m
	try {
		r1 = arg1.toString().split('.')[1].length
		r2 = arg2.toString().split('.')[1].length
		m = Math.pow(10, Math.max(r1, r2))
	} catch (err) {
		console.log('err', err)
	}
	return (arg1 * m - arg2 * m) / m
}

function bigAdd(arg1, arg2) {
	const [{ length: aLen }, { length: bLen }] = [arg1, arg2]
	let res = '', cursor = 1, carry = 0
	while(arg1[aLen - cursor] || arg2[bLen - cursor] || carry) {
		const sum = arg1[aLen - cursor] + arg2[bLen - cursor] + carry
		res = `${sum % 10}${res}`
		carry = +(sum > 9)
		cursor++
	}
	return res
}

function add(a, b) {
	const res = '', carry = 0
	while(a.length || b.length) {
		const sum = a.substr(-14) + b.substr(-14) + carry	
		res = `${sum.toString().substr(-14)}${res}`
		carry = sum.toString.substr(0, sum.length - 14)
		a = a.toString().substr(0, a.length - 14)
		b = b.toString().substr(0, b.length - 14)
	}
}
function* myGenerator() {
  console.log(yield '1')  //test1
  console.log(yield '2')  //test2
  console.log(yield '3')  //test3
}

function run(generator) {
	const gen1 = generator()
	function _next(value) {
		const res = gen1.next(value)
		if (res.done) { return res.value }
		res.value.then((value) => _next(value))
	}
	_next()
}

function runPromise(generator) {
	return new Promise((resolve, reject) => {
		const gen1 = generator()
		function _next(value) {
			try {
				const res = gen1.next(value)
				if (res.done) {
					return resolve(res.value)
				}
				Promise.resolve(res.value).then((res) => {
					_next(res)
				})
			} catch (err) {
				reject(err)
			}
		}
	})
}

function* foo() {
	console.log('hello')
  yield 'result1'
  yield 'result2'
  yield 'result3'
	console.log('ddd')
}
  
var gen5 = foo()
console.log(gen5.next())
// console.log(gen3.next())
// console.log(gen3.next())
// console.log(gen3.next())


const context = {
	pre: 0,
	next: 0,
	done: false,
	finish: () => {
		this.done = true
		return undefined
	}
}

function _gen(_context) {
	while(1) {
		switch(_context.pre = _context.next) {
			case 0:
				_context.next = 2
				return 'result1'
			case 2:
				_context.next = 4
				return 'result2'
			case 4:
				_context.next = 6
				return 'result3'
			case 6:
			case 'end':
				_context.next = 6
				return _context.finish()
		}
	}
}

const gen = function () {
	return {
		next: function() {
			const value = context.done ? undefined : _gen(context)
			const done = context.done
			return {
				value,
				done
			}
		}
	}
}


//实现co
function run(generator) {
	new Promise((resolve, reject) => {
		const iterator = generator()
		function _next(value) {
			try {
				const res = iterator.next(value)
				if (res.done) {
					resolve(res.value)
				}
				Promise.resolve(res.value).then(val => _next(val))
			} catch(err) {
				reject(err)
			}
		}
		_next()
	})
}

function Node(val) {
	this.data = val
	this.left = null
	this.right = null
	this.show = () => this.data
}

function BST() {
	this.root = null
	this.insert = insert
}

function insert(val) {
	const node = new Node(val)
	if (this.root === null) {
		this.root = node
	} else {
		let parent, current = this.root
		while(true) {
			parrent = current
			if (val < current.data) {
				current = current.left
				if (current === null) {
					parent.left = node
					break
				}
			} else {
				current = current.right
				if (current === null) {
					parent.right = node
					break
				}
			}
		}
	}
}

function fibonacci(n) {
	if (n === 1 || n === 2)
	return fibonacci(n - 1) + fibonacci(n - 2)
}

function binaryFind(arr, target) {
	let low = 0, high = arr.length - 1, mid
	while(low <= high) {
		mid = Math.floor(arr.length / 2)
		if (arr[mid] === target) {
			console.log('find it:', mid)
			return mid
		} else {
			if (arr[mid] < target) {
				high = mid + 1
			} else {
				low = mid - 1
			}
		}
	}
	return -1
}

// 相同
function sameTree(tree1, tree2) {
	if (tree1 === null && tree2 === null) return true	
	if (tree1 === null || tree2 === null) return false	
	if (tree1.data !== tree2.data) return false
	return sameTree(tree1.left, tree2.left) && sameTree(tree1.right, tree2.right)
}

// 镜像 最开始 tree1 === tree2
function sameTree(tree1, tree2) {
	if (tree1 === null && tree2 === null) return true	
	if (tree1 === null || tree2 === null) return false	
	if (tree1.data !== tree2.data) return false
	return sameTree(tree1.left, tree2.right) && sameTree(tree1.right, tree2.left)
}

// 二叉树最大深度和最小深度
function maxTreeDep(root) {
	if (!root) return 0
	const left_dep = maxTreeDep(root.left)
	const right_dep = maxTreeDep(root.right)
	return Math.max(left_dep, right_dep) + 1
}

function merge(nums1, m, nums2, n) {
	while(n > 0) {
		if (nums1[m - 1] > nums2[n - 1]) {
			nums1[m + n - 1] = nums1[--m]
		} else {
			nums1[m + n - 1] = nums2[--n]
		}
	}
}

function debounce(fn, delay = 500) {
	let timer = null
	return function(...args) {
		clearTimeout(timer)
		timer = setTimeout(function() {
			fn.apply(this, args)
		}, delay)
	}
}

function throttle(fn, delay = 500) {
	let flag = true
	return function() {
		if (!flag) return
		flag = false
		setTimeout(function() {
			fn.apply(this, args)
			flag = true
		}, delay)
	}
}

function _call(context) {
	if (typeof this !== 'function') {
		throw new TypeError('not func')
	}
	const args = [...arguments].slice(1)
	context = context || window
	context.fn = this
	const res = context.fn(...args)
	delete context.fn
	return res
}

Function.prototype.bind = function (context) {
	let that = this
	let bindArgs = [...arguments].slice(1)
	function F() {}
	function fBound() {
		let args = [...arguments]
		return that.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
	}
	F.prototype = that.prototype
	fBound.property = new F()
	return fBound
}

function mockNew() {
	let emptyObj = new Object()
	let constructor = Array.prototype.shift.call(arguments)
	emptyObj.constructor = constructor
	emptyObj.__proty__ = constructor.prototype
	let result = constructor.apply(emptyObj, arguments)
	return result
}

function myInstanceof(left, right) {
	left = left.__proto__
	while (true) {
		if (left === null) {
			return false
		}
		if (left === right.property) {
			return true
		}
		left = left.__proto__
	}
}

function isObject(target) {
	const type = typeof target
	return target !== null && (type === 'object' || tyep === 'function')
}
function deepClone(target, map = new WeakMap()) {
	if (!isObject(target)) {
		return target
	}
	const copyTarget = Array.isArray(target) ? [] : {}
	if (map.get(target)) {
		return map.get(target)
	}
	map.set(target, copyTarget)

	for (let key in target) {
		copyTarget[i] = deepClone(target[key], map)
	}

	return cloneTarget 
}

function pool(poolLimit, arr, iterator) {
	const i = 0
	const result = []
	const executing = []
	const enqueue = function() {
		if (i === arr.length) return	
		const p = Promise.resolve().then(() => {iterator(arr[i])})
		result.push(p)
		const e = p.then(() => {
			executing.slice(executing.indexOf(e), 1)
		})
		executing.push(e)
		let r = Promise.resolve()
		if (executing.length >= poolLimit) {
			r = Promise.race(executing)
		}
		return r.then(() => {
			enqueue()
		})
	}
	return enqueue().then(() => {
		Promise.all(result)	
	})
}

function check(instance, constructor) {
	if (!(instance instanceof constructor)) {
		throw new Error('new ?')
	}
}

function protoPrototypes(target, arr) {
	for (arr) {
		Object.definePropertiy(target, arr[i].key, {

		})
	}
}

function _createClass(constructor, protoPrototypes, staticPrototypes) {
	if (protoPrototypes.length) {
		_definePropertys(constructor.property, protoPrototypes)
	}
	if (staticPrototypes.length) {
		_definePropertys(custructor, staticPrototypes)
	}
}

function inherrit(sub, sup) {
	sub.prototype = Object.create(sup.prototype, {
		custructor: {
			value: sub
		}
	})	
}

let Parent = function() {
	function P() {
		check(this, P)
		this.name = 'Parent'
	}
	_createClass(P, [], [])
	return p
}()

let parent1 = new Parent()

let Child = function() {
	inherits(C, Parent)
	function C() {
		check(this, C)
		this.name = 'child'
		Parent.call(this)
	}
	return C
}

function co(generator) {
	return new Promise((resolve, reject) => {
		const gen = generator()
		const _next = function(value) {
			try {
				const res = gen.next(value)
				if (res.done) {
					return resolve(res.value)
				}
				Promise.resolve(res.value).then((res) => {
					_next(res)
				})
			} catch(err) {
				console.log(err)	
			}
		}
		_next()
	})
}