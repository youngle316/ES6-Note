# 对象的扩展

## 1. 属性的简洁表示法

ES6允许直接写入变量和函数直接作为对象的属性和方法。

### 1.1 属性

```js
var foo = 'bar';
var baz = {foo};
console.log(baz); // {foo:'bar'}

// 等同于
var baz = {foo: "bar"};
```

ES6中允许在对象中只写入属性名，不写属性值。属性值就等于属性名所对应的变量。如上面代码所示。

### 1.2 方法

```js
var f = {
  method() {
    return "Hello";
  }
}
console.log(f.method()); // Hello

// 等同于
var f = {
  method: function(){
    return "Hello";
  }
}
```

注：简洁写法中属性名总是字符串。

### 1.3 用于函数的返回值

```js
function getPoint(){
  var x = 1;
  var y = 10;
  return {x, y};
}
console.log(getPoint()); // {x: 1, y: 10}
```

### 1.4 CommonJS模块输出模块代码

```js
var ms = {};

function getItem(key) {
  return key in ms ? ms[key] : null;
}

function setItem(key, value) {
  ms[key] = value;
}

function clear() {
  ms = {};
}

module.exports = {
  getItem,
  setItem,
  clear
};

// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};
```

## 2. 属性名的表达式

### 2.1 定义属性名

JavaScript定义对象的属性有两种方法。

```js
// 方法一
obj.foo = true;
// 方法二
obj['a' + 'bc'] = '123';
```

上面的方法一是直接使用标识作为属性名；方法二是用表达式作为属性名，这时就需要将表达式放在方括号中。

但是如果使用字面量方式定义对象，就只能使用第一种方式定义属性。

但是在ES6中可以使用第二种方式。

即在使用字面量定义对象时，可以使用表达式作为对象的属性名。将表达式放在中括号中。

```js
// ES5
var obj = {
  foo: true,
  abc: 123
}
// ES6
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: '123',
}
```

### 2.2 定义方法名

表达式同样适用于定义方法名

```js
let obj = {
  ['a' + 'bc']() {
    return 'Hello';
  }
}
```

### 2.3 注意

+ 属性名表达式和简洁表示法不能同时使用，否则会报错。

```js
var foo = 'bar';
var bar = 'abc';
var baz = {[foo]}; // 报错

// 正解
var foo = 'bar';
var baz = {[foo]: 'abc'};
```

+ 如果属性名表达式是一个对象的话，默认情况下会自动将对象转换为字符串。

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB',
};
console.log(myObject); // {[object Object]: "valueB"}
```

在上面的代码中，`[keyA]`和`[keyB]`得到的都是[object Object]，所以`[keyB]`会把`[keyA]`覆盖掉，而`myObject`最后只有一个`[object Object]`属性。

## 3. 对象的扩展运算符

ES2017将这个扩展运算符(...)引入到了对象中。

### 3.1 对象的解构赋值

对象的解构赋值用于从一个对象取值，相当于将所有可遍历的，但尚未被读取的属性分配到指定的对象上面。所有的键和它们的值都会被复制到新的对象上。

```js
let {x, y, ...z} = {x:1, y:2, a:3, b:4};
console.log(x, y, z); // 1 2 {a:3, b:4}
```

上面的代码中，变量z是解构赋值所在的对象。它获取等号右边所有尚未读取的键（a和b），将他们连同值一起复制过来。

注意：

+ 解构赋值的复制是浅复制，即如果一个键的值是复合类型的值（数组，对象，函数），那么解构赋值复制的是这个值的引用，而不是这个值的副本。
+ 解构赋值也不会复制继承原型对象的属性。

作用：

+ 可以扩展某个函数的参数，引入其他操作。

## 4. Object新增的方法

### 4.1 Object.is()

ES5中用判断两个值是否相等的方式是使用这两个运算符：相等运算符(==)和严格相等运算符(===)。它们都有缺点，前者会自动转换数据类型，后者判断`+0`和`-0`相等，`NaN`不等于自身。

所以在ES6中提出了"Same Value Equality"（同值相同）算法来解决这个问题。`Object.is`就是部署这个算法的新方法，用来判断两个数是否严格相等，与严格相等符(===)的行为基本是一致的。

```js
console.log(Object.is('foo', 'foo')); // true
console.log(Object.is({}, {})); // false
```

不同之处只有两个，+0等于-0，`NaN`等于自己本身。

```js
// +0和-0的问题
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

// NaN等于自己本身
console.log(NaN === NaN); // false
console.log(Object.is(NaN,NaN)); // true
```

### 4.2 Object.assign()

#### 4.2.1 基本用法

`Object.assign`方法用于将源对象(source)的所有可枚举属性复制到目标对象(target)。

```js
var target = {a: 1};
var source1 = {b: 2};
var source2 = {c: 3};
Object.assign(target, source1, source2);
console.log(target); // {a: 1, b: 2, c: 3}
```

`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。

+ 如果目标对象和源对象有同名属性，或多个源对象有多个同名属性，则后面的属性会覆盖前面的属性。

```js
var target = {a: 1, b: 2};
var source1 = {b: 3, c: 4};
var source2 = {c: 5};
Object.assign(target, source1, source2);
console.log(target); // {a: 1, b: 3, c: 5}
```

#### 4.2.2 注意点

1. 该方法实行的是浅复制，而不是深复制。也就是说，如果源对象某个属性的值是对象，那么目标对象复制得到的是这个对象的引用。
2. 对于嵌套的对象，一旦遇到同名属性，`Object.assign`的处理方法是替换而不是添加。

#### 4.2.3 常见用途

1. 为对象添加属性
2. 为对象添加方法
3. 克隆对象
4. 合并多个对象
5. 为属性指定默认值

### 4.3 Object.setPrototypeOf()

`Object.setPrototypeOf()`与`__proto__`方法的作用一致，用来设置一个对象的prototype对象，返回参数对象本身。**它是ES6正式推荐的设置原型对象的方法**。

```js
// 格式
Object.setPrototypeOf(object, prototype);

// 用法
var o = Object.setPrototypeOf({}, null);
// 等同于
var o = function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

这是一个例子

```js
let proto = {};
let obj = {x: 10};
Object.setPrototypeOf(obj, proto);
proto.y = 20;
proto.z = 40;

console.log(obj.x); // 10
console.log(obj.y); // 20
console.log(obj.z); // 40
```

上面的代码将`proto`对象设置为`obj`的原型，所以可以从`obj`上获取proto对象上的属性。

如果第一个参数不是对象，则会自动转为对象。但是由于还是返回的第一个参数，所以这个操作不会产生任何操作。

### 4.4 Object.getPrototypeOf

该方法与`setPrototypeOf()`方法配套，用于读取一个对象的prototype对象。

### 4.5 Object.values()

`Object.values()`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值。

```js
var obj = {foo: 'bar', baz: 42};
console.log(Object.values(obj)); // ["bar", 42]
```

### 4.6 Object.entries()

`Object.entries()`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```js
var obj = {foo: 'bar', baz: 42};
console.log(Object.entries(obj)); // [["foo", "bar"], ["baz", 42]]
```