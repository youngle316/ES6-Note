// 传统的解决方案,使用回调函数
{
  let ajax = function (callback) {
    console.log("执行");
    setTimeout(function () {
      callback && callback.call();
    }, 1000);
  };
  ajax(function () {
    console.log("timeout1");
  })
}

// ES6 Promise写法
{
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
}

// Promise新建后就会立即执行
{
  let promise = new Promise((resolve, reject) => {
    console.log("Promise");
    resolve();
  });
  promise.then(() => {console.log("Resolved")});
  console.log("Hi!");

  // Promise
  // Hi!
  // Resolved
}

// 多个异步操作
{
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
}

// catch
{
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
  });

  /*promise(4).then(() => {
    console.log("log",4);
  }).catch((err) => {
    console.log("catch",err)
  })*/
}

// Promise.all()
// 所有图片加载完再添加到页面
{
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
}

// Promise.race()
// 只要有一个图片加载完再添加到页面
{
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
    let p = document.createElement("p");
    p.appendChild(images);
    document.body.appendChild(p);
  };

  Promise.race([
    loadImage("https://s1.ax1x.com/2018/11/30/FmQiJU.png"),
    loadImage("https://s1.ax1x.com/2018/11/30/FmQiJU.png"),
    loadImage("https://s1.ax1x.com/2018/11/30/FmQiJU.png"),
  ]).then(showImages);
}

// done
Promise.prototype.done = (onFulfilled, onRejected) => {
  this.then(onFulfilled, onRejected)
    .catch(reason => {
      // 抛出一个全局错误
      setTimeout(() => {throw reason},0)
    })
};

// finally
Promise.prototype.finally = (callback) => {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {throw reason}),
  )
};