/**
 * 函数的扩展
 */
/**
 * 1. 函数参数的默认值
 */
{
  // 1.1 基本用法

  // ES5设置默认值的方式
  {
    function log(x, y) {
      y = y || 'world';
      console.log(x, y);
    }

    // 这种写法有缺点
    log('hello', ''); // hello world
  }
  // ES6的写法
  {
    function test1(x, y = 'world') {
      console.log(x, y);
    }

    test1('hello'); // hello world
    test1('hello', 'China'); // hello China
    test1('hello', ''); // hello
  }
} {
  // 1.2 length属性
  let f1 = function (a) {};
  console.log(f1.length); //  1

  let f2 = function (a = 2) {};
  console.log(f2.length); //  0

  let f3 = function (a, b, c = 1) {};
  console.log(f3.length); //  2

  // 有默认值的参数不是尾参数
  let f4 = function (a, b = 2, c) {};
  console.log(f4.length); //  1
} {
  // 1.3 作用域
  {
    let x = 1;

    function f(x, y = x) {
      console.log(y);
    }

    f(2); // 2
  } {
    let x = 1;

    function f1(y = x) {
      let x = 2;
      console.log(y);
    }

    f1(); //  1
  }
}

/* 2. rest参数 */
{
  function add(...values) {
    let sum = 0;
    for (let val of values) {
      sum += val;
    }
    return sum;
  }

  console.log(add(2, 3, 6)); //  11
}

/* 3. 严格模式 */
{
  // ES5
  function doSomething(a, b) {
    'use strict';
    // ...
  }

  const doSomething1 = (function () {
    'use strict';
    return function (value = 16) {
      return value;
    }
  })
}

/* 4. name属性 */
{
  var n = function () {};

  // ES5
  console.log(n.name); // ''
  // ES6
  console.log(n.name); // 'n'
  // Function构造函数的实例对象
  console.log(new Function().name); // anonymous
}
/* 5. 箭头函数 */
{
  {
    let f = v => v;
    console.log(f(1)); // 1
  } {
    let f = function (v) {
      return v;
    };
    console.log(f(10)); // 10
  }
  // 箭头函数有多个参数或没有参数时，用圆括号表示参数部分
  {
    let f = () => 5;
    let sum = (n1, n2) => n1 + n2;
  }
  // 箭头函数的代码块多于一条语句,就需要使用大括号将其包裹起来，并使用return语句返回
  {
    let sum = (n1, n2) => {
      return n1 + n2
    };
  }
  // 箭头函数直接返回的是一个对象，必须在外面加上括号
  {
    var getTemplateItem = id => ({
      id: id,
      name: 'name'
    });
  }
  // 箭头函数可以与变量解构结合使用
  {
    const full = ({
      first,
      last
    }) => first + '' + last;
  }
  // 箭头函数使得表达更加简洁与清晰
  {
    const isEven = n => n % 2 === 0;
    console.log(isEven(2)); // true
  }
  // 箭头函数可以简化回调函数
  {
    // 正常的函数写法
    [1, 2, 3].map(function (x) {
      return x * x;
    });
    // ES6的写法
    [1, 2, 3].map(x => x * x);
  }
  // rest参数与箭头函数结合使用
  {
    const numbers = (...num) => num;
    console.log(numbers(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]

    const headAndTail = (head, ...tail) => [head, tail];
    console.log(headAndTail(1, 2, 3, 4, 5)); // [1, [2, 3, 4, 5]]
  }
  // this对象指向问题
  {
    // 箭头函数
    function foo() {
      setTimeout(() => {
        console.log({
          id: this.id
        });
      }, 100);
    }

    var id = 21;
    foo.call({
      id: 42
    });
  } {
    // 普通函数
    function f2() {
      setTimeout(function () {
        console.log({
          id1: this.id1
        });
      }, 100);
    }

    var id1 = 21;
    f2.call({
      id1: 42
    });
  }
}