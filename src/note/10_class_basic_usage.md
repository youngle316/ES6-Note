# Class的基本用法

## 1. 简介

`JavaScript`语言的传统方式是通过构造函数定义并生成新对象。如：

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return this.x, this.y;
}

var p = new Point(1, 2);
```

上面这种写法与传统的面向对象的语言（如C++和Java）的写法差异很大。

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念作为对象的模板。通过class关键字可以定义类。基本上，ES6的class可以看作是一个语法糖，它的绝大部分功能，ES5都能实现。新的写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已。

上面的代码可以用ES6的类来改写

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return this.x + this.y;
  }
}
```

上面的代码创建了一个类，同时也有一个`constructor`方法，这就是构造方法。而this关键字则表示实例对象。也就是说，ES5的构造函数`Point`对应着ES6的`Point`类的构造方法。

`Point`类除了构造方法，还定义了一个`toString`方法。

> ES6的类完全可以看作构造函数的另一种写法。

```js
console.log(typeof Point);// 'function'
console.log(Point === Point.prototype.constructor);// true
```

可以看到，类的数据类型就是函数，类本身就指向构造函数。

看下面这个例子。类的使用注意点

```js
class Bar {
  doStuff() {
    console.log('stuff');
  }
}
var b = new Bar();
b.doStuff(); // "stuff"
```

+ 使用的时候也是直接对类使用`new`命令，跟构造函数的用法一致。
+ 类的所有方法都定义在类的`prototype`属性上。

```js
//相当于
Bar.prototype = {
  doStuff(){}
}
```

+ 在类的实例上调用方法，就是在调用原型上的方法。

```js
console.log(b.doStuff === Bar.prototype.doStuff);//true
```

+ 类的新方法都是添加在`prototype`对象上。`Object.assign`方法可以很方便得一次性的添加多个方法。

```js
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
```

+ `prototype`对象的`constructor`属性直接指向类本身，这与ES5是一致的。

```js
console.log(Bar.prototype.constructor === Bar);//true
```

+ 类的内部定义的所有方法都是不可枚举的（non-enumerable）。这与ES5的行为不一致。

## 2. constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时自动调用该方法。一个类必须有`constructor`方法，如果没有显示定义，一个空的`constructor`方法会被默认加载。

```js
class Point{

}
// 等同于
class Point{
  constructor(){

  }
}
```

+ `constructor`方法默认返回实例对象（即this），不过完全可以指定返回另外一个对象。

```js
class Foo {
  constructor(){
    return Object.create(null);
  }
}
console.log(new Foo instanceof Foo);//false
```

上面的代码中，`constructor`函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

+ 类必须用`new`来调用，否则会报错。这是它和普通构造函数的一个主要区别，后面不用`new`也可以执行。

## 3. 类的实例对象

+ 生成实例对象的写法与ES5完全一样，也是使用`new`命令。
+ 与ES5一样，实例的属性除非显示定义在其本身上（即this对象），否则都是定义在原型上（即Class）上。

```js
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
console.log(point.toString()); // 2,3
console.log(point.hasOwnProperty('x'));//true
console.log(point.hasOwnProperty('y'));//true
console.log(point.hasOwnProperty('toString'));//false
console.log(point.__proto__.hasOwnProperty('toString'));//true
```

> `hasOwnProperty()`会返回一个布尔值，判断对象自身属性中是否具有指定的属性

上面的代码中，`x`和`y`都是实例对象`point`自身的属性（因为定义在this变量上），所以`hasOwnProperty`会返回true。而`toString`是原型对象的属性（定义在Point上），所以`hasOwnProperty`返回的是false。这些都与ES5一致。

+ 与ES5一样，类所有的实例对象共享一个原型对象。

```js
var point = new Point(2, 3);
var point1 = new Point(3, 2);
console.log(point.__proto__ === point1.__proto__);//true
```

上面的代码中，`point`和`point1`都是类的实例对象，他们的原型都是`Point.prototype`。所以他们的`__proto__`相等。

这意味着，可以通过实例的`__proto__`属性为类来添加方法。

> 注意：`__proto__`不是一个语言本身的特性，而是各大厂商具体实现时添加的私有属性。虽然现在很多现代浏览器JS引擎中都提供了这个私有属性，但是还是不建议在生产中使用这个属性。避免对环境产生依赖。生产环境中，可以使用`Object.getPrototypeOf`方法来获取实例对象的原型，然后再来为原型添加属性和方法。

## 4. Class表达式

与函数一样，类也可以用表达式来表示。

```js
const myName = class Me {
  getClassName(){
    return Me.name;
  }
}
let inst = new myName();
console.log(inst.getClassName());//Me
console.log(Me.name)// ReferenceError: Me is not defined
```

上面的代码使用表达式定义了一个类，类的名字是`myName`而不是`Me`。`Me`只在类的内部代码可用，指代当前类。如果在外部使用的话，会报错显示未定义。

如果类的内部没有用到`Me`，则可以省略`Me`。

```js
const myName = class {/** */};
```

采用Class表达式，可以写出立即执行的Class。

```js
let person = new class{
  constructor(name){
    this.name = name;
  }
  sayName(){
    console.log(this.name);
  }
}('张三');
person.sayName();//'张三'
```

## 5. 不存在变量提升

类不存在变量提升，这与ES5是不同的。

```js'
new Foo();// 报错
class Foo();
```

上面的代码中，Foo类使用在前，定义在后，就会报错。因为ES6不会把变量声明提升到代码头部，这种规定的原因是与继承有关，必须保证子类再父类之后定义。

## 6. 私有方法

ES6不支持私有方法，但有以下几种变通方式可以支持

1. 在命名上加以区别
2. 将私有方法移除模块

```js
class Widget{
  // 共有方法
  foo (baz){
    bar.call(this, baz);
  }
}
function bar(baz){
  return this.snaf = baz;
}
```

上面代码中，`foo`是一个共有方法，内部调用了`bar.call(this, baz)`。这使得bar实际上成为了当前模块的私有方法。

3. 利用`Symbol`的唯一性，将私有方法的名字命名为一个`Symbol`值。

## 7. 私有属性

ES6不支持私有属性。但是有一个提案为类添加了私有属性。方法是在属性名之前，使用`#`来表示。

## 8. this的指向

类的方法内部如果含有`this`，则默认指向类的实例。

## 9. name属性

name属性总是返回紧跟在class关键字后面的类名。

## 10. Class的静态方法

类相当于实例的原型，所有在类上定义的方法都能被所有实例继承。如果在方法前面加上一个`static`就表示这个方法是一个静态方法，不会被类的实例继承，而是直接通过类调用。

+ 在实例上调用静态方法，会报错。
+ 父类的静态方法可以被子类继承。
+ 静态方法也可以从`super`对象上调用。

## 11. Class的静态属性和实例属性

静态属性是指Class本身的属性，即`Class.propname`，而不是定义在实例对象上的属性。

+ Class的实例属性可以用等式写入类的定义之中。

```js
class myName = {
  myProp = 24;
}
```

上面代码中，`myProp`就是`myName`类的实例属性。

+ 静态属性可以直接在实例属性前加上`static`，就可以表示为静态属性。
