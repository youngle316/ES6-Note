/**
 * 数组的扩展
 */

/**
 * 1. 扩展运算符
 */
// 1.1 含义
{
  console.log(...[1, 2, 3]); // 1 2 3
  console.log(1, ...[4, 5, 6], 7); // 1 4 5 6 7
} {
  function add(num1, num2) {
    return num1 + num2;
  }

  let numbers = [16, 3];
  console.log(add(...numbers)); // 19
} {
  console.log([...[], 2]); // [2]
}
// 1.2 替代数组的apply方法
{
  let arr3 = [3, 1, 6];
  // ES5的写法
  console.log(Math.max.apply(null, arr3)); // 6
  // ES6写法
  console.log(Math.max(...arr3)); // 6

  // 通过push函数将一个数组添加到另一个数组的尾部
  let arr1 = [1, 2, 3];
  let arr2 = [4, 5, 6];
  // ES5的写法
  Array.prototype.push.apply(arr1, arr2);
  console.log(arr1); //  [1,2,3,4,5,6]
  // ES6的写法
  arr1.push(...arr2);
  console.log(arr1); //  [1,2,3,4,5,6,4,5,6]
}
// 1.3 扩展运算符的应用
{
  //1.3.1 合并数组
  let arr1 = [1, 2, 3];
  let arr2 = [4, 5, 6];
  let arr3 = [7, 8, 9];

  // ES5合并数组方法
  console.log(arr1.concat(arr2, arr3)); // [1,2,3,4,5,6,7,8,9]
  // ES6合并数组方法
  console.log([...arr1, ...arr2, ...arr3]); // [1,2,3,4,5,6,7,8,9]
} {
  //1.3.2 与解构赋值结合
  const [first, ...last] = [1, 2, 3, 4, 5, 6];
  console.log(first); // 1,
  console.log(last); // [2, 3, 4, 5, 6]

  const [one, ...two] = [];
  console.log(one); // undefined
  console.log(two); // []

  const [a, ...b] = [3];
  console.log(a); // 3
  console.log(b); // []

  // 如果将扩展运算符用于数组赋值，则只能将其放在参数的最后一位，否则会报错。
  // const [...c, d] = [1, 2, 3, 4, 5];  // 报错
  // const [e, ...f, g] = [1, 2, 3, 4, 5];  // 报错
} {
  //1.3.4 字符串
  console.log([...'hello']); // ["h", "e", "l", "l", "o"]
}

/**
 * 2. Array.from()
 */
{
  // 2.1 类似数组的对象
  let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  };
  let arr1 = Array.from(arrayLike);
  console.log(arr1); // ["a", "b", "c"]

  // NodeList 对象
  let ps = document.querySelectorAll('p');
  Array.from(ps).forEach(function (p) {
    console.log(p);
  });

  // arguments 对象
  function foo() {
    var args = Array.from(arguments);
  }
} {
  // 2.2 Array.from()还可以接受第二个参数，类似于数组的map方法
  console.log(Array.from([1, 2, 3], (x) => x * x)); // [1, 4, 9]
}

/**
 * 3. Array.of()
 */
{
  console.log(Array.of(3, 1, 6)); // [3, 1, 6]
  console.log(Array.of(3)); // [3]
  console.log(Array.of(3).length); // 1

  // Array
  console.log(Array()); // []
  console.log(Array(3)); // [, , ,]
  console.log(Array(3, 1, 6)); // [3, 1, 6]

  // Array.of()的补充
  console.log(Array.of()); //  []
  console.log(Array.of(undefined)); // undefined
  console.log(Array.of(3, 1)); // [3, 1]
}

/**
 * 4. copyWithin()
 */
{
  // Array.prototype.copyWithin(target,start = 0,end = this.length);
  // 从3号位开始将后面的数，从0号位开始复制
  let arr1 = [1, 2, 3, 4, 5];
  arr1.copyWithin(0, 3);
  console.log(arr1); // [4, 5, 3, 4, 5]

  // 将3号位的数复制到0号位
  let arr2 = [1, 2, 3, 4, 5];
  arr2.copyWithin(0, 3, 4);
  console.log(arr2); // [4, 2, 3, 4, 5]

  // -3相当于2号位，-2相当于3号位
  let arr3 = [1, 2, 3, 4, 5];
  arr3.copyWithin(0, -3, -2);
  console.log(arr3); // [3, 2, 3, 4, 5]
}

/**
 * 5. find()和findIndex()
 */
{
  // find
  let arr1 = [1, 4, -5, 10];
  console.log(arr1.find((n) => n < 0)); // -5

  let n = arr1.find(function (value) {
    return value > 20;
  });
  console.log(n); // undefined
} {
  // findIndex()
  let arr1 = [1, 4, -5, 10];
  console.log(arr1.findIndex((n) => n < 0)); // 2

  let n = arr1.findIndex(function (value) {
    return value > 5;
  });
  console.log(n); // 3
}

/**
 * 6. fill()
 */
{
  console.log(['a', 'b', 'c'].fill(7)); // [7, 7, 7]
  // 多个参数
  console.log(['a', 'b', 'c'].fill('7', 1, 2)); // ["a", "7", "c"]
}

/**
 * 7. 数组实例的entries(),keys()和values()
 */
{
  // keys
  for (let index of ['a', 'b'].keys()) {
    console.log(index); // 0 1
  }
  // values
  for (let ele of ['a', 'b'].values()) {
    console.log(ele); // 'a' 'b'
  }
  // entries()
  for (let index of ['a', 'b'].entries()) {
    console.log(index); // [0, "a"]  [1, "b"]
  }
}

/**
 * 8. 数组实例的includes()
 */
{
  let arr1 = [1, 2, 3, NaN];
  console.log(arr1.includes(2)); // true
  console.log(arr1.includes(4)); // false
  console.log(arr1.includes(NaN)); // true
}