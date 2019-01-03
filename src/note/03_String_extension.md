# 字符串的扩展

## 1. 字符的Unicode表示法

JavaScript允许用`\uxxxx`来表示一个字符，其中xxxx表示字符串的Unicode码。如：

```js
console.log('\u0061');// a
```

但是，这种表示法只限于码点在`\u0000~\uFFFF`之间。超过这个范围的字符，必须使用两个双字节的形式表示。

当使用了超过这个范围的数值，如`\u20BB7`，JavaScript会理解成`\u20BB+7`。会输出这样的结果`₻7`。

在**ES6**中有了一点改变。只要将码点放入大括号，就能正确解读该字符。

```js
console.log(`\u{20BB7}`);// 𠮷
```

## 2. codePointAt()

在JavaScript内部，字符以UTF-16的格式存储，每个字符固定为两个子节。对于需要4个子节存储的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为他们是2个字符。

```js
let s = '𠮷';    //'\u{20BB7}'

console.log('length', s.length);    // length 2
// charAt()返回在指定位置的字符
console.log(s.charAt(0));           // �
console.log(s.charAt(1));           // �
// charCodeAt()返回指定位置字符的Unicode编码
console.log(s.charCodeAt(0));       // 55362
console.log(s.charCodeAt(1));       // 57271
```

在上述代码中，由于汉字“𠮷”需要四个子节存储。JavaScript不能正确处理，字符串长度会被误判为2，而且`charAt()`无法正确读取整个字符，`charCodeAt()`方法只能分别返回前两个字节和后两个字节。

ES6提供了一个`codePointAt()`方法，能够正确的处理4个字节储存的字符，返回一个字符的码点。

```js
let s = '𠮷a';
console.log(s.codePointAt(0));  // 134071
console.log(s.codePointAt(1));  // 57271
console.log(s.codePointAt(2));  // 97
```

**参数：**pos，这个字符串中需要转码的元素的位置（从0开始）

**返回值：**是在字符串中的给定索引的编码单元体现的数字，如果在索引出没有找到元素，则返回`undefined`。返回的是码点的十进制值。

JavaScript将“𠮷a”视为3个字符。`codePointAt`方法在第一个字符上正确识别了“𠮷”，返回了它的十进制码点134071（即十六进制的20BB7）。在第二个字符和第三个字符“a”上，codePointAt方法的结果与charCodeAt方法的结果一样。

将返回的十进制的码点转换为十六进制可以使用`toString()`来转换。

```js
let s = '𠮷a';
console.log(s.codePointAt(0).toString(16));  // 20bb7
console.log(s.codePointAt(1).toString(16));  // dfb7
console.log(s.codePointAt(2).toString(16));  // 61
```

### 用途

`codePointAt()`方法是测试一个字符是由2个字节还是4个字节组成的最简单方法

```js
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit('𠮷')); // true
console.log(is32Bit('a')); // false
```

## 3. 字符串的遍历器接口

ES6为字符串添加了遍历器接口，使得字符串可以由for...of循环遍历。

```js
for (let codePoint of 'hello') {
    console.log(codePoint); // h e l l o
}
```

同样可以识别大于0xFFFF的码点。传统的for循环无法识别这样的码点。

```js
let s = '\u{20bb7}';
for (let i of s) {
    console.log(i); // 𠮷
}
```

## 4. includes(),startsWith(),endsWidth()

在传统上，JavaScript中只有`indexof`方法可用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种方式：

+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

```js
let str = 'hello world';

console.log(str.includes('hello')); // true
console.log(str.startsWith('h'));   // true
console.log(str.endsWith('hello')); // false
```

## 5. repeat()

repeat()方法返回一个新字符串，表示将原字符串重复n次。

```js
console.log('x'.repeat(3));     // xxx
console.log('hello'.repeat(2)); // hellohello
console.log('hello'.repeat(0)); // ''

// 如果是小数，会被取整
console.log('hello'.repeat(2.9));   // hellohello

// 如果参数是负数或者Infinity，会报错
console.log('hello'.repeat(-1));    // RangeError: Invalid count value
console.log('hello'.repeat(Infinity)); // RangeError: Invalid count value

// 如果参数是0~-1之间的小数，则等同于0。
console.log('hello'.repeat(-0.9));  // ''

// 参数是NaN，等同于0
console.log('hello'.repeat(NaN));   // ''

// 参数是字符串，先转换为数字
console.log('hello'.repeat('3'));   // hellohellohello
console.log('hello'.repeat('he'));  // ''
```

## 6. padStart(),padEnd()

ES2017引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。

`padStart()`用于头部补全，`padEnd()`用于尾部补全。

`padStart()`,`padEnd()`分别接受两个参数，第一个参数用来指定字符串最小长度，第二个参数则是用来补全的字符串。

```js
console.log('x'.padStart(5, 'ab')); // ababx
console.log('x'.padStart(4, 'ab')); // abax

console.log('x'.padEnd(5, 'ab')); // xabab
console.log('x'.padEnd(4, 'ab')); // xaba

// 如果原字符串的长度大于或等于指定的最小长度，则返回原字符串
console.log('xxx'.padStart(2, 'ab')); // xxx
console.log('xxx'.padEnd(2, 'ab')); // xxx

// 如果用来补全的字符串的长度与原字符串的长度之和超过了指定的最大长度，就会截取超出位数的补全字符串
console.log('abc'.padStart(10, '0123456789')); // 0123456abc

// 如果省略第二个参数，则会用第二个参数补全
console.log('x'.padStart(4)); // '   x'
console.log('x'.padEnd(4)); // 'x   '

// 用途
// padStart()的常见用途是为数值补全指定位数，如日期与天数等
console.log('1'.padStart(2, '0'));   // 01

// 另一个用途是提示字符串格式
console.log('12'.padStart(10, 'YYYY-MM-DD'));    // YYYY-MM-12
console.log('09-12'.padStart(10, 'YYYY-MM-DD'));    // YYYY-09-12
```

## 7. 模板字符串

模板字符串是增强版的字符串，用反引号（`）来标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中定义变量。

```js
// 普通字符串
console.log(`In JavaScript '\n' is a line feed.`);  // In JavaScript '
// ' is a line feed
// 多行字符串
console.log(`In JavaScript this is 
not legal.`);

// 字符串中嵌入变量
let name = 'Bob', time = 'today';
console.log(`Hello ${name}, how are you ${time}?`); // Hello Bob, how are you today?
```

### 模板字符串的用法

```js
// 7.1 大括号内可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性
{
    let x = 1;
    let y = 2;
    console.log(`${x} + ${y} = ${x + y}`);  // 1 + 2 = 3
    console.log(`${x} + ${y * 2} = ${x + y * 2}`);  // 1 + 4 = 5

    let obj = {x: 1, y: 2};
    console.log(`${obj.x + obj.y}`);
}
// 7.2 模板字符串还可以调用函数
function fn() {
    return 'hello world';
}
console.log(`${fn()}`); // hello world
```