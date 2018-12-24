### 数值的扩展

### 1. 二进制和八进制表示法

ES6提供了二进制和八进制新的的表示法，

+ 用前缀0b(或0B)表示二进制 （零b）
+ 用前缀0o(或0O)表示八进制 （零o）

```js
// 二进制 0b(或0B)
console.log(0b111110111);	// 503
// 八进制 0o(或0O)
console.log(0o767);	// 503
```

将使用0b和0x前缀的字符串数值转换为十进制数值，前面加Number

```js
console.log(Number('0b111'));	// 7
console.log(Number('0o10'));	// 8
```

### 2. Number.isFinite() 和 Number.isNaN()

ES6在新的对象上新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。

#### 2.1 Number.isFinite()

用来检查一个数值是否为有限的(Finite)

```js
console.log(Number.isFinite(15));   // true
console.log(Number.isFinite(0.8));  // true
console.log(Number.isFinite(NaN));   // false
console.log(Number.isFinite(Infinity));    // false
console.log(Number.isFinite(-Infinity));   // false
console.log(Number.isFinite('foo'));   // false
console.log(Number.isFinite('15'));   // false
console.log(Number.isFinite(true));   // false
```

#### 2.2 Number.isNaN()

用来检查一个数值是否为NaN

```js
console.log(Number.isNaN(NaN)); //true
console.log(15);    // false
console.log('15');  // false
console.log(true);  // false
console.log(9 / NaN);   // true
console.log('true' / 0);    // true
console.log('true' / 'true');   // true
```

#### 2.3 新方法与传统的全局方法的区别

传统方法先调用`Number()`将非数值转为数值，在进行判断。而新方法`Number.isFinite()`只对数值有效，对于非数值一律返回`false`。`Number.isNaN()`只能对于`NaN`才返回true，非`NaN`一律返回false。

### 3. Number.parseInt() 和 Number.parseFloat()

ES6将`Number.parseInt()` 和 `Number.parseFloat()`移植到了Number对象上，用法，结果不变。

```js
// ES5的写法
console.log(parseInt('12.34'));     // 12
console.log(parseFloat('123.45#')); // 123.45

// ES6的写法
console.log(Number.parseInt('12.34'));  // 12
console.log(Number.parseFloat('123.453'));  // 123.453
```

#### 3.1 优点

逐渐减少全局性方法，使得语言逐步模块化。

### 4. Number.isInteger()

用来判断一个数值是否是一个整数。在JavaScript中，整数和浮点数是相同的存储方式。所以5和5.0被视为同一个数。

```js
console.log(Number.isInteger(25));  //true
console.log(Number.isInteger(25.0)); // true
console.log(Number.isInteger(25.1)); // false
console.log(Number.isInteger('15')); // false
console.log(Number.isInteger(true)); // false
```

### 5. Number.EPSILON()

这是一个极小的常量。实质是一个可以接受的误差范围。

```js
console.log(Number.EPSILON);    // 2.220446049250313e-16
// 限制20位
console.log(Number.EPSILON.toFixed(20));    // 0.00000000000000022204
```

#### 5.1 作用

目的是为了浮点数计算时设置一个误差范围。因为浮点数计算是不准确的。

如果这个误差小于 `Number.EPSILON` ，就认为得到了正确的答案。

它的实质就是一个可以接受的误差范围。

```js
// 为浮点数运算误差检查
function withInErrorMargin(left, right) {
    return Math.abs(right - left) < Number.EPSILON;
}

console.log(withInErrorMargin(0.1 + 0.2, 0.3));  // true
console.log(withInErrorMargin(0.2 + 0.2, 0.3));  // false
```

### 6. 安全整数和Number.isSafeInteger()

JavaScript能够准确表示的**整数**范围是**负二的五十三次方~二的五十三次方**（不包含两个端点）。超过这个范围就无法精确表示。

```js
console.log(Math.pow(2, 53));   //  9007199254740992
console.log(9007199254740993);  // 9007199254740992
```

