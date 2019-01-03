# 数组的扩展

## 1. 扩展运算符

### 1.1 含义

扩展运算符（spread）是三个点（...），将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[1, 2, 3]);  // 1 2 3
console.log(1, ...[4, 5, 6], 7);  // 1 4 5 6 7
```

一个应用例子

```js
function add(num1, num2) {
    return num1 + num2;
}

let numbers = [16, 3];
console.log(add(...numbers));  // 19
```

如果扩展运算符后面跟的是一个空数组，则不产生任何影响

```js
console.log([...[], 2]);  // [2]
```

### 1.2 代替数组的apply方法

下面是扩展运算符取代apply方法的一个实际例子：应用`Math.max`方法简化出一个数组中的最大元素。

```js
let arr3 = [3, 1, 6];
// ES5的写法
console.log(Math.max.apply(null, arr3));  // 6
// ES6写法
console.log(Math.max(...arr3));  // 6
```

第二个例子是通过`push`函数将一个数组添加到另一个数组的尾部。

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
// ES5的写法
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);  //  [1,2,3,4,5,6]
// ES6的写法
arr1.push(...arr2);
console.log(arr1);  //  [1,2,3,4,5,6,4,5,6]
```

上面的两个例子，都不再需要`apply`方法将数组转为函数的参数，而是直接使用扩展运算符。

### 1.3 扩展运算符的应用

#### 1.3.1 合并数组

```js
//1.3.1 合并数组
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [7, 8, 9];

// ES5合并数组方法
console.log(arr1.concat(arr2, arr3));  // [1,2,3,4,5,6,7,8,9]
// ES6合并数组方法
console.log([...arr1, ...arr2, ...arr3]);  // [1,2,3,4,5,6,7,8,9]
```

#### 1.3.2 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```js
const [first, ...last] = [1, 2, 3, 4, 5, 6];
console.log(first);  // 1,
console.log(last);  // [2, 3, 4, 5, 6]

const [one, ...two] = [];
console.log(one);  // undefined
console.log(two);  // []

const [a, ...b] = [3];
console.log(a);  // 3
console.log(b);  // []

// 如果将扩展运算符用于数组赋值，则只能将其放在参数的最后一位，否则会报错。
// const [...c, d] = [1, 2, 3, 4, 5];  // 报错
// const [e, ...f, g] = [1, 2, 3, 4, 5];  // 报错
```

#### 1.3.3 函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组和对象。扩展运算符提供了解决这个问题的一种变通方法。

```js
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```

上面的代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

#### 1.3.4 字符串

扩展运算符可以将字符串转换为真正的数组。

```js
console.log([...'hello']);  // ["h", "e", "l", "l", "o"]
```

## 2. Array.from()

`Array.from()`方法用于将两类对象转为真正的数组：类似数组的对象（`array-like object`）和可遍历（`iterable`）对象（包括ES6新增的数据结构Set和Map）。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr1 = Array.from(arrayLike);
console.log(arr1);  // ["a", "b", "c"]
```

实际应用中，常见的类似数组的对象是`DOM`操作返回的`NodeList`集合，以及函数内部的arguments对象。`Array.from`都能将他们转换为真正的数组。

```js
// NodeList 对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
    console.log(p);
})
```

```js
// arguments 对象
function foo() {
    var args = Array.from(arguments);
}
```

Array.from()还可以接受第二个参数，类似于数组的map方法

```js
Array.from(arrayLike, x => x * x);
Array.from(arrayLike).map(x => x * x);

console.log(Array.from([1, 2, 3], (x) => x * x));  // [1, 4, 9]
```

## 3. Array.of()

`Array.of()`用于将一组数值转换为数组。

```js
console.log(Array.of(3, 1, 6));  // [3, 1, 6]
console.log(Array.of(3));  // [3]
console.log(Array.of(3).length);  // 1
```

这个方法主要目的是弥补数组构造函数`Array()`的不足。因为参数个数的不同会导致Array()的行为有差异。

