# 函数的扩展

## 1. 函数参数的默认值

### 1.1 基本使用

在ES6之前，不能直接为参数设置默认值，需要使用变通的方法。

使用 或运算符来设置默认值

```js
function log(x, y) {
    y = y || 'world';
    console.log(x, y);
}
// 这种写法有缺点
log('hello', ''); // 'hello' 'world'
```

但是这种写法有一定的缺点。如上面代码所示，如果参数y的默认值对应的布尔值是`false`，则该赋值就不会起作用。

在ES6中允许直接为参数设置默认值，直接写在参数定义的后面。

```js
function test(x, y = 'world') {
    console.log(x, y);
}

test('hello');  // hello world
test('hello', 'China');  // hello China
test('hello', '');  // hello
```

优点：

+ ES6的写法比ES5的写法简洁许多，并且更加的自然
+ 阅读代码的人可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档
+ 有利于将来的代码优化

注意点：

+ 参数变量是默认声明的，所以不能用`let`或`const`再次声明
+ 使用默认参数时，函数不能有同名参数
+ 参数默认是不传值的，而是每次都默认重新计算表达式的值。参数默认值是惰性求值的。

### 1.2 函数的length属性

指定了参数默认值以后，函数的`length`属性将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失效。

```js
let f1 = function (a) {};
console.log(f1.length);  //  1

let f2 = function (a = 2) {};
console.log(f2.length);  //  0

let f3 = function (a, b, c = 1) {};
console.log(f3.length);  //  2
```

上面的代码中，`length`属性的返回值是函数的参数个数减去指定了默认值的参数个数。这是因为`length`属性的含义是该函数预期传入的参数个数。一旦设置了默认值，预期传入的参数个数就不包含这个参数了。

但是，如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数。

```js
// 有默认值的参数不是尾参数
let f4 = function (a, b = 2, c) {};
console.log(f4.length);  //  1
```

### 1.3 作用域

一旦设置了参数的默认值，函数进行初始化声明时，参数会形成一个单独的作用域。等到初始化结束，这个作用于就会消失。这种语法在不设置参数默认值时是不会出现的。

```js
let x = 1;

function f(x, y = x) {
    console.log(y);
}

f(2);  // 2
```

在上面的代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

另一个例子

```js
let x = 1;

function f1(y = x) {
    let x = 2;
    console.log(y);
}

f1();  //  1
```

在上面的代码中，函数f1调用时，参数`f = x`形成一个单独的作用域。在这个作用域中，变量x本身没有定义，指向外层全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

如果参数的默认值是一个**函数**，该函数的作用域也遵循这些规则。

## 2. rest参数

ES6中引入了rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要arguments对象了。rest参数搭配的变量是一个**数组**，该变量将多余的参数放入其中。

```js
function add(...values) {
    let sum = 0;
    for (let val of values) {
        sum += val;
    }
    return sum;
}

console.log(add(2, 3, 6));  //  11
```

上面代码中的add函数是一个求和函数，利用rest参数可以像函数传入任意数目的参数。

注意：

+ rest参数之后不能再有任何的其他参数（即rest参数只能放在最后一个），否则会报错。
+ 函数的length属性不包含rest参数。

## 3. 严格模式

从ES5开始，函数内部就可以设定为严格模式

```js
function doSomething(a, b) {
    'use strict';
    // ...
}
```

ES2016做了一点修改，规定只要函数参数使用了默认值，解构赋值或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

```js
function doSomething(a, b=a){
    'use strict';
    // ...
}
```

有两种方法可以规避这种限制。第一种是设定全局性的严格模式。

```js
'use strict'

function doSomething(a, b=a){
    // code
}
```

第二种是将函数包在一个没有参数的立即执行的函数中

```js
const doSomething1 = (function () {
    'use strict';
    return function (value = 16) {
        return value;
    }
})
```

## 4. name属性

函数的name属性返回该函数的函数名。

ES6对这个属性做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性会返回一个空字符串，ES6会返回这个变量名。

```js
var n = function () {};

// ES5
console.log(n.name); // ''
// ES6
console.log(n.name); // 'n'
```

如果将一个具名函数赋值给一个变量，则ES5和ES6返回的都是变量名。

Function构造函数返回的函数实例，name属性的值为`anonymous`。

```js
console.log(new Function().name);  // anonymous
```

## 5. 箭头函数

### 5.1 基本用法

ES6允许使用箭头（=>）来定义函数。

```js
let f = v => v;
console.log(f(1)); // 1
```

上面的箭头函数等同于下面的函数。

```js
var f = function (v) {
    return v;
};

console.log(f(10)); // 10
```

+ 如果箭头函数不需要参数或需要多个参数，就用圆括号来表示参数部分。

```js
// 没有参数
let f = () => 5;
// 等同于
var f = function() {return: 5};
```

```js
// 有多个参数
let sum = (n1, n2) => n1 + n2;
// 等同于
var sum = function(n1, n2) {return n1 + n2};
```

+ 如果箭头函数的代码块多于一条语句，就需要使用大括号将其包裹起来，并使用return语句返回

```js
let sum = (n1, n2) => {
    return n1 + n2
};
```

+ 如果箭头函数直接返回一个对象，必须在对象外面加上一个括号

```js
var getTemplateItem = id => ({id: id, name: 'name'});
```

+ 箭头函数可以与变量解构集合使用

```js
const full = ({first, last}) => first + '' + last;
// 等同于
function full(person) {
    return person.first + '' + person.last;
}
```

+ 箭头函数使得表达更加简洁与清晰

```js
const isEven = n => n % 2 === 0;
console.log(isEven(2)); // true
```

+ 箭头函数可以简化回调函数

```js
// 正常的函数写法
[1, 2, 3].map(function (x) {
    return x * x;
});
// ES6的写法
[1, 2, 3].map(x => x * x);
```

+ rest参数与箭头函数结合使用

```js
const headAndTail = (head, ...tail) => [head, tail];
console.log(headAndTail(1, 2, 3, 4, 5));  // [1, [2, 3, 4, 5]]
```

### 5.2 注意事项

1. 函数体内的this对象就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是不能使用`new`。
3. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`rest`参数替代。
4. 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数。

**this对象指向问题**

```js
// 箭头函数

```