/**
 * 数值的扩展
 */

/**
 * 1. 二进制与八进制表示法
 */
{
  // 二进制 0b(或0B)
  console.log(0b111110111); // 503
  // 八进制 0o(或0O)
  console.log(0o767); // 503

  // 将使用0b和0x前缀的字符串数值转换为十进制数值，前面加Number
  console.log(Number('0b111')); // 7
  console.log(Number('0o10')); // 8
}

/**
 * 2. Number.isFinite() 和 Number.isNaN()
 */
{
  // Number.isFinite()
  console.log('isFinite');
  console.log(Number.isFinite(15)); // true
  console.log(Number.isFinite(0.8)); // true
  console.log(Number.isFinite(NaN)); // false
  console.log(Number.isFinite(Infinity)); // false
  console.log(Number.isFinite(-Infinity)); // false
  console.log(Number.isFinite('foo')); // false
  console.log(Number.isFinite('15')); // false
  console.log(Number.isFinite(true)); // false

  // Number.isNaN()
  console.log('isNaN');
  console.log(Number.isNaN(NaN)); //true
  console.log(15); // false
  console.log('15'); // false
  console.log(true); // false
  console.log(9 / NaN); // true
  console.log('true' / 0); // true
  console.log('true' / 'true'); // true
}

/**
 * 3. Number.parseInt() 和 Number.parseFloat()
 */
{
  // ES5的写法
  console.log(parseInt('12.34')); // 12
  console.log(parseFloat('123.45#')); // 123.45

  // ES6的写法
  console.log(Number.parseInt('12.34')); // 12
  console.log(Number.parseFloat('123.453')); // 123.453
}

/**
 * 4. Number.isInteger()
 */
{
  console.log(Number.isInteger(25)); //true
  console.log(Number.isInteger(25.0)); // true
  console.log(Number.isInteger(25.1)); // false
  console.log(Number.isInteger('15')); // false
  console.log(Number.isInteger(true)); // false
}

/**
 * 5. Number.EPSILON
 */
{
  console.log(Number.EPSILON); // 2.220446049250313e-16
  // 限制20位
  console.log(Number.EPSILON.toFixed(20)); // 0.00000000000000022204

  // 为浮点数运算误差检查
  function withInErrorMargin(left, right) {
    return Math.abs(right - left) < Number.EPSILON;
  }

  console.log(withInErrorMargin(0.1 + 0.2, 0.3)); // true
  console.log(withInErrorMargin(0.2 + 0.2, 0.3)); // false
}

/**
 * 6. 安全整数和Number.isSafeInteger()
 */
{
  // 安全整数
  console.log(Math.pow(2, 53)); //  9007199254740992
  console.log(9007199254740993); // 9007199254740992
  // ES6表示方法
  console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); //true
  console.log(Number.MAX_SAFE_INTEGER === 9007199254740991); // true
  console.log(Number.MAX_SAFE_INTEGER === -Number.MIN_SAFE_INTEGER); // true
  console.log(Number.MIN_SAFE_INTEGER === -9007199254740991); // true

  // Number.isSafeInteger()
  console.log('Number.isSafeInteger()');
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
}

/**
 * 7. Math对象的扩展
 */
{
  // 7.1 Math.trunc()
  console.log('Math.trunc()');
  console.log(Math.trunc(3.16)); // 3
  console.log(Math.trunc(3.61)); // 3
  console.log(Math.trunc(-3.61)); // -3
  console.log(Math.trunc(-3.16)); // -3

  console.log(Math.trunc('123.456')); //123

  console.log(Math.trunc(NaN)); //NaN
  console.log(Math.trunc('abc')); //NaN
  console.log(Math.trunc()); //NaN
}

{
  // 7.2 Math.sign()
  console.log('Math.sign()');
  console.log(Math.sign(3)); // +1
  console.log(Math.sign(-3)); // -1
  console.log(Math.sign(0)); // +0
  console.log(Math.sign(-0)); // -0
  console.log(Math.sign('3')); // 1
  console.log(Math.sign(NaN)); // NaN
  console.log(Math.sign()); // NaN
}

{
  // 7.3 Math.cbrt()
  console.log('Math.cbrt()');
  console.log(Math.cbrt(8)); // 2
  console.log(Math.cbrt(1)); // 1
  console.log(Math.cbrt(0)); // 0
  console.log(Math.cbrt(-1)); // -1

  console.log(Math.cbrt('8')); // 2
  console.log(Math.cbrt(NaN)); // NaN
  console.log(Math.cbrt()); // NaN
}

{
  // 7.6 Math.hypot()
  console.log('Math.hypot()');
  console.log(Math.hypot(-3)); // 3
  console.log(Math.hypot(3, 4)); // 5
  console.log(Math.hypot(2, 3)); // 3.6055512754639896
  console.log(Math.hypot()); // 0
  console.log(Math.hypot('3', '4')); // 5
}

{
  //7.7 指数运算符
  console.log(2 ** 2); // 4
  console.log(2 ** 3); // 8

  let a = 2;
  console.log(a **= 2); // 4  相当于 a = a * a
  let b = 2;
  console.log(b **= 3); // 8 相当于 b = b * b * b
}