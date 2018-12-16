/**
 * 数值的扩展
 */

/**
 * 1. 二进制与八进制表示法
 */
{
    // 二进制 0b(或0B)
    console.log(0b111110111);   // 503
    // 八进制 0o(或0O)
    console.log(0o767); // 503

    // 将使用0b和0x前缀的字符串数值转换为十进制数值，前面加Number
    console.log(Number('0b111'));   // 7
    console.log(Number('0o10'));    // 8
}

/**
 * 2. Number.isFinite() 和 Number.isNaN()
 */
{
    // Number.isFinite()
    console.log('isFinite');
    console.log(Number.isFinite(15));   // true
    console.log(Number.isFinite(0.8));  // true
    console.log(Number.isFinite(NaN));   // false
    console.log(Number.isFinite(Infinity));    // false
    console.log(Number.isFinite(-Infinity));   // false
    console.log(Number.isFinite('foo'));   // false
    console.log(Number.isFinite('15'));   // false
    console.log(Number.isFinite(true));   // false

    // Number.isNaN()
    console.log('isNaN');
    console.log(Number.isNaN(NaN)); //true
    console.log(15);    // false
    console.log('15');  // false
    console.log(true);  // false
    console.log(9 / NaN);   // true
    console.log('true' / 0);    // true
    console.log('true' / 'true');   // true
}

/**
 * 3. Number.parseInt() 和 Number.parseFloat()
 */
{
    // ES5的写法
    console.log(parseInt('12.34'));     // 12
    console.log(parseFloat('123.45#')); // 123.45

    // ES6的写法
    console.log(Number.parseInt('12.34'));  // 12
    console.log(Number.parseFloat('123.453'));  // 123.453
}

/**
 * 4. Number.isInteger()
 */
{
    console.log(Number.isInteger(25));  //true
    console.log(Number.isInteger(25.0)); // true
    console.log(Number.isInteger(25.1)); // false
    console.log(Number.isInteger('15')); // false
    console.log(Number.isInteger(true)); // false
}

/**
 * 5. Number.EPSILON
 */
{
    console.log(Number.EPSILON);    // 2.220446049250313e-16
    // 限制20位
    console.log()
}