在ES6中引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`两个常量用来表示这个范围的上下线。

```js
console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); //true
console.log(Number.MAX_SAFE_INTEGER === 9007199254740991);  // true
console.log(Number.MAX_SAFE_INTEGER === -Number.MIN_SAFE_INTEGER);  // true
console.log(Number.MIN_SAFE_INTEGER === -9007199254740991); // true
```

上面的代码中，可以看到JavaScript能够精确表示的极限。



`Number.isSafeInteger()`则是用来判断一个**整数**是否落在这个范围之内。

```js
// Number.isSafeInteger()
console.log(Number.isSafeInteger('a')); // false
console.log(Number.isSafeInteger(null)); // false
console.log(Number.isSafeInteger(NaN)); // false
console.log(Number.isSafeInteger(Infinity)); // false
console.log(Number.isSafeInteger(-Infinity)); // false

console.log(Number.isSafeInteger(-3)); // true
console.log(Number.isSafeInteger(3)); // true
console.log(Number.isSafeInteger(1.2)); // false
console.log(Number.isSafeInteger(9007199254740992)); // false
console.log(Number.isSafeInteger(9007199254740990)); // true

console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)); // false
```

### 7. Math对象的扩展

ES6在Math对象上新增了17个方法，都是静态方法，只能在Math对象上调用。

#### 7.1 Math.trunc()

> 用于取出一个数的小数部分，返回整数部分

```js
console.log(Math.trunc(3.16));  // 3
console.log(Math.trunc(3.61));  // 3
console.log(Math.trunc(-3.61));  // -3
console.log(Math.trunc(-3.16));  // -3
```

对于非数值，`Math.trunc`内部使用Number方法先将其转换为数值。

```js
console.log(Math.trunc('123.456')); //123
```

对于空值和无法截取整数的值，返回`NaN`。

```js
console.log(Math.trunc(NaN));   //NaN
console.log(Math.trunc('abc'));   //NaN
console.log(Math.trunc());   //NaN
```

#### 7.2 Math.sign()

> 用于判断一个数是正数，负数，还是零。

```js
// 正数返回 1
console.log(Math.sign(3));  // 1
// 负数返回 -1
console.log(Math.sign(-3)); // -1
// 正零返回 0
console.log(Math.sign(0));  // 0
// 负零返回 -0
console.log(Math.sign(-0)); // -0
```

对于非数值，先将其转换为数值。如果仍为非数值，则返回`NaN`。

```js
console.log(Math.sign('3'));    // 1
console.log(Math.sign(NaN));    // NaN
console.log(Math.sign());   // NaN
```

#### 7.3 Math.cbrt()

> 用于计算一个数的立方根 （Cube root）

```js
console.log(Math.cbrt(8));  // 2
console.log(Math.cbrt(1));  // 1
console.log(Math.cbrt(0));  // 0
console.log(Math.cbrt(-1));  // -1
```

对于非数值，先将其转换为数值。如果仍为非数值，则返回`NaN`。

```js
console.log(Math.cbrt('8')); // 2
console.log(Math.cbrt(NaN)); // NaN
console.log(Math.cbrt()); // NaN
```

#### 7.4 Math.clz32()

JavaScript的整数使用32位2进制形式表示，Math.clz32()方法返回一个数的32位无符号整数形式有多少个前导0。

#### 7.5 Math.fround()

> 返回一个数的单精度浮点数形式

#### 7.6 Math.hypot()

> 返回所有参数的平方和的平方根

```js
console.log(Math.hypot(-3));    // 3
console.log(Math.hypot(3, 4));   // 5
console.log(Math.hypot(2, 3));   // 3.6055512754639896
console.log(Math.hypot());   // 0
console.log(Math.hypot('3', '4'));   // 5
```

#### 7.7 指数运算符

ES2016新增了一个指数运算符（**）

```js
console.log(2 ** 2);    // 4
console.log(2 ** 3);    // 8
```

指数运算符可以和等号连接，成为一个新的赋值运算符（**=）

```js
let a = 2;
console.log(a **= 2);   // 4  相当于 a = a * a
let b = 2;
console.log(b **= 3);   // 8 相当于 b = b * b * b
```

在V8引擎中，指数运算符与Math.pow的实现不相同，对于特别大的运算结果。两者会有细微的差别。



