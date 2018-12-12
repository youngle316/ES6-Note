> ES6允许按照一定的方式从数组或者对象中提取值，然后对变量进行赋值，这被称为解构。

### 数组的解构赋值

#### 1. 完全解构

例：

```js
let [a, b] = [1, 2];
console.log(a, b); // 1 2
```

如上述代码所示，可以从数组中提取值，并按照对应位置对变量进行赋值。

下列代码使用嵌套数组进行解构

```js
{
    let [, , a] = [1, 2, 3];
    console.log(a); // 3
}

{
    let [a, b, ...c] = [1, 2, 3, 4, 5, 6];
    console.log(a, b, c);    // 1 2 [3, 4, 5, 6]
}

{
    let [a, b, ...c] = [1];
    console.log(a, b, c);   // 1 undefined []
}

{
    let [a, [[b], c]] = [1, [[2], 3]];
    console.log(a, b, c)    // 1 2 3
}
```

#### 2. 不完全解构

不完全解构是等号左边的模式只能匹配右边的一部分，但是解构仍然能成功。

例：

```js
let [a, b] = [1, 2, 3];
console.log(a, b);  // 1 2

let [c, [d], e] = [4, [5, 6], 7];
console.log(c, d, e);   // 4 5 7
```

#### 3. 解构不成功

当解构不成功时，变量的值就等于`undefined`。

例：

```js
let [a] = [];
console.log(a); // undefined
let [c, b] = [1];
console.log(c, b); // 1 undefined
```

#### 4. 解构报错

当等号右边不是数组时，（或者严格来说不是可遍历的结构）时，会报错

例：

```js
// 以下的代码都会报错：类型错误。
let [a, b] = null;	
let [c] = 1;
let [d] = false;
let [e] = NaN;
let [f] = undefined;
let [g] = {}; 

```

#### 5. 默认值

解构赋值允许指定默认值

例：

```js
{
    let [a = true] = [];
    console.log(a); // true
}

{
    let [a, b = 1] = [2];
    console.log(a, b);  // 2 1
}

{
    let [a, b = 1] = [2, undefined];
    console.log(a, b);  // 2 1
}
```

**注：**在ES6内部使用严格相等运算符（===）来判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`,默认值是不会生效的。

```js
{
    let [a = 1] = [undefined];
    console.log(a); // 1
}

{
    let [a = 1] = [null];
    console.log(a); // null
}
```

上述代码中，如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`**undefined`。**

**默认值也可以是解构赋值的其他变量，但该变量必须已经声明。**

```js
{
    let [x = 1, y = x] = [];
    console.log(x, y); // 1 1
}

{
    let [x = 1, y = x] = [2];
    console.log(x, y); // 2 2
}

{
    let [x = 1, y = x] = [1, 2];
    console.log(x, y); // 1 2
}

{
    let [x = y, y = 1] = [];
    console.log(x, y);  // 报错:引用错误
}
```

### 对象的解构赋值

解构赋值不仅可以用于数组，还可以用于对象。但是这两者有个重要的不同

+ 数组的元素是按次序排列的，变量的取值是由它的位置决定的
+ 而对象的属性没有次序，变量必须与属性同名才能取到正确的值

例：

```js
{
    let {a, b} = {a: 1, b: 2};
    console.log(a, b);   // 1 2
}

{
    let {c} = {a: 1, b: 2};
    console.log(c); // undefined
}
```

实际上对象的解构赋值是下面形式的简写

```js
let {a: a, b: b} = {a: 1, b: 2};
```

也就是说，对象的解构赋值的内部机制是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者。如下列代表所示：

```js
let {a: b} = {a: 1, b: 2};
console.log(b);	// 1
console.log(a);	// a is not defined
```

由此可看出，a只是匹配模式，真正的变量是b。

对象的解构赋值中的嵌套结构和默认值都与数组的解构赋值使用方式相同

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
console.log(a, b, c, d, e); // h e l l o
```

类似数组的对象都有一个length属性，因此还可以对这个属性进行解构赋值。

```js
let {length: len} = 'hello';
console.log(len); // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
{
    let {toString: s} = 123;
    console.log(s === Number.prototype.toString);   // true
}
{
    let {toString: s} = true;
    console.log(s === Boolean.prototype.toString);  // true
}
```

解构赋值的规则是，只要等号的右边不是数组或者对象，就先将其转为对象。

### 解构赋值的用途

#### 1. 交换变量的值

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

#### 2. 从函数中返回多个值

函数只能返回一个值，如果要返回多个值，就需要写在数组或对象中。有了解构赋值，就很容易将这些值取出。

```js
// 返回一个数组
function example() {
    return [1, 2, 3];
}
// 获取数组中的值
let [a, b, c] = example();
```

```js
// 返回一个对象
function example1() {
    return {a: 1, b: 2, c: 3};
}
// 从对象中取出这些值
let {a, b, c} = example1();
```

#### 3. 提取JSON数据

```js
let jsonData = {
    id: 1,
    status: "ok",
    data: [316, 214],
};
let {id, status, data: number} = jsonData;
console.log(id, status, number); // 1 "ok" [316,214]
```

