/**
 * 数组的解构赋值
 */
// 1. 完全解构
{
    let [a, b] = [1, 2];
    console.log(a, b); // 1 2
}

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
// 解构不成功
{
    let [a] = [];
    console.log(a); // undefined
    let [c, b] = [1];
    console.log(c, b); // 1 undefined
}

// 2. 不完全解构
{
    let [a, b] = [1, 2, 3];
    console.log(a, b);  // 1 2
    let [c, [d], e] = [4, [5, 6], 7];
    console.log(c, d, e);   // 4 5 7
}

// 3. 等号右边不是数组，将会报错
{
    // let [a, b] = null; // 报错
    // let [c] = {};
    // console.log(c);
}

// 4. 默认值
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

{
    let [a = 1] = [undefined];
    console.log(a); // 1
}

{
    let [a = 1] = [null];
    console.log(a); // null
}
//4.1 默认值也可以引用解构赋值的其他变量，但是变量必须已经声明
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

/**
 * 对象的解构赋值
 */
{
    let {a, b} = {a: 1, b: 2};
    console.log(a, b);   // 1 2
}

{
    let {c} = {a: 1, b: 2};
    console.log(c); // undefined
}

{
    let {a: b} = {a: 1, b: 2};
    console.log(b);
}

/**
 * 字符串的解构赋值
 */
{
    const [a, b, c, d, e] = 'hello';
    console.log(a, b, c, d, e); // h e l l o
}

{
    let {length: len} = 'hello';
    console.log(len); // 5
}

/**
 * 数值和布尔值的解构赋值
 */
{
    let {toString: s} = 123;
    console.log(s === Number.prototype.toString);   // true
}
{
    let {toString: s} = true;
    console.log(s === Boolean.prototype.toString);  // true
}

/**
 * 解构赋值的作用
 */
// 交换变量的值
{
    let a = 1;
    let b = 2;
    [a, b] = [b, a];
    console.log(a, b); // 2 1
}
//从函数中返回多个值
{
    // 返回一个数组
    function example() {
        return [1, 2, 3];
    }

    // 从数组中获取这些值
    let [a, b, c] = example();
}

{
    // 返回一个对象
    function example1() {
        return {a: 1, b: 2, c: 3};
    }

    // 从对象中取出这些值
    let {a, b, c} = example1();
}

// 提取JSON数据
let jsonData = {
    id: 1,
    status: "ok",
    data: [316, 214],
};
let {id, status, data: number} = jsonData;
console.log(id, status, number); // 1 "ok" [316,214]





