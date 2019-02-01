# Promise对象

## 1. 含义

> Promise是异步编程的一种解决方案。比传统的解决方法（回调函数和事件）更合理且更强大。

### 1.1 传统的解决方案

```js
let ajax = function (callback) {
  console.log("执行");
  setTimeout(() => {
    callback&&callback.call();
  }, 1000);
}
ajax(function(){
  console.log("timeout1");
})
```

上面的代码会先输出`执行`，1秒后会输出`timeout1`。代码就是异步执行的，这也是在ES5中使用回调函数的作用，进行异步操作。但是如果需要执行的异步操作过于复杂，并且复杂的代码影响了后期的维护，很难看出异步操作的过程，那么这种使用回调函数的方式进行异步操作就不可取了。

所以在ES6中添加了一种解决方案，就是Promise。

### 1.2 什么是Promise

Promise就是一个对象，从它可以获取异步操作的消息。简单来说就是一个容器，里面保存着一个异步操作的结果。

Promise对象有两个特点

1. 对象的状态不受外界影响。Promise对象代表一个异步操作。有3种状态：Pending(进行中)、Fulfilled(已成功)、Rejected(已失败)。只有异步操作的结果才能决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变就不会再变，并且任何时候都可以得到这个结果。Promise对象状态的改变只有两种可能：从Pending变成Fulfilled，从Pending变成Rejected。只要这两种情况发生，状态就凝固了，就不会再发生改变而是一直保持这个结果，这时就称为Resolved(已定型)。就算改变已经发生，再对Promise对象添加回调函数，也可以得到这个结果。

### 1.3 基本用法

```js
let promise = new Promise(function(resolve, reject){
	// ... some code
  if(/* 异步操作成功 */){
  	resolve(value);  	   
	} else {
		reject(error);
  }
})
```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject，它们是两个函数，由JavaScript引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从Pending(进行中)变成Resolved(成功)，在异步操作成功时调用，并将异步操作的结果作为参数传递出去。

reject函数的作用是，将Promise对象的状态从Pending(进行中)变成Rejected(失败)，在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。

Promise实例生成后，可以通过then方法分别指定Resolved和Rejected状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
})
```

then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用；第二个回调函数是Promise对象的状态变为Rejected时调用。其中，第二个参数可以不选。两个函数都接受Promise对象传出的值作为参数。

### 1.4 使用Promise解决异步问题

那么上面的使用回调方法解决异步问题的方式就可以用Promise来解决了。

```js
let ajax = () => {
  console.log("执行2");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    },1000);
  })
};
ajax().then(()=>{
  console.log("promise","timeout2");
})
```

上面的代码会先输出`执行2`，一秒后再输出`promise timeout2`。结果和使用回调的方式是一样的。但是在代码上看上去就会更加的清晰，明了。

ajax方法返回一个Promise的实例，表示一段时间后才会发生的结果。过了指定的时间(1s)后，Promise实例的状态变成了Resolved，就会触发then方法绑定的回调函数。

### 1.5 Promise新建后会立即执行

```js
let promise = new Promise((resolve, reject) => {
  console.log("Promise");
  resolve();
});
promise.then(() => {console.log("Resolved")});
console.log("Hi!");

// Promise
// Hi!
// Resolved
```

上面的代码中，Promise新建后会立即执行，所以首先输出的是`Promise`。然后then方法指定的回调函数会在当前脚本的所有的同步任务执行完成后再执行，所以`Resolved`最后执行。

## 2. Promise.prototype.then()

Promise实例具有then方法，即then方法是定义在原型对象`Promise.prototype`上的。它的作用是为Promise实例添加状态改变时的回调函数。then的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

then方法返回的是一个新的Promise实例。因此可以采用链式写法，即then方法后面再跟一个then方法。

```js
let ajax = () => {
  console.log("执行3");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    },1000);
  })
};
ajax().then(()=>{
  console.log("promise","timeout3");
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve();
    },2000)
  })
}).then(() => {
  console.log("promise","timeout4")
})

// 执行3
// promise timeout3
// promise timeout4
```

## 3. Promise.prototype.catch()

`Promise.prototype.catch()`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

```js
let promise = (num) => {
  return new Promise((resolve, reject) => {
    if (num > 5){
      resolve();
    } else {
      throw new Error("出错了")
    }
  })
};

promise(6).then(() => {
  console.log("log",6);
}).catch((err) => {
  console.log("catch",err)
})

