/**
 * Class的基本语法 
 */
// 1. 简介
{
  // ES5中创建新对象的写法
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return this.x, this.y;
  }

  var p = new Point(1, 2);
} {
  // ES6的写法
  //定义类
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return this.x + this.y;
    }
  }
  console.log(typeof Point); // 'function'
  console.log(Point === Point.prototype.constructor); // true
} {
  class Bar {
    doStuff() {
      console.log('stuff');
    }
  }
  var b = new Bar();
  b.doStuff(); // "stuff"
  console.log(b.doStuff === Bar.prototype.doStuff); //true

  Object.assign(Bar.prototype, {
    toString() {
      console.log('string');
    },
    toValue() {
      console.log('value');
    },
  });
  b.toString(); //'string'
  b.toValue(); //'value'
  console.log(Bar.prototype.constructor === Bar); //true
}
// 2. constructor方法
{
  // class Point{

  // }
  // // 等同于
  // class Point{
  //   constructor(){

  //   }
  // }

  class Foo {
    constructor() {
      return Object.create(null);
    }
  }
  console.log(new Foo instanceof Foo); //false
}
// 3. 类的实例对象
{
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return this.x + ',' + this.y;
    }
  }
  var point = new Point(2, 3);
  var point1 = new Point(3, 2);
  console.log(point.__proto__ === point1.__proto__);//true
  console.log(point.toString()); //2,3
  console.log(point.hasOwnProperty('x'));//true
  console.log(point.hasOwnProperty('y'));//true
  console.log(point.hasOwnProperty('toString'));//false
  console.log(point.__proto__.hasOwnProperty('toString'));//true
}
//4. Class表达式
{
  const myName = class Me {
    getClassName(){
      return Me.name;
    }
  }
  let inst = new myName();
  console.log(inst.getClassName());//Me
  // console.log(Me.name)// ReferenceError: Me is not defined

  // 立即执行的类
  let person = new class{
    constructor(name){
      this.name = name;
    }
    sayName(){
      console.log(this.name);
    }
  }('张三');
  person.sayName();//'张三'
}
//5. 私有方法
{
  class Widget{
    // 共有方法
    foo (baz){
      bar.call(this, baz);
    }
  }
  function bar(baz){
    return this.snaf = baz;
  }
}