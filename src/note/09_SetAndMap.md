# Set和Map数据结构

## 1. Set

### 1.1 基本用法

ES6提供了新的数据结构——Set。它类似于数组，但是成员的值都是唯一的。没有重复。

Set本身是一个构造函数，用来生成Set数据结构。

```js
const s = new Set();
let arr = [2, 3, 5, 4, 1, 2, 5];
arr.forEach(x => {
  s.add(x);
});
for (let i of s) {
  console.log(i);// 2 3 5 4 1
}
```

上面的代码表明Set结构不会添加重复的值。

Set函数可以添加一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化。

```js
const set = new Set([1, 2, 3, 4, 5, 5, '5']);
console.log(...set);// 1, 2, 3, 4, 5, "5"
const items = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(items.size);// 5
```

通过上面的代码可以看出，Set可以用来数组去重。

```js
let arr = [3, 5, 4, 4, 10, 3, 4, 2];
arr = [...new Set(arr)];
console.log(arr);// [3, 5, 4, 10, 2]
// 可以使用Array.from将Set结构转为数组
function dedupe(array) {
  return Array.from(new Set(array));
}
```

向Set中加入值时不会发生类型转换，所以5和'5'时不同的值。Set内部判断两个值是否相等采用的是叫做"Same-value equality"。`Object.is`就是部署这个算法的新方法。具体用法可以查看[对象的扩展](https://github.com/youngle316/ES6-Note/blob/master/src/note/07_object_extension.md)那一章节。

### 1.2 Set实例的属性和方法

Set结构的实例的属性

+ Set.prototype.constructor：构造函数，默认就是Set函数。
+ Set.prototype.size：返回Set实例的成员总数。

Set实例方法分为两大类：操作方法（用于操作数据）和遍历方法（用于便利成员）

+ add(value)：添加某个值，返回Set结构本身。
+ delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
+ has(value)：返回一个布尔值，表示参数是否是Set的成员。
+ clear()：清除所有成员，没有返回值。

```js
let s = new Set();
// add
s.add(1).add(2).add(2);
console.log(...s);// 1 2
// delete
s.delete(1);
console.log(...s);// 2
// has
console.log(s.has(1)); // false
// clear
s.clear();
console.log(s);// {}
```

### 1.3 遍历操作

Set结构的实例有4个遍历方法，可以用于遍历成员

+ keys()：返回键名的遍历器
+ values()：返回键值的遍历器
+ entries()：返回键值对的遍历器
+ foreach()：使用回调函数遍历每个成员

注：

+ 因为Set结构没有键名只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
+ Set的遍历顺序是插入顺序

## 2. weakSet

WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

+ WeakSet的成员只能是对象，而不能是其他类型的值。
+ WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用。

### 2.1 语法

WeakSet是一个构造函数，可以使用new命令创建WeakSet数据结构。

```js
const ws = new WeakSet();
```

WeakSet结构的方法

+ WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
+ WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。
+ WeakSet.prototype.has(value)：返回一个布尔值，表示某个WeakSet实例中。

注： 由于WeakSet没有size属性，所以不能进行遍历其成员。

## 3. Map

### 3.1 基本用法

ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以作为键。也就是说Object提供了一种“字符串—值”的对应，Map结构提供了“值—值”的对应。是一种更完善的Hash结构实现。

### 3.2 Map实例的属性和方法

Map结构的实例有以下属性和操作方法。

#### 3.2.1 size属性

返回Map结构的成员总数。

```js
const map = new Map();
map.set('foo', true);
map.set('bar', false);
console.log(map.size);// 2
```

#### 3.2.2 set(key,value)

set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值就会更新，否则会生成新的键值。

```js
const m = new Map();
m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'undefined');
console.log(m);// {"edition" => 6, 262 => "standard", undefined => "undefined"}
```

因为返回的是整个Map对象，所以可以使用链式写法。

#### 3.2.3 get(key)

get方法获取key对应的键值，如果找不到，则返回undefined。

```js
const myMap = new Map();
const hello = function () {return 'hello'};
myMap.set(hello, 'say,hello');
console.log(myMap.get(hello));// "say,hello"
```

#### 3.2.4 has(key)

has方法返回一个布尔值，表示Map中是否存在key这个键。

```js
const m1 = new Map();
m1.set('abc', '132')
  .set(345,'hello')
  .set(undefined,'undefined');
console.log(m1.has(345));// true
console.log(m1.has('abc'));// true
console.log(m1.has('345'));// false
```

#### 3.2.5 delete(key)

delete返回一个布尔值，返回true，表示删除某一个键；返回false，表示删除某一个键失败。

```js
const m2 = new Map();
m2.set('abc', 123);
console.log(m2.delete('abc'));// true
```

#### 3.2.6 clear()

clear方法清除所有成员，没有返回值。

### 3.3 遍历方法

Map原生提供了3个遍历器生成函数和一个遍历方法

+ keys()：返回键名的遍历器
+ values()：返回键值的遍历器
+ entries()：返回键值对的遍历器
+ foreach()：遍历Map的每个成员

注：

+ Map遍历顺序就是插入顺序

### 3.4 与其他结构的互相转换

#### 3.4.1 Map转为数组

使用扩展运算符（...）

#### 3.4.2 数组转为Map

将数组传入Map构造函数即可

#### 3.4.3 Map转为对象

如果Map的所所有键都是字符串，那么可以转为对象

#### 3.4.4 对象转为Map

```js
function objToStrMap(obj) {
  let strMap = new Map();
  for(let k of Object.keys(obj)){
    strMap.set(k, obj[k]);
  }
  return strMap;
}

let map1 = objToStrMap({
  123: '123',
  '456': 456
})
console.log(map1);// {"123" => "123", "456" => 456}
```

## 4 WeakMap

WeakMap和Map结构类似，也适用于生成键值对的集合。但是有两点不相同

+ WeakMap只接受对象作为键名。
+ WeakMap的键名所指向的对象不计入垃圾回收机制。