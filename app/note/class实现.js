// 为类依次增加方法
var _createClass = function(){
  function defineProperties(target,props){
      for(let i=0;i<props.length;i++){
          let item = props[i];
          Object.defineProperty(target,item.key,{
              // 此处可以给属性配置是否可配置、是否可检举、是否可写入
              // configurable  enumerable  writable
              // value:item.value
              ...item
          })
      }
  }
  return function(Constructor,protoProps,staticProps){
      // 源 动态 静态
      if(protoProps) defineProperties(Constructor.prototype,protoProps);
      if(staticProps) defineProperties(Constructor,staticProps);
  } 
}();
// 类型检测
function _classCallCheck (instance,Constructor){
  // 检测instance 是否是 Constructor 的一个实例
  // if(!(instance instanceof Constructor)){
  //     // 如果不是通过new出来的  就抛出一个类型错误
  //     throw new TypeError('Cannot with new')
  // }
  if(!(instance instanceof Constructor)){
      // 如果实例不是父类的一个实例
      throw new Error('Cannot with new')
  }
}
let Animal = function(){
  function Animal (type){
      // 检测实例是new出来的还是直接执行的(此处判断依据是this如果是Animal的实例那么就是通过new出来的，如果是直接执行的那么this是window)
      _classCallCheck(this,Animal);
      // 实例属性
      this.type = type;
      return {message:'I LOVE YOU'}
  }
  // target 公用方法  静态方法
  _createClass(Animal,[
      {
          key: 'drink',
          value: function(){
              console.log('会喝奶')
          }
      },
      {
          key: 'eat',
          value: function(){
              console.log('会吃面包');
          }
      }
  ],[
    {
      key: 'drinkFlag',
      value:function(){
          console.log('你才不会喝奶呢!');
      }
  },
  {
      key:'eatFlag',
      value:function(){
          console.log('你才不会喝面包呢！');
      }
  }
]);
return Animal;
}()
// let animal = new Animal('哺乳类');
// console.log(animal.drink());
// console.log(animal.eat());
// console.log(Animal.drinkFlag());
// console.log(Animal.eatFlag());
// 子级继承父级的公有方法
function _inherits(subClass,parentClass){
  // 让子类继承父类的公有方法
  subClass.prototype = Object.create(parentClass.prototype,{Constructor:{value:subClass}});
  // 让子类继承父类的静态方法
  // 原理就是：subClass.__proto__ = parentClass;
  Object.setPrototypeOf(subClass,parentClass)
}

// 子级
let Dog = function(Animal){ // 把要继承的父级传进来
  _inherits(Dog,Animal);// 继承父级的公用方法
  function Dog(type){
      // 检测子类是否是通过new调用的
      _classCallCheck(this,Dog);
      let that = this;
      // 继承父级的私有方法
      let val = Animal.call(this,type);
      // 如果父级返回了一个对象类型，则把this指向为这个返回的对象
      if(typeof val === 'object'){
          that = val;
      }
      return that;
  }
  return Dog;
}(Animal)
let dog = new Dog('哺乳类');
// console.log(Dog.drinkFlag());
// console.log(Dog.eatFlag());
// console.log(dog.drink());
// console.log(dog.eat());
console.log(dog);
// console.log(Animal.prototype)






		function _classCallCheck(instance,constructor){
			if(!(instance instanceof constructor)){
				throw new Error('Class constructor Child cannot be invoked without new')
			}
		}
		//constructor构造函数
		//prprotoPropertys构造函数原型
		//staticPropertys静态方法的描述
		function definePropertys(target,arr){
			for(let i=0;i<arr.length;i++){
				Object.defineProperty(target,arr[i].key,{
					...arr[i],
					configurable : true,
					enumerable : true,
					writable:true
				})
			}
		}
		function _createClass(constructor,protoPropertys,staticPropertys){
			if(protoPropertys.length > 0){
				definePropertys(constructor.prototype,protoPropertys)
			}
			if(staticPropertys.length > 0){
				definePropertys(constructor,staticPropertys)
			}
		}
		let Parent = function(){
			//写逻辑
			function P(){
				_classCallCheck(this,P)
				this.name = 'parent';
				//return {}
			}
			_createClass(P,//属性描述器
				[
					{
						key: 'eat',
						value: function () {
							console.log('吃')
						}
					}
				],
				[
					{
						key:'b',
						value:function () {
							return 2;
						}
					}
				]
			)
			return P;
		}()

		let p = new Parent();
		console.log(p.eat())
		function _inherits(subClass,superClass){
			//继承公有属性
			subClass.prototype = Object.create(superClass.prototype,{constructor:{
				value:subClass
			}})
			//继承静态方法
			Object.setPrototypeOf(subClass,superClass);
		}
		let Child = (function(Parent){
			_inherits(C,Parent)
			//继承私有属性
			function C(){
				_classCallCheck(this,C);
				let that = this;
				let obj = Parent.call(this);//继承并执行父类
				if(typeof obj === 'object'){
					that = obj
				}
				that.age = 9 ; //解决了父类返回引用类型的问题
			} 
			return C;
		})(Parent)
		
		let child = new Child()
		console.log(child)
		console.log(Child.b())
		console.log(parent)
		[Running] node "/Users/myloveyunyun/Desktop/node/pro.js"
		C { name: 'parent', age: 9 }
		2
		P { name: 'parent' }