```js
console.log(Array());  // []
console.log(Array(3));  // [, , ,]
console.log(Array(3,1,6));  // [3, 1, 6]
```

在上面的代码中，当Array()没有参数，有一个参数和有三个返回的结果都不一样。只有当参数个数不小于2个时，Array()才会返回由参数组成的数组。参数只有一个时，实际上指定的是数组的长度。

```js
// Array.of()的补充
console.log(Array.of());  //  []
console.log(Array.of(undefined));  // undefined
console.log(Array.of(3, 1));  // [3, 1]
```

## 4. copyWithin()

数组实例中的`copyWithin()`方法会在当前数组内将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。使用这个方法会修改当前壁纸。

```js
Array.prototype.copyWithin(target,start = 0,end = this.length);
```

这个方法有三个参数

+ target：从该位置开始替换数据
+ start：从该位置开始读取数据，默认等于0，如果为负值，表示倒数。
+ end：到该位置前停止读取数据，默认等于数组长度。如果未负值，表示倒数。

这个三个数都应该是数值，如果不是数值，会自动转换为数值。

```js
// 从3号位开始将后面的数，从0号位开始复制
let arr1 = [1, 2, 3, 4, 5];
arr1.copyWithin(0, 3);
console.log(arr1);  // [4, 5, 3, 4, 5]

// 将3号位的数复制到0号位
let arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3, 4);
console.log(arr2);  // [4, 2, 3, 4, 5]

// -3相当于2号位，-2相当于3号位
let arr3 = [1, 2, 3, 4, 5];
arr3.copyWithin(0, -3, -2);
console.log(arr3);  // [3, 2, 3, 4, 5]
```

## 5. find()和findIndex()

### 5.1 find()

数组实例`find()`方法用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

```js
let arr1 = [1, 4, -5, 10];
// 箭头函数
console.log(arr1.find((n) => n < 0));   // -5

let n = arr1.find(function (value) {
    return value > 20;
});
console.log(n);  // undefined
```

### 5.2 findIndex()

数组实例`findIndex()`方法的用法与`find`方法非常类似，返回第一个符合条件的成员的位置，如果没有符合条件的成员，则返回-1。

```js
let arr1 = [1, 4, -5, 10];
console.log(arr1.findIndex((n) => n < 0));   // 2

let n = arr1.findIndex(function (value) {
    return value > 5;
});
console.log(n);  // 3
```

## 6. fill()

数组实例`fill()`使用定值填充一个数组。

```js
console.log(['a', 'b', 'c'].fill(7));  // [7, 7, 7]
```

这个方法用于空数组进行初始化时很方便。数组中已有的元素会被全部抹去。

```js
console.log(['a', 'b', 'c'].fill('7', 1, 2));  // ["a", "7", "c"]
```

## 7. 数组实例的entries(),keys()和values()

ES6提供了三个新方法用于遍历数组。他们都返回一个遍历器对象，可以用`for...of`循环遍历，唯一的区别在于keys()是对键名的遍历，values()是对键值的遍历，entries()是对键值对的遍历。

```js
// keys
for (let index of ['a', 'b'].keys()) {
    console.log(index);  // 0 1
}
// values
for (let ele of ['a', 'b'].values()) {
    console.log(ele);  // 'a' 'b'
}
// entries()
for (let index of ['a', 'b'].entries()) {
    console.log(index);  // [0, "a"]  [1, "b"]
}
```

## 8. 数组实例的includes()

该方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。

```js
let arr1 = [1, 2, 3];
let arr2 = [1,2,NaN];
console.log(arr1.includes(2));  // true
console.log(arr1.includes(4));  // false
console.log(arr2.includes(NaN));  // true
```

使用这个方法可以代替之前使用的`indexOf`方法。`indexOf`第一不够语义化，其含义是找到参与数值的第一个出现的位置，所以需要与-1进行比较，表达起来不够直观。第二是内部使用严格相等符(===)进行判断，会导致NaN的误判。