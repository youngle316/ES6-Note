/** 
 * 对象的扩展
 * /
/**
 * 1. 属性的简介表示法
 */
{
  // ES6允许直接写入变量和函数直接作为对象的属性和方法。
  // 属性
  var foo = 'bar';
  var baz = {
    foo
  };
  console.log(baz); // {foo:'bar'}

  // 方法
  var f = {
    method() {
      return "Hello";
    }
  }
  console.log(f.method()); // Hello

  // 用于函数的返回值
  function getPoint() {
    var x = 1;
    var y = 10;
    return {
      x,
      y
    };
  }
  console.log(getPoint()); // {x: 1, y: 10}

  /**
  // CommonJS模块输出模块代码
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
  */
}

/** 
 * 2. 属性名表达式
 */
// JavaScript定义对象属性的方式有两种
{
  /**
  // 方法一
  obj.foo = true;

  // 方法二
  obj['a' + 'bc'] = '123';

  // 定义属性名

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

  // 定义方法名
  let obj = {
    ['a' + 'bc']() {
      return 'Hello';
    }
  }
   */

  // 如果属性名表达式是一个对象的话，默认情况下会自动将对象转换为字符串。
  const keyA = {
    a: 1
  };
  const keyB = {
    b: 2
  };

  const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB',
  };
  console.log(myObject); // {[object Object]: "valueB"} 
}

/** 
 * 3. 对象的扩展运算符
 */
{
  let {x, y, ...z} = {x:1, y:2, a:3, b:4};
  console.log(x, y, z); // 1 2 {a:3, b:4}
}

/** 
 * 4. Object新增的方法 
 */
{
  /* Object.is() */

  console.log(Object.is('foo', 'foo')); // true
  console.log(Object.is({}, {})); // false

  // +0和-0的问题
  console.log(+0 === -0); // true
  console.log(Object.is(+0, -0)); // false

  // NaN等于自己本身
  console.log(NaN === NaN); // false
  console.log(Object.is(NaN,NaN)); // true
}
{
  /* Object.assign() */

  var target = {a: 1};
  var source1 = {b: 2};
  var source2 = {c: 3};
  Object.assign(target, source1, source2);
  console.log(target); // {a: 1, b: 2, c: 3}

  // 有多个同名属性
  var target = {a: 1, b: 2};
  var source1 = {b: 3, c: 4};
  var source2 = {c: 5};
  Object.assign(target, source1, source2);
  console.log(target); // {a: 1, b: 3, c: 5}
}
{
  /* Object.setPrototypeOf() */

  // 格式
  // Object.setPrototypeOf(object, prototype);

  // 用法
  var o = Object.setPrototypeOf({}, null);
  // 等同于
  var o = function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }

  //例子
  let proto = {};
  let obj = {x: 10};
  Object.setPrototypeOf(obj, proto);
  proto.y = 20;
  proto.z = 40;

  console.log(obj.x); // 10
  console.log(obj.y); // 20
  console.log(obj.z); // 40

  /* Object.getPrototypeOf() */

  /* Object.values() */
  var obj = {foo: 'bar', baz: 42};
  // console.log(Object.values(obj)); // ["bar", 42]
  console.log(Object.entries(obj)); // [["foo", "bar"], ["baz", 42]]
}