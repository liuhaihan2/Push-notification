//写一个对象，{}，包含了不同的指令对应的不同的处理办法
CompilerUtil = {
	getVal: (path, vm) => path
		.split('.')
		.reduce((target, item) => target[item], vm.$data),
	setVal: (vm, valuePath, newVal) => {
		valuePath.split.reduce((target, item, index, arr) => {
			if (index === arr.length) {
				return target[item] = newVal
			}
			return target[item]
		}, vm)
	},
	model: (node, valuePath, vm) => {
		// node:<input type="text" v-model='school.name'> 
		// value: 'school.name'
		new Watcher(node, valuePath, vm, newVal => {
			this.updater.updateElement(node, newVal)
		})
		this.updater.updateElement(node, getVal(valuePath, vm))
		node.addEventListener('input', e => {
			this.setVal(vm, valuePath, e.target.value)
		})
	},
	text: (node, valuePath, vm) => {
		// valuePath: {{ school.name }}
		const content = valuePath.replace(/\{\{(.+?)\}\}/g,(...args)=> this.getVal(vm,args[1])) // 转成 school.name
		new Watcher(node, content, vm, newVal => {
			this.updater.updateText(node, newVal)
		})
		this.updater.updateText(node, getVal(content, vm))
	},
	html: () => {
			console.log('处理v-html指令');
	},
	updater: {
		updateElement: (node, value) => {
			node.value = value // 其实这里就是一个替换  input只识别value这个属性
		},
		updateText: (node, value) => {
			node.textContent = value // 普通节点只识别textContent这个属性
		},
	}
}

class Vue {
	constructor(option) {
		this.$el = option.el
		this.$data = option.data
		this.computed = option.computed
		if (this.$el) {
			new Observer(this.$data)
			for (let key in computed) {
				Object.defineProperty(this.$data, key, {
					get: () => {
						return computed[key].call(this)
					}
				})
			}
			new Compiler(this.$el, this)
		}
	}
}

class Dev {
	constructor() {
		this.sub = []
	}

	addWatcher(watcher) {
		this.sub.push(watcher)
	}

	notify() {
		this.sub.forEach(watcher => watcher.update())
	}
}

class Watcher {
	constructor(vm, valuePath, cb) { //valuePath 一定是 shool.name 不能是{{school.name}}
		this.vm = vm
		this.valuePath = valuePath
		this.cb = cb // 状态改变后的回调
		this.oldValue = get() // 1. 获取初始化的值 2. watcher很懂事，可以自己把自己注册到对应的dev.sub里面
	}

	get() {
		Dev.target = this
		const value = this.CompilerUtil.getVal(this.valuePath, this.vm) 
		// 上面这句话可以看成隐世的调用一个被劫持数据的get，每个被劫持数据的get都有watcher注册的功能，注册到闭包对应的dev.sub下面
		// 而且也避免了重复给一个劫持数据创建多个watcher
		Dev.target = null
		return value
	}

	update() {
		const newVal = this.CompilerUtil.getVal(this.valuePath, this.vm) 
		if (newVal !== this.oldValue) {
			this.cb(newVal)
		}
	}
}

class Observer {
	constructor(data) {
		this.observe(data)
	}

	observe(data) {
		if (data && typeof data === 'object') {
			for (let key in data) {
				this.defindReactive(key, data)
			}
		}
	}

	defindReactive(key, data) {
		this.observe(data[key])
		Object.defineProperty(data, key, {
			get() {
				Dev.target && Dev.addWatcher(Dev.target)
				return data[key]
			},
			set(newVal) {
				if (newVal !== data[key]) {
					this.observe(newVal) // 如果是新的数据就重新劫持一遍
					data[key] = newVal
					dev.notify()
				}
			},
		})
	}
}

class Compiler {
	constructor(root, vm) {
		this.vm = vm
		this.root = this.isElementNode(root) ? root : document.querySelector(vm)
		let fragment = this.node2fragment(root)
		this.compile(fragment)
		this.el.appendChild(fragment)
	}

	node2fragment(root) {
		let fragment = document.createDocumentFragment(root)
		let firstChild
		while(firstChild = root.firstChild) {
			fragment.appendChild(firstChild)
		}
		return fragment
	} 

	isDirective(attrName) {
		return attrName.startsWith('v-')    
	}

	// 编译元素节点的方法
	compileElement(node) {
		// 举例 第一个遍历到的node是：<input type="text" v-model='school.name'>
		[...node.attributes].forEach(attr=>{
			let {name,value} = attr // attr.name第二轮是 v-model
			//判断是否是一个指令
			if(this.isDirective(name)){
				CompilerUtil[name.splite('-')[1]](node, value, this.vm)
			}
		})
	}

	// 编译文本节点的方法
	compileText(node) {
		let content = node.textContent // {{school.name}}
		let reg = /\{\{(.+?)\}\}/;  // {{ }} 里面的内容
		if(reg.test(content)){
			CompilerUtil['text'](node, content, this.vm)
		}
	}

	compile(node){
		[...node.childNodes].forEach(child=>{
			if(this.isElementNode(child)){
				//元素节点，调用上面的编译元素节点的方法
				this.compileElement(child);
			}else{
				//文本节点，调用上面的编译文本节点的方法
				this.compileText(child)
			}
		})
	}

	isElementNode(node) {
		return node.nodeType === 1
	}
}