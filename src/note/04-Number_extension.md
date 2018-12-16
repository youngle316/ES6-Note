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
```

