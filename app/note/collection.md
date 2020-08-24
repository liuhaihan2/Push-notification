[css](#css)
[浏览器](#浏览器)
[Vue](#Vue)
[React](#React)
[Commen](#Commen)
[小程序相关](#小程序相关)
[js](#JS)
- [栈和堆](#栈和堆)
- [基本数据类型](#基本数据类型)
- [引用数据类型](#引用数据类型)
- [什么是类数组 类数组如何变成数组](#类数组)
- [变量提升](#变量提升)
	- [LexicalEnvironmet](#LexicalEnvironmet)
	- [var](#var)
	- [函数](#函数)
	- [let&const](#let&const)
	- [TDZ(tempral dead zoon)](#TDZ)
- [继承](#继承)
	- [__proto__和prototype](#__proto__和prototype)
	- [组合式继承](#组合式继承)
	- [组合寄生式继承](#组合寄生式继承)
	- [class继承](#class继承)
- [如何判断数据类型](#如何判断数据类型)
	- [instanceOf](#instanceOf)
	- [如何实现instanceOf](#如何实现instanceOf)
	- [typeOf](#typeOf)
	- [判断两者是否相等](#判断两者是否相等)
	- [toString](#toString)
	- [undefined与null](#undefined与null)
	- [如何判断一个数据类型是普通对象](#如何判断一个数据类型是普通对象)
- [如何理解闭包](#如何理解闭包js)?
- [Js垃圾回收机制](#Js垃圾回收机制)
- [缓存相关](#缓存相关)
	- [强制缓存](#强制缓存)
- [输入url到看到页面都经历了啥](#到看到页面都经历了啥)?
- [EventLoop运行机制](#EventLoop运行机制)
- [事件](#事件)?
- [foreach&&forIn&&forOf](#foreach&&forIn&&forOf)
- [深拷贝和浅拷贝](#深拷贝和浅拷贝)
	- [浅拷贝](#浅拷贝)
	- [深拷贝](#深拷贝)
	- [Object.assign()](#Object.assign())
	- [Object.create()](#Object.create())
	- [new的简单实现](#new的简单实现)
	- [new和Object.create()不同](#new和Object.create()不同)
	- [寄生组合继承与Object.create()的关系](#寄生组合继承与Object.create()的关系)
	- [Map和WeakMap](#Map和WeakMap)
- [DOCTYPE的作用](#DOCTYPE的作用)
- [call-apply-bind区别&&实现](#call-apply-bind区别&&实现) to see
- [promise的理解实现](#promise的理解实现) to see
	- [概念和用法](#概念和用法)
	- [实现](#实现)
	- [async/await](#async/await) ?
	- [generator](#generator)?
- [函数的节流和去抖](#函数的节流和去抖)
- [跨域概念及其实现](#跨域概念及其实现)?
- [class的理解和使用](#class的理解和使用)
	- [基本用法](#基本用法)
	- [class继承](#class继承)
	- [class的this指向问题](#class的this指向问题)
	- [class实现](#class实现) ?
- [箭头函数和普通函数](#箭头函数和普通函数)
- [buffer&&stream](#buffer&&stream)?
- [什么是高阶函数](#什么是高阶函数)?
- [location.href](#location.href)
- [es6-es10新特性](#es6-es10新特性)
### CSS
-----------------------------------------------
- #### 选择器
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
- #### css定位背景图片
- #### background-clipbackground-clip: 规定背景的绘制区域 - backround-origin: 规定背景图片的定位区域
- #### transform: translate(150px, 100px);
- #### 重绘和回流
	> reflow:当render树中的一部分或者全部因为大小边距等问题发生改变而需要重建的过程叫做回流, 就是当一些物理部分改变的时候，包括margin,padding,height,width,border等
	> repaint:当元素的一部分属性发生变化，如外观背景色不会引起布局变化而需要重新渲染的过程叫做重绘 就是一些修饰的属性改变的时候，比如颜色。 `回流一定会伴随着重绘，但是重绘不一定会引起回流。回流的代价比重绘高。`
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
-----------------------------------------------
- ### 栈和堆
> 栈是先进后出，用来存储基本类型
> 引用数据类型存储在堆内存(树状结构)中,引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址
> 闭包中的变量并不保存中栈内存中，而是保存在堆内存中。 这也就解释了函数调用之后之后为什么闭包还能引用到函数内的变量。

- ### 基本数据类型
> undefined，boolean，number，string，null，symbol，放在栈里，数据大小确定，内存空间大小可以分配，是直接按值存放的，所以可以直接访问 `基本类型的比较是值的比较`
> `symbol`: 每个从Symbol()返回的symbol值都是`唯一`的
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
	> js代码都是先编译，然后执行。编译的阶段就会检测到所有的变量和函数声明
	> V8引擎执行代码的大致可以分为三步，1. 先做分词和词法分析，2. 然后解析生成AST,3. 最后生成机器码执行代码
	> JavaScript在编译阶段会找到var关键字声明的变量会添加到词法环境中，并初始化一个值undefined，在之后执行代码到赋值语句时，会把值赋值到这个变量
	> 词法环境是在代码定义的时候决定的，跟代码在哪里调用没有关系
	> Execution Context包括Lexical Environment
	- #### LexicalEnvironmet
		> 其实就是我们日程说的`this`,但是更具体和规范, 默认有一个GlobalEnvironment，然后每个函数对应一个functionEnviroment
		> 由两部分组成：环境记录（Environment Record）对外部词法环境的引用（outer）
		> `Environment Record`
			> - `DeclarativeEnvironmentRecord`: 用来记录直接有标识符定义的元素，比如变量、常量、let、class、module、import以及函数声明。
				>> DeclarativeEnvironmentRecord分为两种：
				>> `FunctionEnvironmentRecord`:用于函数作用域
				>> `ModuleEnvironmentRecord`: 用于体现一个模块的外部作用域，即模块export所在环境。
			> - `ObjectEnvironmentRecord`主要用于with和global的词法环境
				>> 
		> `outer` 对外部词法环境的引用,它是作用域链能够连起来的关键
		> `记住： 所有函数的内部this指向的都是window`
		
		```javascript
			var a = 2;
			let x = 1;
			const y = 5;
			function foo() {
					console.log(a);
					function bar() {
							var b = 3;
							console.log(a * b);
					}
					bar();
			}
			function baz() {
					var a = 10;
					foo();
			}
			baz();
			// 全局词法环境
			GlobalEnvironment = {
					outer: null, //全局环境的外部环境引用为null
					GlobalEnvironmentRecord: {
							//全局this绑定指向全局对象
							[[GlobalThisValue]]: ObjectEnvironmentRecord[[BindingObject]],
							//声明式环境记录，除了全局函数和var，其他声明都绑定在这里
							DeclarativeEnvironmentRecord: {
									x: 1,
									y: 5
							},
							//对象式环境记录，绑定对象为全局对象
							ObjectEnvironmentRecord: {
									a: 2,
									foo:<< function>>,
									baz:<< function>>,
									isNaNl:<< function>>,
									isFinite: << function>>,
									parseInt: << function>>,
									parseFloat: << function>>,
									Array: << construct function>>,
									Object: << construct function>>
									...
									...
							}
					}
			}
			//foo函数词法环境
			fooFunctionEnviroment = {
					outer: GlobalEnvironment,//外部词法环境引用指向全局环境
					FunctionEnvironmentRecord: {
							[[ThisValue]]: GlobalEnvironment,//this绑定指向全局环境
							bar:<< function>> 
					}
			}
			//bar函数词法环境
			barFunctionEnviroment = {
					outer: fooFunctionEnviroment,//外部词法环境引用指向foo函数词法环境
					FunctionEnvironmentRecord: {
							[[ThisValue]]: GlobalEnvironment,//this绑定指向全局环境
							b: 3
					}
			}
			//baz函数词法环境
			bazFunctionEnviroment = {
					outer: GlobalEnvironment,//外部词法环境引用指向全局环境
					FunctionEnvironmentRecord: {
							[[ThisValue]]: GlobalEnvironment,//this绑定指向全局环境
							a: 10
					}
			}
		```

	- #### var
	> 
	```javascript
		console.log(name)   // 'undefined'
		var name = 'John Doe'
		console.log(name)   // John Doea
		lexicalEnvironment = { name: undefined }// 编译阶段
		lexicalEnvironment = { name: 'John Doe' }// 执行阶段

		var name = 'World!'
		(function () {
				// 等于这里声明了一个 var name = undefined
				if (typeof name === 'undefined') {
						var name = 'Jartto';
						console.log('Hi~ ' + name);
				} else {
						console.log('Hello ' + name);
				}
		})()// 输出hi~Jartto

		`另一个总是出的例子`
		var aa = 'dd'
		function aa() {
				console.log('dddd')
		}
		console.log(aa) // dd 
		`修改一小下`
		var aa
		function aa() {
				console.log('dddd')
		}
		var aa
		console.log(aa) //输出一个function aa
		`总结：为什么会这样呢？ 像上面介绍的编译阶段开始注册这些声明的变量和函数，记住函数声明是直接初始化为一个函数对象的，所以此时声明重名的变量都是无效的，因为此时这些变量都没有赋值，除非再声明个函数对象，但其实就算是一种重写`
		var messages = ["Meow!", "I'm a talking cat!", "Callbacks are fun!"];
		for (var i = 0; i < messages.length; i++) {
			setTimeout(function () {
			console.log(messages[i]);
			}, i * 1500);
		} //3个Undefined
	```
	- #### 函数
	```javascript
		sayHi() // Hi there!	
		function sayHi() {
			console.log('Hi there!')
		}
		lexicalEnvironment = { sayHi: `< func >` }// 编译阶段

		`所以函数表达式也不会被“提升”, 会被看成是像 var helloWorld = 'aa'的普通变量赋值`
		helloWorld();  // TypeError: helloWorld is not a function
		var helloWorld = function(){
			console.log('Hello World!');
		}
	```
	- #### let&const
		> `hoisting`:  Hoisting means that variables get pulled from anywhere they were declared in user code to the top of their scope
		> let 和 const 区别于 var 的是：Accessing a var before it is declared has the result `undefined`; accessing a let or const before it is declared throws `ReferenceError`
		> 总结来说就是 let const 也是有`hoisted` 但都有个特殊的` Temporal Dead Zone (TDZ).`
		> let会有块级作用域的概念
		> const只能保证一层属性不变
	```javascript
		`下面证明了let有hoisted和TDZ的概念`
		console.log(a)  // ReferenceError: a is not defined
		let a
		console.log(a) // undefined
		a = 'ddd'
		console.log(a) // ddd

		`下面证明了let有块级作用域的概念，它是靠{}去区分作用域的，在对应作用域之前调用会因为TDZ而抛错`
		let outer = 'I am so eccentric!'
		{
			let inner = 'I play with neighbors in my block and the sewers'
			{
				let innermost = 'I only play with neighbors in my block'
			}
			console.log(innermost) // error
		}
		console.log(inner) // error
		console.log(innermost) // error

		`在function里面，除了return 外部声明的let变量不能提前使用`
		function readThere () {
			there = 'dd' // 运行到这句报错, 如果没有这句只有一个return there 会输出 dragons 因为there还没脱离TDZ
			return there
		}
		console.log(readThere()) // ReferenceError: there is not defined
		let there = 'dragons'

		function readThere () {
			there = 'dd' // 因为 there 脱离了 TDZ
			return there
		}
		let there = 'dragons'
		console.log(readThere()) // dragons

		`const只能保证一层属性不变`
		const cool = { people: ['you', 'me', 'tesla', 'musk'] }
		cool.people.push('berners-lee')
		console.log(cool)
		// <- { people: ['you', 'me', 'tesla', 'musk', 'berners-lee'] }

	```
	- #### TDZ
	> The variables are created when their containing Lexical Environment is instantiated but may not be accessed inany way until the variable’s LexicalBinding is evaluated.
	> `“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。`
	> 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
	```javascript
		`经典面试题`
		let y = 1;
		function foo(x = y, y) { // 会在这里抛错
				console.log(x);
		}
		foo();
		//translate
		function analysis() {
			"use strict";
			let y = 1;
			function foo() {  
					let x = arguments[0] !== (void 0) ? arguments[0] : y;   // y not defined
					let y = arguments[1];
			}
			foo();
			return {};
		}
		// 这样就不会报错
		function bar(x = 2, y = x) {
			return [x, y];
		}
		bar(); // [2, 2]
	```
	- #### let diff var
		```javascript
			`1. 下面表现了let和var的作用域不同 var(function block scope) let(nearest block scope)`
				//var
				var myVar = 2;
				if(true) {
					var myVar = 10;
				}
				console.log(myVar); // 10
				//let
				let someVar = 2;
				if(true) {
					let someVar = 10;
				}
				console.log(someVar); // 2

			`2. 全局声明的var是绑定到window上面的，但是全局声明的let是不会绑定到window上面的`
				let me = 'go'; // not globally scoped
				var you = 'able'; // globally scoped
				console.log(window.me); // undefined
				console.log(window.you); // 'able'

			`3. let和const在创建之初不会被复制为undefined, they exist but without any value and you can’t access them until they are assigned`
			 详见[TDZ](#TDZ)
			`4. let(can’t redeclare)和const(can’t redeclare and also can’t re-assign)，但是var就可以，等于普通赋值`
				let me = 'foo';
				let me = 'bar'; // SyntaxError: Identifier 'me' has already been declared
				var you = 'foo';
				var you = 'bar'; // No problem, `you` is replaced.
		```

- ### 继承
	`注意！！：重写原型会失去的默认的constructor属性`
	`[[Prototype]] 基本就等于 __proto__(浏览器自己定义的)`
	> 每个构造函数都对应着一个原型对象，构造函数new出来的实例都有个__proto__属性指向这个原型对象，所以原型对象上的属性可以共用，一般把函数放在原型对象上方便复用
	> 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象
	- #### __proto__和prototype
		> __proto__存在于new出来的实例里面，指向创造它的构造函数的原型函数
		> prototype存在于构造函数里面，指向它对应原型函数
		> (new Foo()).__proto__ === Foo.prototype // true
		> Foo.prototype.constructor === Foo // true
	- #### 原型对象上函数内部this指向问题
	> Person.prototype是一个对象，这个对象上你定义了一个getName方法，这个方法你return的是this.name，重点来了，你这个方法是怎么执行的呢，person.getName()执行的，所以getName方法中的this指的就是person这个你new出来的对象，而person这个对象上有name这个属性。
	> 所以this指向的是new出来的那个实例,记住方法是始终都是那一个方法，一直在变得是this
	- #### 组合式继承
		> 融合了借用构造函数继承(B构造函数call一下A)和原型链继承(把A的实例赋值给B的原型对象)
		> 中心思想就是 假如B要继承A，那么就把A的实例赋值给B的原型对象，同时在B的构造函数里面call一下A，这样就能挡住B的原型对象(也就是A实例)里面那些原本是A构造函数里面的属性，这样组合就实现了继承
		> 组合继承最大的问题是，无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部
		```javascript
			function One(num) {
				this.numOne = num;
				this.numList = [1, 2];
			}
			One.prototype.getNumOne = function() {
					return this.numOne;
			};
			function Two(num1, num2) {
					// 第二次调用了One()，实例对象继承了One的两个属性，会屏蔽掉原型Two.prototype中的两个同名属性
					One.call(this, num1);
					this.numTwo = num2;
			}
			// 第一次调用了One()，继承了One的原型方法, Two.prototype会得到One的两个属性
			Two.prototype = new One();
			Two.prototype.constructor = Two;
			Two.prototype.getNumTwo = function() {
					return this.numTwo;
			}
			var two1 = new Two(3, 5);
			two1.numList.push(6); 
			console.log(two1.numList); // [1, 2, 6]
			two1.getNumOne(); // 3
			two1.getNumTwo(); // 5

			var two2 = new Two(4, 6);
			two2.numList.push(7);
			console.log(two2.numList); // [1, 2, 7]
			two2.getNumOne(); // 4
			two2.getNumTwo(); // 6
		```
- #### 组合寄生式继承
	> 寄生式继承(包装成另一个对象，但是不能做到函数复用)来继承父类型的原型 + 借用构造函数继承(同上)
	```javascript
	// inheritPrototype接收两个参数：子类型的构造函数和父类型的构造函数
	function inheritPrototype(child, parent) {
			// 创建父类型原型的副本
			const prototype = Object.create(parent.prototype); 
			// 为创建的副本添加constructor属性，从而弥补因重写原型而失去的默认的constructor属性
			prototype.constructor = child;
			// 将创建的副本赋值给子类型的原型
			child.prototype = prototype;
	}

	function One(num1) {
			this.numOne = num1;
			this.numList = [1,2];
	}
	One.prototype.getNumOne = function() {
			return this.numOne;
	}

	function Two(num1, num2) {
			One.call(this, num1)
			this.numTwo = num2;
	}
	inheritPrototype(Two, One) // 在组合继承里面 这句话是 Two.prototype = new One();
	Two.prototype.getNumTwo = function() {
			return this.numTwo;
	}

	var two = new Two(3, 5);
	two.numList.push(6); 
	console.log(two.numList); // [1, 2, 6]
	two.getNumOne(); // 3
	two.getNumTwo(); // 5

	```

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
	
	- #### 判断两者是否相等
		> there are six falsy values: `false, 0, '', null, undefined, and NaN.` Everything else is truthy
		```javascript
		{} == {} //false
		{} === {} //false
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

- ### 如何理解闭包

- ### Js垃圾回收机制
	> GC(Garbage Collecation) js有垃圾自动回收机制，会定时周期性的执行回收操作
	> 基本上就是： 找出那些不再使用的变量，然后释放其占用的内存
	<!-- > 比如：局部变量只在函数执行的过程中存在 函数执行结束，局部变量的内存也会被回收。 -->
	> 标记无用变量的两个方法：`标记清除	(最常用)` 和 `引用计数` 。 
	- #### 标记清除
		- 垃圾收集器在运行的时候会给存在内存中的所有变量都加上标记
		- 去掉环境中的变量以及被环境中变量引用的变量的标记
		- 这个时候还被标记的就是没有人认领的，可以被销毁并回收他们的内存了
	- #### 引用计数
		> 跟踪记录每个值被引用的的次数，如果一个引用类型的引用被赋值一次，那么就赋值1，如果同一个值被赋值给另一个变量，那就再加1，但是如果包含这个值的变量又给赋值成其他的，那就减1，所以计数为0的时候就代表着可以被回收了
		> 缺点： 就是循环引用的问题, 如果objA.boyFriend = objb, objb.girlFriend = obja，那么objA和objB永远不会被回收
	- #### 总结
		所以为了性能，一旦某些变量不再用，最好用`null`来`解除引用`, 解除引用的真正目的是把一个变量标记为可回收，而不是真正的释放它

- ### 缓存相关
	> 浏览器每次发起请求，都会先在`浏览器缓存`中查找该请求的结果以及缓存标识
	> 浏览器每次拿到返回的请求结果都会将该结果和缓存标识`存入浏览器缓存中`
	> 强制缓存优先于协商缓存进行
	- #### 强制缓存
		> `强制缓存就是向浏览器缓存查找该请求结果`，并根据该结果的缓存规则来决定是否使用该缓存结果的过程
		> 判断缓存是否过期的字段是
			> `Cache-Control(http1.1)`:  Cache-Control:max-age=600 在600秒内再次发起该请求，则会直接使用缓存结果，强制缓存生效
			> `Expires(http1.0 因为会客户端与服务端的时间发生误差淘汰了)`
		> 如果缓存有效没有过期，那么请求返回200的状态码，并且Size显示`from disk cache`或`from memory cache`。
		> 如果缓存获取失败，那么携带标识字段向服务器发起请求，字段是
			> 请求`If-modified-since`/ 响应`Last-modified`:服务器端资源文件的最后修改时间，缺点只能精确到秒并且修改时间更新不代表内容更新会出现重复请求
			> `(优先级更高)`请求`If-No-Match`:响应`Etag`:服务器根据实体内容生成的一段hash字符串，如果没修改就304，修改了就200
	- #### 协商缓存
		> 协商缓存就是`强制缓存失效后`，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
		> 协商缓存生效，返回`304`
		> 协商缓存失效(就跟没缓存一样正常请求)，返回200和请求结果结果
		> 相关字段 `Etag / If-None-Match`和`Last-Modified / If-Modified-Since`

	> `缓存的存储位置`分为以下四大类
	- #### ServiceWorker
		> Service Worker 是一个注册在指定源和路径下事件驱动的`独立线程`，因此window以及DOM都是不能访问的,必须是https协议或本地开发,采用 JavaScrip t控制关联的页面或者网站资源，拦截并修改访问和资源请求，更精细地缓存资源
		> Service Worker的`缓存是永久性的`，关闭浏览器打开还是存在，除了手动调用API清除以及存储容量超过限制被清除外，一般都能持续存在
		> 生命周期
			> - Download – 下载注册的JS文件
			> - Install – 安装
			> - Activate – 激活
			```javascript
				`注册一个service worker`
				if ('serviceWorker' in navigator) {
					navigator.serviceWorker.register('./sw-demo-cache.js');
				}
			```
		> 还可以监听fetch事件 目前一般用`install`用来缓存文件，`activate`用来缓存更新，`fetch`用来拦截请求直接`返回缓存数据`
		```javascript
			self.addEventListener('install', function(event) { /* 安装后... */ });
			self.addEventListener('activate', function(event) { /* 激活后... */ });
			self.addEventListener('fetch', function(event) { /* 请求后...这里可以拦截请求并返回缓存数据 */ });
		```
		> 所以是如何缓存数据的呢？
		ServeiceWorker有两个API：`Cache`和`CacheStorage`, 
		```javascript
			this.addEventListener('fetch', function(event) {
				event.respondWith(
					caches.match(event.request) // 返回缓存数据
				);
			});
		```
	- #### memory cache
		> 会缓存js和图片等文件
		> 内存中的缓存，在尝试读取本地缓存时，总是先读内存，再读硬盘，毕竟访问内存更快。原则上可以存任何东西
		> 内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取。但进程关闭，缓存都清空
		> 与 `memory cache` 相关的机制有 `preloader` 和 `preload` 两种：
	- #### disk cache
		> 是持久存储
		> 硬盘缓存则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行I/O操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。但是要比发网络请求要快很多
	- #### network request

- ### 输入url到看到页面都经历了啥
- ### 说说数组的常用方法和对应实现
- ### 如何实现一个事件的发布订阅
- ### EventLoop运行机制
	> 概念定义：callStack是用来执行JS代码 callbackQueue用来存异步事件callback EventLoop是个协调者，他一直给callStack介绍工作，不让它闲着
	> 浏览器默认每个Tab页面一个进程，互不影响，主要用于页面渲染，脚本执行，事件处理等
	> 浏览器的渲染进程`是多线程的`JS是`单线程`的，一个进程包含多个线程
	> 一个进程的内部包含如下线程
		> - GUI渲染线程 负责渲染浏览器界面，解析HTML、CSS，构建DOM树和RenderObject树，布局和绘制. 当界面需要重绘（Repaint)或由于某种操作引发回流（reflow)时，该线程就会执行 `GUI渲染线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中，等到JS引擎空闲时立即被执行。`
		> - JS引擎线程 例如v8
		> - 事件触发线程 就是 eventloop 
		> - 定时触发器线称 传说中的setInterval和setTimeout所在的线程
		> - 异步http请求线程
	> web异步事件结束以后，会有callback，然后runtime把这些callback事件放到Callback Queue里，一旦Call Stack所有的方法都执行完以后，Event Loop会依次把 Callback Queue里的回调函数放到Call Stack里执行

	- #### macrotask和microtask
		> macrotask : 主代码块，setTimeout，setInterval等（可以看到，事件队列中的每一个事件都是一个macrotask）
			>> 每一个task会从头到尾将这个任务执行完毕，不会执行其它浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->...）
		> microtask: Promise，process.nextTick等 补充：在node环境下，process.nextTick的优先级高于Promise
			>> 在当前task执行结束后立即执行的任务, 它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染
		> `也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）`
		> 在ECMAScript中，microtask(宏任务)称为jobs，macrotask(微任务)可称为task
		```javascript
		console.log('script start');
		setTimeout(function() {
				console.log('setTimeout');
		}, 0);
		Promise.resolve().then(function() {
				console.log('promise1');
		}).then(function() {
				console.log('promise2');
		});
		console.log('script end');
		// 打印顺序'script start' 'script end' 'promise1' 'promise2' 'setTimeout'
		```
	> `总结：macrotask -> microtask -> 渲染 -> macrotask`

	- #### 总结事件执行机制
		- 执行一个宏任务（栈中没有就从事件队列中获取）
		- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
		- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
		- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
		- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取)

- ### 事件

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
		> 循环引用是指一个对象A包含一个指向对象B的指针，对象B包含一个指向对象A的指针
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
		> 返回F构造函数的实例，而这个实例的原型对象(__proto__)指向第一个参数
		> Object.create()的基本实现
		```javascript
		function create(proto) {
			function Fn() {};
			// 将Fn的原型指向传入的 proto
			Fn.prototype = proto;
			Fn.prototype.constructor = Fn;
			return new Fn();
		};
		```
	- #### new的简单实现
		```javascript
			function mockNew() {
				// 创建一个空对象
				let emptyObj = new Object();
		​
				// 取传入的第一个参数，即构造函数，并删除第一个参数。
				// 关于为什么要用 Array.prototype.shift.call 的形式，见之前的博客文章 《JavaScript之arguments》
				let constructor =  Array.prototype.shift.call(arguments);
				
				// 类型判断，错误处理
				if(typeof constructor !== "function") {
						throw("构造函数第一个参数应为函数");
				}
				
				// 绑定 constructor 属性
				emptyObj.constructor = constructor;
				
				// 关联 __proto__ 到 constructor.prototype
				emptyObj.__proto__ = constructor.prototype;
				
				// 将构造函数的 this 指向返回的对象 执行一遍构造函数，让原本空空如也的emptyObj拥有各自属性
				// 明白了这里，就明白了为什么是 this.name this.age啥的
				let resultObj = constructor.apply(emptyObj, arguments);
				
				// 返回类型判断, 如果是对象，则返回构造函数返回的对象
				if (!!resultObj && typeof resultObj === "object" || typeof resultObj === "function") {
						return resultObj
				}
				
				// 返回对象
				return emptyObj;
			}
		```
	- #### new和Object.create()不同
		> create(): Object.create是内部定义一个对象，并且让F.prototype对象 赋值为引进的对象/函数 o，并return出一个F的实例
		> new: new做法是新建一个obj对象o1，并且让o1的__proto__指向了Base.prototype对象。并且使用call 进行强转作用环境。从而实现了实例的创建
	- #### 寄生组合继承与Object.create()的关系
		> 所以现在可以理解如下代码和为什么用它来继承，组合继承的缺点就是调用了两遍父类构造函数，所以我们可以用Object.create()来简化将A的实例复制给B的原型对象，本来A的实例是有构造函数和构造函数原型对象的所有属性的，不过这个时候我们就可以通过Object.create(A.prototype)得到一个__proto__属性指向父类原型对象,但其实为空的实例来当做B的原型对象。这个对象对应的构造函数是一个隐藏的F构造函数，这个F其实就是个空函数。
		> 
		```javascript
			const me = Object.create(person); // me.__proto__ === person
			var a = Object.create(null); // 新对象就彻彻底底是个空对象，没有继承Object.prototype上的任何属性和方法
			console.log(a instanceof Object); // false 

			function Person(name, sex) { 
				this.name = name
				this.sex = sex
			}
			Person.prototype.getInfo = function() {
				console.log('getInfo: [name:' + this.name + ', sex:' + this.sex + ']')
			}
			const a = new Person('jojo', 'femal')
			const b = Object.create(Person.prototype, {
				age: {
					value: 13,
					writble: false,
					configurable: true,
					enumerable: true,
				}
			})
			console.log(b.name, b.age) // undefined 13 这里找不到name因为它的构造函数是F不是Person,而F就是个隐藏的可以被第二个参数自定义的构造函数
		```
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
	- #### 异步相关概念和代码执行顺序
		> js单线程，我们所谓的异步也是假的
		> 异步的四种解决方案: 回调函数、事件监听、发布/订阅、Promise对象
		> 下面这些的操作顺序
		```javascript
			const foo = function() {
				console.log('foo begins')
				setTimeout(function() {
					console.log('foo finished')
				})
			}

			const bar = function() {
				console.log('bar executed')
			}
			foo()
			bar()
			// fooo begins/ barexecuted/ foo finishes

			let promise = new Promise(function(resolve, reject) {
				console.log('Promise');
				resolve();
			});

			promise.then(function() {
				console.log('resolved.');
			});

			console.log('Hi!');
			// Promise
			// Hi!
			// resolved

			const p1 = new Promise(function (resolve, reject) {
				setTimeout(() => reject(new Error('fail')), 3000)
			})

			const p2 = new Promise(function (resolve, reject) {
				setTimeout(() => resolve(p1), 1000)
			})

			p2
				.then(result => console.log(result))
				.catch(error => console.log(error))
			// Error: fail

			// 这是一个给定状态值后的promise对象也就是reject函数永远都不会被执行
			var original = Promise.resolve(33);
			var cast = Promise.resolve(original) // 这里cast和original相等
			cast.then(function(value) {
				console.log('value: ' + value);
			});
			console.log('original === cast ? ' + (original === cast));

			/*
			*  打印顺序如下，这里有一个同步异步先后执行的区别
			*  original === cast ? true
			*  value: 33
			*/
		```

	- #### 概念和用法
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
  [todo1](https://juejin.im/post/6844903917583597575#heading-5)
  [todo2](https://juejin.im/post/6844903976698118151#heading-4)
	- #### generator
  [todo3](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112)

- ### 函数的节流和去抖
	- #### 节流
		> 规定在`一个单位时间内，只能触发一次函数`。如果这个单位时间内触发多次函数，只有一次生效。
		> 使用场景： 游戏中的刷新率 DOM元素拖拽 Canvas画笔功能。一句话 `适合大量事件按时间做平均分配触发。`
		> 实现
			```javascript
				const throttle = (fn, delay = 500) => {
					let flag = true;
					return (...args) => {
						if (!flag) return;
						flag = false;
						setTimeout(() => {
							fn.apply(this, args);
							flag = true
						}, delay)
					}
				}
	- #### 防抖
		> `在事件被触发n秒后再执行回调`，如果在这n秒内又被触发，则重新计时
		> 使用场景：给按钮加函数防抖防止表单多次提交 对于输入框连续输入进行AJAX验证时 一句话:`适合多次事件一次响应的情况`
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
	> class仅仅是对原型对象运用的语法糖 `typeof class === 'function'` 可见它不是新的数据类型，只是封装好的语法糖
	- #### 基本用法
		```javascript
			function Person(name,age) {
					this.name = name;
					this.age = age;
			}
			Person.prototype.sayInfo = function () {
					console.log(`${this.name}是${this.age}岁`)
			}
			const liLei = new Person('LiLei',20)
			liLei.sayInfo() //LiLei是20岁
			`把上面的转换成class`
			class Person{ //定义了一个名字为Person的类
				constructor(name,age){ //constructor是一个构造方法，用来接收参数 没有constructor的类会默认生成一个constructor构造器
					this.name = name;  //this代表的是实例对象
					this.age = age;
				}
				sayInfo(){ //这样直接写在constructor外面的就等于直接在原型对象上定义一个函数
					console.log(`${this.name}是${this.age}岁`)
				}
			}
			const liLei = new Person('LiLei',21)
			liLei.sayInfo()
			`其实说白了就是构造函数的另一种写法`
			console.log(typeof Person);//function
			console.log(Person===Person.prototype.constructor);//true
		```
- #### class继承
	> 继承是通过`extend`这个关键字实现的
	> `super`
	> 用来访问父类的构造器或者函数用的, super只能访问父类的方法和变量，`不能访问私有变量`
	> `static`
	> 我们可以把一个方法赋值给类的函数本身，而不是赋给它的 "prototype"。这样的方法被称为 静态的（static）。可以是属性，也可以是方法
	> static方法不能被实例对象调用，`只能通过类名来调用`, 可以被继承,如果静态方法包含this关键字，这个this指的是类，而不是实例。
	> 类有两种定义属性的方式： `constructor`里面或者`get name/set name`
	> 静态的都可以被继承
	```javascript
		class Student {
			constructor(name){
				this.name = name
			}
			get prop() {
				return 'getter'
			}
			set prop(value) {
				console.log('setter: '+value)
			}
			sayName(){
				console.log(this.name)
			}
			static hello() {
				console.log('hello, im a static func')
			}
			testFn(){
				console.log('我是父类的函数！')
			}
		}
		class Worker extends Student{
				sayWork(){
						console.log(this.name)
				}
				testFn(){
						console.log('我是子类的函数！')
				}
		}
		const person = new Worker('liLei')
		person.sayName() // liLei
		person.sayWork() // liLei
		person.testFn() //我是子类的函数！由此可见，父类的同名方法被覆盖掉了
		person.prop = 'ddd' // 'setter: ddd'
		person.prop // getter

		`添加super来补充继承`
		class Worker extends Student{
			constructor(name,age,sex){
				super(name) //也可以不传入参数，但是这里必须先调用super，算是对子类构造函数的一种扩展, 才有下文的this对象，这里扩展了一个变量age 可以把super看成父类的一个实例
				this.age = age
				this.sex = sex
			}
			testFn(){
				super.testFn()
				console.log("年龄" + this.age)
				console.log("性别" + this.sex)
				console.log('我是子类的函数！')
			}
		}

		const Tom = new Worker('Tom', 20, 'boy')
		Tom.testFn() // 我是父类的函数！ 年龄20 性别boy 我是子类的函数！
		Worker.hello() // hello, i'm a static func
		Tom.hello() // student.sayName is not a function
	```
- #### class的this指向问题
	> 由于 class 内部是`严格模式`，所以 this 实际指向的是`undefined`
	```javascript
	class Logger {
		printName(name = 'there') {
			this.print(`Hello ${name}`);
		}

		print(text) {
			console.log(text);
		}
	}
	const logger = new Logger();
	logger.printName() // Hello there
	const { printName } = logger;
	printName(); // TypeError: Cannot read property 'print' of undefined

	`解决办法`
  constructor() {
    this.printName = this.printName.bind(this);
  }
	constructor() {
    this.getThis = () => this; // 箭头函数内部的this总是指向定义时所在的对象
  }
- #### class的实现
	> 具体参见class实现.js

- ### 箭头函数和普通函数
	> - 箭头函数不会创建自己的this
	> - 箭头函数继承而来的this指向永远不变
	> - 箭头函数没有arguments
	> - 箭头函数没有原型prototype
	> 箭头函数没有自己的this，`它会捕获自己在定义时（注意，是定义时，不是调用时）所处的外层执行环境的this`，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。
```javascript
	var id = 'Global';
	function fun1() {
			// setTimeout中使用普通函数
			setTimeout(function(){
					console.log(this.id);
			}, 2000);
	}
	function fun2() {
			// setTimeout中使用箭头函数
			setTimeout(() => {
					console.log(this.id); // 这个箭头函数的this在定义时就确定了，它继承了它外层fun2的执行环境中的this
			}, 2000)
	}
	fun1.call({id: 'Obj'});     // 'Global'
	fun2.call({id: 'Obj'});     // 'Obj'

	`这里要注意，定义对象的大括号{}是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中！！`
	var id = 'GLOBAL';
	var obj = {
		id: 'OBJ',
		a: function(){
			console.log(this.id);
		},
		b: () => {
			console.log(this.id); // 继承定义它的环境的this，定义它的时候这里属于全局执行环境
			console.log(arguments); // 因为外层全局环境没有arguments对象 会报错arguments is not defined
		}
	};
	obj.a();    // 'OBJ'
	obj.b();    // 'GLOBAL'

```
- ### buffer&stream
- ### 什么是高阶函数

- ### location.href
	> window.location.href // 获取当前url

- ### es6-es10新特性
```javascript
	`es7 幂运算符**，具有与Math.pow()一样的功能，代码如下`
	console.log(2**10) // 1024 
	console.log(Math.pow(2, 10)) // 1024

	`es8 object.entries()`
	for (let [key, value] of Object.entries(object1)) {
		console.log(`${key}: ${value}`)
	}
```

## 浏览器
-----------------------------------------------
- #### 302和304
> 302代表暂时重定向，304代表资源没有变动用本地缓存就行


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
- ### 什么是spa

## React
-----------------------------------------------
- ### 生命周期
- ### class和function
	- #### 优缺点
	- #### 使用场景

## 小程序相关
-----------------------------------------------
- ### 小程序生命周期
- ### mpvue生命周期
- ### uniapp生命周期
- ### taro生命周期
- ### 如何实现0.5px
- ### rem和px的转换
- ### 小程序的适配问题


