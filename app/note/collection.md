-[css](#css)
-[js](#Js)
- [Vue/React](#Vue/React)
## CSS
-----------------------------------------------
- 选择器
Ele:nth-last-child(n) 
Ele:nth-of-type(n) 
Ele:nth-last-of-type(n) 
Ele:last-child 
Ele:first-of-type 
Ele:only-child 
Ele:only-of-type 
Ele:empty 
Ele:checked 
Ele:enabled 
Ele:disabled 
Ele::selection 
Ele:not(s)
- css定位背景图片
- background-clipbackground-clip: 规定背景的绘制区域
- backround-origin: 规定背景图片的定位区域
- transform: translate(150px, 100px);
- 重绘和回流
> reflow:当render树中的一部分或者全部因为大小边距等问题发生改变而需要重建的过程叫做回流, 就是当一些物理部分改变的时候，包括margin,padding,height,width,border等 repaint:当元素的一部分属性发生变化，如外观背景色不会引起布局变化而需要重新渲染的过程叫做重绘 就是一些修饰的属性改变的时候，比如颜色。 `回流一定会伴随着重绘，但是重绘不一定会引起回流。回流的代价比重绘高。`
- flex布局简写都代表了什么
> flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
- flex-grow: 默认为0，即如果存在剩余空间，也不放大
- flex-shrink: 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小,0就不缩小
- flex-basis：它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。auto表示项目本来大小
- 垂直水平居中
- float和inline的区别和联系
- 元素透明
	- overflow:hidden/* 占据空间，无法点击 */
	- opacity:0/* 占据空间，可以点击 */
	- visibility:hidden/* 占据空间，无法点击 */
	- display:none
	- position:absolute/* left top 设置的非常远 */
	- z-index:-1000/* 不占据空间，无法点击 */
- 清除浮动
- 伪类和伪元素：
> 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息, 伪元素本质上是创建了一个有内容的虚拟容器；
```css
	q:lang(de)::after{
			content: " (German) ";
	}
	/* 伪元素：::before  ::after */
	/* 伪类：:active		:focus :hover		:link :visited	:first-child
			:lang :nth-child(odd) :nth-child(even) */
```
- 盒模型
> magin+border+padding+content(width), 但实际盒子的大小没有margin，加上margin是指占地面积
- W3C: 属性width,height只包含内容content，不包含border和padding。
- IE: 属性width,height包含border和padding，指的是content+padding+border
> 若在页面中声明了`DOCTYPE`类型，所有的浏览器都会把盒模型解释为W3C盒模型  
> IE8+ 可以支持box-sizing
- box-sizing: content-box(default)
- box-sizing: border-box border算在width里面
- box-sizing: inherit

## JS
- [栈和堆](#栈和堆)?
- [基本数据类型](#基本数据类型)
- [引用数据类型](#引用数据类型)
- [什么是类数组 类数组如何变成数组](#类数组)
- [变量提升](变量提升)?
- [原型继承](#原型继承)?
- [如何判断数据类型](#如何判断数据类型)
	- [instanceOf](#instanceOf)
	- [如何实现instanceOf](#如何实现instanceOf) to see
	- [typeOf](#typeOf)
	- [toString](#toString)
	- [undefined与null](#undefined与null)
	- [如何判断一个数据类型是普通对象](#如何判断一个数据类型是普通对象)
- [如何理解闭包](#如何理解闭包js)?
- [Js垃圾回收机制](#Js垃圾回收机制)?
- [foreach&&forIn&&forOf](#foreach&&forIn&&forOf)
- [深拷贝和浅拷贝](#深拷贝和浅拷贝)
	- [浅拷贝](#浅拷贝)
	- [深拷贝](#深拷贝)
	- [Object.assign()](#Object.assign())
	- [Object.create()](#Object.create())?
	- [Map和WeakMap](#Map和WeakMap)
- [DOCTYPE的作用](#DOCTYPE的作用)
- [call-apply-bind区别&&实现](#call-apply-bind区别&&实现) to see
- [promise的理解实现](#promise的理解实现) to see
	- [概念和用法](#概念和用法)
	- [实现](#实现)
	- [async/await](#async/await)
	- [generator](#generator)
- [函数的节流和去抖](#函数的节流和去抖) to see
- [跨域概念及其实现](#跨域概念及其实现)?
- [class的理解和使用](#class的理解和使用)?
-----------------------------------------------
- ### 栈和堆

- ### 基本数据类型
> undefined，boolean，number，string，null，symbol，放在栈里，数据大小确定，内存空间大小可以分配，是直接按值存放的，所以可以直接访问 `基本类型的比较是值的比较`

- ### 引用数据类型
> 对象、数组、函数、类数组、正则啥的 指针在栈中但是值在堆中 console.log({} == {}); // false `引用类型的比较是引用的比较`

- ### 类数组
> 差别 拥有length属性，其它属性（索引）为非负整数 不具有数组所具有的方法；类数组是一个普通对象，而真实的数组是Array类型
```javascript
Array.prototype.slice.call(arguments)
Array.prototype.slice.apply(arguments)
[...arrayLike]
[].slice.call(arguments)
[].concat.apply([],arguments)
Array.from(arguments) // es6
```

- ### 变量提升
	- #### var
	```javascript
		`输入hi~Jartto`
		var name = 'World!';
		(function () {
				// 等于这里声明了一个 var name = undefined
				if (typeof name === 'undefined') {
						var name = 'Jartto';
						console.log('Hi~ ' + name);
				} else {
						console.log('Hello ' + name);
				}
		})();
	```
	- #### let

- ### 原型继承

- ### 如何判断数据类型
	- #### instanceOf
		> 判断某个对象是不是另一个对象的实例
		```javascript
			'子君' instanceof String// 输出 false
			new Date() instanceof Date// 输出 true
		```
	- #### 如何实现instanceOf
	```javascript
		function myInstanceof(left, right) {
			left = left.__proto__;
			while(true) { // 为了一层一层往上找
				if (left === null) {
					return false;
				}
				if (left === right.prototype) {
					return true;
				}
				left = left.__proto__;
			}
		}
		class A{};

		const a = new A();
		console.log(myInstanceof(a, A)); // true
		console.log(myInstanceof(a, Object)); // true 
		console.log(myInstanceof(a, Array)); // false
	```
	- #### typeOf
		> 用于判断一个变量的类型,可以判断 number, string, boolean, undefined, symbol, `object`, `function` `没有null`
		> 所以对于引用类型，只能识别`function`
		```javascript
			typeof 123; // number
			typeof 'jartto'; // string
			typeof !!’0’; // boolean
			typeof new Function(); // function
			typeof name; // undefined
			typeof null; // object
			typeof (() => {}) // 输出 function
			typeof ['前端有的玩','公众号']// 输出 object
			typeof undefined // 输出 undefined
			typeof Function.prototype // 输出 function 
			`一般来说typeOf都是安全的，但是对于let和const，因为有暂时性死区的概念就会报错`
			typeof x; `Error` // typeof 运行时就会抛出一个 ReferenceError
			let x;
		```
	- #### toString
		> Object原型上未被覆盖的toString()方法，使用call来改变this指向
		> 会得到[object, Boolean | Number | String| Null | Undefined | Symbol | Object | Function | Array | Error | RegExp | Math | json | global]这样的结果，并且是准确的
	
	- #### undefined与null
		> 两个都代表无`undefined == null`
		> 由来：最初JS只设置了null作为表示"无"的值。并根据C语言的传统，null被设计成可以自动转为0 `Number(null) 0` `5 + null = 5`
		> `null`表示"没有对象"，即该处不应该有值
		- 作为对象原型链的终点 Object.getPrototypeOf(Object.prototype) // null
		> `undefined`表示"没有对象"，就是此处应该有一个值，但是还没有定义
		- 变量被声明了，但没有赋值时，就等于undefined
		- 调用函数时，应该提供的参数没有提供，该参数等于undefined
		- 对象没有赋值的属性，该属性的值为undefined
		- 函数没有返回值时，默认返回undefined

	- #### 如何判断一个数据类型是普通对象
		> 这里经常采坑的是 我们通常希望得到一个不是null的对象
		```javascript
			function isObject(target) {
					const type = typeof target;
					return target !== null && (type === 'object' || type === 'function');
			}
		```

- #### 如何理解闭包
- #### Js垃圾回收机制
- #### 对事件的理解

- ### foreach&&forIn&&forOf
	- #### foreach
		> 方法没办法使用 `break` 语句跳出循环，或者使用return从函数体内返回,forEach 不支持在循环中添加删除操作
	- #### for...in
		> (对象数组都可, 更适合对象，但是遍历的是key也就是数组的index，取值还要操作一下下，支持更广泛): 1.index是字符串，2.顺序不能保证 3.会遍历原型上的属性 hasOwnProperty会帮助筛选原型属性
		```javascript
			const arr = [1, 3, 4]
			arr.foo = 'foo'
			for(var index in arr){
				if (arr.hasOwnProperty(i)) {
					console.log(objArr[index]) // 1, 3, 4, foo
				}
			}
		```
	- #### for...of
		> (只数组，直接枚举数组项，如果不需要数组某项index的话 推荐): 可以遍历set和map，可迭代就能forof， Generator 对象，以及字符串，类数组,不可以用于对象因为`obj is not iterable`

- ### 深拷贝和浅拷贝
	- #### 浅拷贝
		> 浅拷贝只复制一层对象的属性 
		```javascript
		// 浅拷贝
		function shallowClone(o) {
			const obj = {};
			for ( let i in o) {
				if (o.hasOwnProperty(i)) {
					obj[i] = o[i];
				}
			}
			return obj;
		}
		```
	- #### 深拷贝
		> 对对象以及对象的所有子对象进行拷贝,复制之后的对象对被复制的对象没有任何影响
		`可以通过prototype来区分下箭头函数和普通函数，箭头函数是没有prototype的`
		```javascript
			`好处：一行实现  坏处：无法实现对函数 、RegExp等特殊对象的克隆，会抛弃对象的constructor,所有的构造函数会指向Object`
			const newObj = JSON.parse(JSON.stringify(oldObj));

			`只考虑数组和对象和布尔类型的方式`
			// map主要用来防止循环引用 类似于target.target = target
			// forEach为了性能 当然也可以用for in 
			function getType(target) {
				return Object.prototype.toString.call(target);
			}
			function isObject(target) {
				const type = typeof target;
				return target !== null && (type === 'object' || type === 'function');
			}
			function forEach(array, iteratee) {
				let index = -1;
				const length = array.length;
				while (++index < length) {
					iteratee(array[index], index);
				}
				return array;
			}

			function clone(target, map = new WeakMap()) {
				// 克隆原始类型
				if (!isObject(target)) {
						return target;
				}

				const isArray = Array.isArray(target);
				let cloneTarget = isArray ? [] : {};

				// 防止循环调用
				if (map.get(target)) {
						return map.get(target);
				}
				map.set(target, cloneTarget);

				// 获取类型
				const type = Object.prototype.toString.call(target)

				// 是否是布尔类型
				if (type === '[object, Boolean]') {
					const Constr = target.constractor
					return new Constr(target)
				}

				const keys = isArray ? undefined : Object.keys(target);

				// for (const key in target) { cloneTarget[key] = clone(target[key], map) }
				forEach(keys || target, (value, key) => {
						if (keys) {
								key = value;
						}
						cloneTarget[key] = clone2(target[key], map);
				});

				return cloneTarget;
			}

			`考虑所有情况, 具体参见 深克隆全`
		```
	- #### Object.assign()
		> `浅拷贝` 第一个参数是目标对象，后面的参数都是源对象, 后面添加的属性会覆盖前面的属性
		> `注意：是替换 不是Merge`
		```javascript
		const target = { a: 1, b: 1 }
		const source1 = { b: 2, c: 2 }
		const source2 = { c: 3 }
		`其实就是把source1和source2合并到target里面, target改变`
		Object.assign(target, source1, source2)
		`创建了一个浅复制的新对象，target里面的属性不会变`
		Object.assign({}, target, source1, source2) //
		typeof Object.assign(2) `若参数不是对象，则会先转成对象，然后返回`// "object"
		Object.assign(undefined / null) `若不能转对象则报错`// 报错
		Object.assign(target, undefined) === obj `首参数可转成对象就不会报错，只是没用而已`// true
		`将x属性和y属性添加到Point类的对象实例`
		class Point {
			constructor(x, y) {
				Object.assign(this, {x, y}) 
			}
		}
		`克隆对象`
		function clone(origin) {
			return Object.assign({}, origin)
		}
		`克隆对象并且 保持原型链`
		function clone(origin) {
			return Object.assign(Object.create(Object.getPrototypeOf(origin)), origin)
		}
		```
	- #### Object.create()
	- #### Map和WeakMap
		> Map是`强引用`，WeakMap是`弱应用` 强引用：除非手动赋值为null 否则不会被当成垃圾回收  弱引用：一段时间后会自动被回收
		```javascript
			let obj = { name : 'ConardLi'}
			const target = new Map(); // new WeakMap()
			target.set(obj,'code秘密花园');
			obj = null;
		```
		> 这个例子里面 就算我们把obj赋值为null手动解除引用，但是因为target依然有对obj的引用，所以是不会释放这块内存的, 如果换成`WeakMap`那么都变成了弱引用，下一次垃圾回收机制执行的时候会被回收,当深拷贝的对象非常庞大或者有循环引用的时候，WeacMap是非常有用的。

- ### DOCTYPE的作用
> 添加了<!DOCT是YPE html>那么，那么就等同于开启了标准模式 CSS1Compat，那么浏览器就会按照W3C的标准解析渲染页面，这样你的页面在所有的浏览器里显示都一样 对盒模型，垂直对齐，或者!important有影响

- ### call-apply-bind区别&&实现
> call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数
> call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数 `总结: call参数列表，apply数组`
> 注意：普通模式下this是`window`，在严格模式下this是`undefined`
```javascript
let arr1 = [1, 2, 19, 6];
//例子：求数组中的最值
console.log(Math.max.call(null, 1,2,19,6)); // 19
console.log(Math.max.call(null, arr1)); // NaN
console.log(Math.max.apply(null, arr1)); //  19 直接可以用arr1传递进去

	`call 和 apply 的实现其实差不多`
	Function.prototype.call = function (context) {
		// 如果 context 存在，使用 context，如果 context 不存在，使用 window；如果 context 是普通类型，转成对象。
		context = context ? Object(context) : window;
		context.fn = this;
		let args = [];
		for(let i = 1; i < arguments.length; i++) {
			args.push('arguments['+i+']');
		}

		let r = eval('context.fn('+args+')');
		delete context.fn;
		return r;
	}

	Function.prototype.apply = function (context, args) {
		// 如果 context 存在，使用 context，如果 context 不存在，使用 window；如果 context 是普通类型，转成对象。
		context = context ? Object(context) : window;
		context.fn = this;

		if(!args){
			return context.fn();
		}

		let r = eval('context.fn('+args+')');
		delete context.fn;
		return r;
	}
	`bind 的实现`
	Funcition.protoType.bind = function (context) {
			// this表示调用bind的函数
			let that = this;
			let bindArgs = Array.prototype.slice.call(arguments, 1);  //["猫"]
			function Fn() {}
			function fBound() {
				let args = Array.prototype.slice.call(arguments);  //[9] 
				//this instanceof fBound为true表示构造函数的情况。如new bindFn(9);
				return that.apply(this instanceof fBound ? this : context, bindArgs.concat(args));
			}

			fn.prototype = this.prototype;
			fBound.prototype = new Fn();
			return fBound;
		}
```
- ### promise的理解实现
	- #### 概念和用法
		> 是一种异步的解决方案
		> 三种状态 `Pending`、`Resolved`和`Rejected`
		> `不可逆`只能从Pending->Resolved  Pending->Rejected 
		> 特点: promise一旦创建就`立即执行`, `then`方法指定的回调函数将在移步操作后执行
		> 用法
			```javascript
				let promise = new Promise((resolve, reject) => {
					// 下面代码会立即执行
					const { data } userService.fetchUserInfo()
					if (data.status === 'success') {
						resolve(data)
					} else {
						reject()
					}
				}) 
				// 添加then方法
				promise
					.then((data) => {
						const { results } = data
						return results.map((item) => !!item)
					}, (err) => {
						console.log(err)
						Message({
							title: err.message,
						})
					})
					.then((data) => {
						// 可以链式调用，data是上一个return的值
						console.log(data)
					})
			```
	- #### 实现
		> 具体参见Promise实现.js

	- #### async/await
  > async用于声明一个function是异步的，而await用于等待一个异步方法执行完成, 规定await只能出现在async函数中，async函数返回的是一个Promise对象
	- #### generator

- ### 函数的节流和去抖
	- #### 节流
		> 规定在`一个单位时间内，只能触发一次函数`。如果这个单位时间内触发多次函数，只有一次生效。
		> 实现
			```javascript
				const throttle = (fn, delay = 500) => {
					let flag = true;
					return (...args) => {
						if (!flag) return;
						flag = false;
						setTimeout(() => {
							fn.apply(this, args);
							flag = true;
						}, delay);
					};
				};
	- #### 防抖
		> `在事件被触发n秒后再执行回调`，如果在这n秒内又被触发，则重新计时
		> 实现
			```javascript
				const debounce = (fn, delay) => {
					let timer = null;
					return (...args) => {
						clearTimeout(timer);
						timer = setTimeout(() => {
							fn.apply(this, args);
						}, delay);
					}
				}
			```
- ### 跨域概念及其实现
> 同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源
- ### class的理解和使用

## 浏览器
-----------------------------------------------
- #### 302和304


## Commen
-----------------------------------------------
- ### 如何理解mvvm
- ### refs在vue和react里面的使用
- ### vue和React的相同点
	- 都使用Virtual DOM + Diff算法
	- 都使用组件化思想，流程基本一致
	- 都是响应式，推崇单向数据流
	- 都有成熟的社区，都支持服务端渲染
- ### vue和react的diff算法

## Vue 
-----------------------------------------------
- ### 生命周期
- ### 如何实现双向绑定
- ### 路由hash和history
- ### keepAlive

## React
-----------------------------------------------
- ### 生命周期
- ### class和function
	- #### 优缺点
	- #### 使用场景

