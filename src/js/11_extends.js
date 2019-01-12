/** 
 *类的继承extends 
 */
// 1. 简介
{
  class Point {}

  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y);// 调用父类的constructor
      this.color = color;
    }
    toString(){
      return this.color + '' + super.toString;
    }
  }
  console.log(Object.getPrototypeOf(ColorPoint) === Point);// true
}
// 2. super关键字
// super当作函数使用时，代表父类的构造函数
{
  class A {
    constructor(){
      console.log(new.target.name);
    }
  }
  class B extends A {
    constructor(){
      super();
    }
  }
  new A();// A
  new B();// B
}
// super作为对象使用时,
// 普通方法中
{
  class C {
    p(){
      return 2;
    }
  }
  class D extends C{
    constructor(){
      super();
      console.log(super.p());// 2
    }
  }
}