// log 6

promise(4).then(() => {
  console.log("log",4);
}).catch((err) => {
  console.log("catch",err)
})
// catch Error: 出错了
```

**注意点**：

1. 可以发现，`reject`方法的作用就等同于抛出错误。

2. 如果Promise状态已经变成Resolved，再抛出错误是无效的。因为Promise的状态一旦改变，就会永久保持该状态，不会再改变了。

3. Promise对象的错误具有“冒泡”性质，会一直向后传递，知道被捕获为止。也就是说，错误总会被下一个catch语句捕获。

4. 一般来说，不要在then方法中定义Rejected状态的回调函数（即then的第二个参数），而应总是使用catch方法。

   ```js
   // bad
   promise
     .then(function(data){
     // success
   }, function(err){
     // error
   })
   
   // good
   promise
     .then(function(data){
     // success
   })
     .catch(function(err){
     // error
   })
   ```

   上面的代码中，第二种方法要好于第一种，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步写法（try/catch）。

5. 和传统的（try/catch）代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。

## 4. Promise.all()

`Promise.all()`方法用于将多个Promise实例包装成一个新的Promise实例。

```js
let p = Promise.all([p1, p2, p3])
```

上面的代码中，`Promise.all()`方法接受一个数组作为参数，p1, p2, p3都是Promise的实例。如果参数不是Promise对象的实例，那么就会先调用`Promise.resolve`方法，将参数转为Promise实例。

**注：**`Promise.all()`的参数不一定必须是数组，但是必须具有Iterator接口，且返回的每个成员都是Promise实例。

p的状态由p1, p2, p3决定，分成两种情况。

1. 只有p1, p2, p3的状态都变成`Fulfilled`时，p的状态才会变成`Fulfilled`，此时p1, p2, p3的返回值组成一个数组，传递给p的回调函数。
2. 只要p1, p2, p3中有一个被`Rejected`，p的状态就变成`Rejected`，此时第一个被`Rejected`的实例的返回值会传递给p的回调函数。

```js
let loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = document.createElement("img");
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    }
  })
};

let showImages = (images) =>{
  images.forEach((img) => {
    document.body.appendChild(img);
  })
};

Promise.all([
  loadImage("https://s1.ax1x.com/2018/11/30/FmQiJU.png"),
  loadImage("https://s1.ax1x.com/2018/11/30/FmQiJU.png"),
  loadImage("https://s1.ax1x.com/2018/11/30/FmQiJU.png"),
]).then(showImages);
```

## 5. Promise.race()

`Promise.all()`方法用于将多个Promise实例包装成一个新的Promise实例。

```js
let p = Promise.race([p1, p2, p3])
```

不同于`Promise.all()`的是。在`Promise.race()`中只要有一个实例率先状态发生改变，p的状态就跟着改变。那个率先改变的Promise实例的返回值就传递给p的回调函数。

## 6. Promise.reslove()

这个方法将现有的对象转为Promise对象。

```js
Promise.resolve("foo");
// 等价于
new Promise(resolve = > resolve("foo"))
```

## 7. Promise.reject()

这个方法也会返回一个新的Promise实例，状态为Rejected。

```js
let p = Promise.reject("出错了");
// 等同于
let p = new Promise((resolve, reject) => {
  reject("出错了")
})
p.then(null, (s) => {
  console.log(s)
})
```

## 8. 附加方法

可以自己部署一些ES6没有提供的，但是很有用的方法。

### 8.1 done()

无论Promise对象的回调链以then还是以catch结尾的，只要最后一个方法抛出错误，都有可能无法捕获到（因为Promise的内部错误不会冒泡到全局）。因此，可以自己部署一个done方法，他总是处于回调链的尾端，保证抛出任何可能出现的错误。

代码实现

```js
Promise.prototype.done = (onFulfilled, onRejected) => {
  this.then(onFulfilled, onRejected)
    .catch(reason => {
    // 抛出一个全局错误
    setTimeout(() => {throw reason},0)
  })
};
```

### 8.2 finally()

用于指定不管Promise对象最后状态如何都会执行的操作。它与done()的最大区别就是，他接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

如，服务器使用Promise处理请求，然后使用finally方法关闭服务器。

```js
server.listen(0)
  .then(() => {
  // run test
})
.finally(server.stop)
```

代码实现

```js
Promise.prototype.finally = (callback) => {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {throw reason}),
  )
};
```

