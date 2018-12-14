/**
 *  字符串的扩展
 */
/**
 *  1.字符的Unicode表示法
 */
{
    console.log('a', '\u0061');         // a a
    console.log('b', '\u20BB7');        // b ₻7
    // ES6解决方法
    console.log('b', `\u{20BB7}`);       // b 𠮷
}

// ES5中的方法
{
    let s = '𠮷';    //'\u{20BB7}'

    console.log('length', s.length);    // 2
    console.log(s.charAt(0));           // �
    console.log(s.charAt(1));           // �
    console.log(s.charCodeAt(0));       // 55362
    console.log(s.charCodeAt(1));       // 57271
}

/**
 * 2. ES6中的codePointAt()
 */
{
    let s = '𠮷a';
    console.log(s.codePointAt(0));  // 134071
    console.log(s.codePointAt(1));  // 57271
    console.log(s.codePointAt(2));  // 97
}

// 转换为16进制
{
    let s = '𠮷a';
    console.log(s.codePointAt(0).toString(16));  // 20bb7
    console.log(s.codePointAt(1).toString(16));  // dfb7
    console.log(s.codePointAt(2).toString(16));  // 61
}

// 用途：测试一个字符到底是两个字节还是4个字节组成的
{
    function is32Bit(c) {
        return c.codePointAt(0) > 0xFFFF;
    }

    console.log(is32Bit('𠮷')); // true
    console.log(is32Bit('a')); // false
}

/**
 * 3. 字符串的遍历器接口
 */
{
    for (let codePoint of 'hello') {
        console.log(codePoint); // h e l l o
    }
}
// 识别大于0xFFFF的码点
{
    let s = '\u{20bb7}';
    for (let i of s) {
        console.log(i); // 𠮷
    }
}

/**
 * 4. includes(),startWith(),endsWith
 */
{
    let str = 'hello world';

    console.log(str.includes('hello')); // true
    console.log(str.startsWith('h'));               // true
    console.log(str.endsWith('hello'));             // false
}

/**
 * 5. repeat()
 */
{
    console.log('x'.repeat(3));     // xxx
    console.log('hello'.repeat(2)); // hellohello
    console.log('hello'.repeat(0)); // ''

    // 如果是小数，会被取整
    console.log('hello'.repeat(2.9));   // hellohello

    // 如果参数是负数或者Infinity，会报错
    // console.log('hello'.repeat(-1));    // RangeError: Invalid count value
    // console.log('hello'.repeat(Infinity)); // RangeError: Invalid count value

    // 如果参数是0~-1之间的小数，则等同于0。
    console.log('hello'.repeat(-0.9));  // ''

    // 参数是NaN，等同于0
    console.log('hello'.repeat(NaN));   // ''

    // 参数是字符串，先转换为数字
    console.log('hello'.repeat('3'));   // hellohellohello
    console.log('hello'.repeat('he'));  // ''
}

/**
 * 6. padStart(),padEnd()
 */
{
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
}

/**
 * 7. 模板字符串
 */
{
    // 普通字符串
    console.log(`In JavaScript '\n' is a line feed.`);  // In JavaScript '
                                                        // ' is a line feed
    // 多行字符串
    console.log(`In JavaScript this is 
    not legal.`);

    // 字符串中嵌入变量
    let name = 'Bob', time = 'today';
    console.log(`Hello ${name}, how are you ${time}?`); // Hello Bob, how are you today?
}
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
