### let

#### 1. 基本用法

let用于定义变量，但是变量只能在let命令所在的代码块中有效

例：

```js
for(let i = 1; i<3; i++){
    console.log(i);	// 1 2
}
console.log(i);	// ReferenceError: i is not defined
```

#### 2. 严格模式

严格模式下，变量未声明，不能引用，某则会报引用错误。

ES6是默认开启严格模式的。

ES5中默认不开启严格模式，要开启的话，必须在开头加上"use strict"。未开启严格模式在ES5中的表现就是变量会提升。

例：

```js
console.log(a);	// undefined
var a = 10;

console.log(b);	// ReferenceError: b is not defined
let b = 10;
```

#### 3. 不能重复声明

不能再同一块作用域下，使用let声明同一变量，不然会报错。

例：

```js
let a = 1;
let a = 2;
// 报错，Duplicate declaration "a"。重复声明"a"


let b = 1;
{
    let b = 2;
}
// 这样写就不会报错，相同的变量再不同的作用域中
```

```js
var a = 1;
var a = 2;
// 用var声明也不会报错，
```

### Const

const用来定义常量，常量就是不允许去改变的值。用大写字母、下划线和$符号来表示。

#### 1. const不允许被修改

例：

```js
const PI = 3.1415926;
PI = 3.14;
console.log(PI);
// 报错，"PI" is read-only;
```

#### 2. const声明常量时，必须赋值

例：

```js
const PI;
PI = 3.1415;
console.log(PI);
// 报错，Unexpected token
```

#### 3. const声明对象

例：

```js
const PI = 3.1415;
const K = {
    a: 1,
}
console.log(PI,K);// 3.1415{a: 1}
```

当给K再添加一个属性，`K.b = 2;`，输出的结果是`3.1415{a: 1,	b: 2}`

看上去是声明的常量K的值改变了，其实不是的。K是一个对象，对象是引用类型，返回的是存储在内存中对象的指针，K指向那个指针，指针不会改变，值可以改变。