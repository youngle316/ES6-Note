/** 
 * Set和Map数据结构 
 */

/** 
 * 1. Set 
 */
{
  const s = new Set();
  let arr = [2, 3, 5, 4, 1, 2, 5];
  arr.forEach(x => {
    s.add(x);
  });
  for (let i of s) {
    console.log(i); // 2 3 5 4 1
  }
} {
  const set = new Set([1, 2, 3, 4, 5, 5, '5']);
  console.log(...set); // 1, 2, 3, 4, 5, "5"

  const items = new Set([1, 2, 3, 4, 5, 5, 5]);
  console.log(items.size); // 5
} {
  // 数组去重
  let arr = [3, 5, 4, 4, 10, 3, 4, 2];
  arr = [...new Set(arr)];
  console.log(arr); // [3, 5, 4, 10, 2]
} {
  // Set的方法
  let s = new Set();
  // add
  s.add(1).add(2).add(2);
  console.log(...s); // 1 2
  // delete
  s.delete(1);
  console.log(...s); // 2
  // has
  console.log(s.has(1)); // false
  // clear
  s.clear();
  console.log(s); // Set(0){}
}
/** 
 * 2. Map 
 */
{
  // 2.1 Map实例的属性和方法

  // size属性
  const map = new Map();
  map.set('foo', true);
  map.set('bar', false);
  console.log(map.size); // 2 

  // set(key,value)
  const m = new Map();
  m.set('edition', 6);
  m.set(262, 'standard');
  m.set(undefined, 'undefined');
  console.log(m); // {"edition" => 6, 262 => "standard", undefined => "undefined"}

  // get(key)
  const myMap = new Map();
  const hello = function () {
    return 'hello'
  };
  myMap.set(hello, 'say,hello');
  console.log(myMap.get(hello)); // "say,hello"

  // has(key)
  const m1 = new Map();
  m1.set('abc', '132')
    .set(345,'hello')
    .set(undefined,'undefined');
  console.log(m1.has(345));// true
  console.log(m1.has('abc'));// true
  console.log(m1.has('345'));// false

  // delete
  const m2 = new Map();
  m2.set('abc', 123);
  console.log(m2.delete('abc'));// true

  // 对象转为Map
  function objToStrMap(obj) {
    let strMap = new Map();
    for(let k of Object.keys(obj)){
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  let map1 = objToStrMap({
    123: '123',
    '456': 456
  })
  console.log(map1);// {"123" => "123", "456" => 456}
}