# 类的继承

## 1. 简介

Class可以通过`extends`关键词进行继承，这比ES5的通过修改原型链实现继承更加方便。

```js
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
```

上面的代码中，`constructor`和`toString`方法中都使用了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。

子类必须在`constructor`方法中调用`super`方法，否则新建实例都会报错。这是因为子类没有自己的this对象，而是调用父类的this对象，如果不使用`super`方法，子类就得不到this对象。

+ 继承实质的区别

**ES5：**先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（Parent.apply(this)）。

**ES6：**先创造父类的实例对象`this`，（所以必须先调用super方法）然后再用子类的构造函数修改`this`。

+ 注意点

如果子类没有定义`constructor`方法，那么这个方法会默认添加。

在子类的构造函数中，只有调用`super`之后才可以使用`this`关键字，否则会报错。这是因为子类实例的构建是基于对父类实例加工，只有`super`方法才能返回父类实例。

## 2. Object.getPrototypeOf()

这个方法可以用来从子类上获取父类，也就是可以判断一个类是否继承了另一个类

```js
console.log(Object.getPrototypeOf(ColorPoint) === Point);// true
```

## 3. super关键字

`super`关键字有两种使用方式

+ 当作函数使用

`super`作为函数调用时，代表的是父类的构造函数。ES6规定，子类的构造函数必须执行一次`super`函数。

```js
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
```

从上面的代码可以看出，`new.target`指向当前正在执行的函数，`super()`虽然代表了父类A的构造函数，但是返回的是子类B的实例，即`super`内部的`this`指向的是B，因此`super()`在这里相当于`A.prototype.constructor.call(this)`。

作为函数使用时，`super()`只能在子类的构造函数中使用，用在其他地方就会报错。

+ 当作对象使用

`super()`作为对象使用时，在普通方法中指向父类的原型对象；在静态方法中指向父类。

1. 普通方法中 ——> **指向父类的原型对象**

```js
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
```

上面的代码中，子类D中的`super.p()`就是将`super`作为一个对象来使用。即在普通方法中指向`C.prototype`。所以`super.p()`就相当于`C.prototype.p()`。

注：由于`super()`指向父类的原型对象，所以定义在父类实例上的方法和属性都不能通过`super`来调用。

2. 静态方法中 ——> 指向**父类**

## 4. 类的prototype属性和`__proto__`属性

+ 子类的`__proto__`属性表示构造函数的继承，指向父类。
+ 子类的`prototype`属性的`__proto__`属性表示方法的继承，总是指向父类的`prototype`属性。
