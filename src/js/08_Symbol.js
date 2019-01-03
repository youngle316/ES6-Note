/** 
 * ES6新增数据类型 Symbol 
 */

{
  // 1. 介绍
  let s = Symbol();
  console.log(typeof s); // symbol
  console.log(s); // 

  let s1 = Symbol('foo');
  let s2 = Symbol('bar');

  console.log(s1); // Symbol(foo)
  console.log(s2); // Symbol(bar)
  console.log(s1.toString()); // "Symbol(foo)"
  console.log(s2.toString()); // "Symbol(bar)"

  let sym = Symbol();
  console.log(Boolean(sym)); // true
  console.log(!sym); // false

  // console.log(sym + 2);// 报错 TypeError
  // console.log(Number(sym));// 报错 TypeError
} 
{
  // 2. Symbol值作为属性名时
  let mySymbol = Symbol();
  // 写法一
  let a = {};
  a[mySymbol] = 'hello';

  // 写法二
  let b = {
    [mySymbol]: 'hello',
  }

  // 错误写法
  let c = {};
  c.mySymbol = 'hello';
  console.log(typeof (c.mySymbol)); // string
}
{
  // 3. 属性名的遍历
  let a = Symbol('a');
  let b = Symbol('b');
  let obj = {};
  
  obj[a] = 'Hello';
  obj[b] = 'World';

  const objSymbols = Object.getOwnPropertySymbols(obj);
  console.log(objSymbols);// [Symbol(a), Symbol(b)]
}
{
  // 3. Symbol.for()
  let s1 = Symbol('hello');
  let s2 = Symbol('hello');
  console.log(s1 === s2);// false

  let s3 = Symbol.for('hello');
  let s4 = Symbol.for('hello');
  console.log(s3 === s4);// true
}
{
  // 4. Symbol.keyFor()
  let s1 = Symbol.for('hello');
  console.log(Symbol.keyFor(s1));// "hello"

  let s2 = Symbol('world');
  console.log(Symbol.keyFor(s2));// undefined
}