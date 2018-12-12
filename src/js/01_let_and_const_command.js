// "use strict";
function letTest() {
    /*
    一、let
    var a = 1;
    let b = 2;
    console.log(a); // 1
    console.log(b); // 2
    */

    /*
    二、let 块级作用域
    for (let i = 1; i < 3; i++) {
        console.log(i); // 1 2
    }
    console.log(i); // ReferenceError: i is not defined  引用错误
    */

    /*
    三、严格模式
    console.log(a);     // undefined
    var a = 10;

    console.log(b);     // ReferenceError: b is not defined
    let b = 10;
    */

    /*
    //四、不能重复声明
    let a = 1;
    let a = 2;      // Duplicate declaration "a"
    */

    /*
    let b = 1;
    {
        let b = 2;
    }
    */
}

// letTest();

function constTest() {
    /*
    一、const 声明的常量不能改变
    const  PI = 1;
    PI = 2;             // "PI" is read-only;
    console.log(PI);
    */

    /*
    二、声明常量时，必须赋值
    const PI;           // Unexpected token
    PI = 3.1415;
    console.log(PI);
    */

    const PI = 3.1415;
    const K = {
        a: 1,
    };
    K.b = 2;
    console.log(PI,K);
}

constTest();