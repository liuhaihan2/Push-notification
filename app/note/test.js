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
