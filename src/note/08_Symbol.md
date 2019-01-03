# Symbol

## 1. 概述

ES6引入了新的原始数据类型——（Symbol），表示独一无二的值。它是JavaScript语言的第7种数据类型，前六种分别是 `null`，`undefined`，布尔值，字符串，数值和对象（Object）。

Symbol是通过`Symbol`函数生成。

```js
let s = Symbol();
console.log(typeof s);// symbol
```

Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述。主要是为了在控制台显示，或是转换为字符串时比较容易区分。

```js
console.log(s1);// Symbol(foo)
console.log(s2);// Symbol(bar)
console.log(s1.toString());// "Symbol(foo)"
console.log(s2.toString());// "Symbol(bar)"
```

+ Symbol值不能和其他类型的值进行计算，会报错
+ Symbol可以显示转换为字符串。用`toString()`方法
+ Symbol也可以转换为布尔值，但是不能转换为数值。

```js
let sym = Symbol();
console.log(Boolean(sym));// true
console.log(!sym);// false

console.log(sym + 2);// 报错 TypeError
console.log(Number(sym));// 报错 TypeError
```

## 2. 作为属性名的Symbol

Symbol可以作为标识符用于对象的属性名，保证不会出现同名的属性。但是在书写时要注意以下几点

+ Symbol值作为对象属性名时不能使用点运算符

```js
// 将Symbol值作为对象的属性名的写法
let mySymbol = Symbol();
// 写法一
let a = {};
a[mySymbol] = 'hello';
// 写法二
let a = {
  [mySymbol]: 'hello';
}

// 错误写法
let a = {};
a.mySymbol = 'hello';
console.log(typeof(a.mySymbol));// string
```

使用点运算符会导致a的属性名实际上是一个字符串，而不是一个Symbol值。

+ 在对象内部，使用Symbol值定义对象的属性时，要将Symbol值用中括号括起来

```js
let s = Symbol();
let obj = {
  [s]: function(arg){...}
}
obj[s]{123}
```

+ Symbol作为属性名时，该属性还是公开属性，而不是私有属性。

## 3. 属性名的遍历

### 3.1 Object.getOwnPropertyNames()

Symbol作为属性名，该属性不会出现在`for...in`，`for...of`循环中，也不会被`Object.keys()`，`Object.getOwnPropertyNames()`返回。但是也不是私有属性，有一个`Object.getOwnPropertySymbols`方法可以获得指定对象的所有Symbol属性名。

```js
let a = Symbol('a');
let b = Symbol('b');
let obj = {};

obj[a] = 'Hello';
obj[b] = 'World';

const objSymbols = Object.getOwnPropertySymbols(obj);
console.log(objSymbols);// [Symbol(a), Symbol(b)]
```

### 3.2 Reflect.ownkeys

可以返回所有类型的键名，包括常规键名和Symbol键名。

## 4. Symbol.for()

这个方法用于重新使用同一个Symbol值，它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值；如果没有，就新建并返回一个以该字符串为名称的Symbol值。

```js
let s1 = Symbol('hello');
let s2 = Symbol('hello');
console.log(s1 === s2);// false

let s3 = Symbol.for('hello');
let s4 = Symbol.for('hello');
console.log(s3 === s4);// true
```

Symbol.for()和Symbol这两种写法都会生成新的Symbol。它们的区别是：前者会被登记在全局环境中供搜索，而后者不会。Symbol.for()不会在每次调用时都返回一个新的Symbol类型的值，而是会先检查给定的key在全局中是否存在，如果不存在会创建一个新的值。

## 5. Symbol.keyfor()

这个方法返回一个已经登记的Symbol类型值的key。

```js
let s1 = Symbol.for('hello');
console.log(Symbol.keyFor(s1));// "hello"

let s2 = Symbol('world');
console.log(Symbol.keyFor(s2));// undefined
```

上面的代码中，s2属于未登记的Symbol值，所以返回`undefined`。
