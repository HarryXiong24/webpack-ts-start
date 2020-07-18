// import {proxy1} from './dataReactive/defineProperty';
import {proxy2} from './dataReactive/proxy';


// 模拟data
let data: any = {
  name: "harry",
  msg: "cool",
};

// let vm1 = {}
// proxy1(data, vm1)
// vm1.msg = "sa87ashjgd"
// console.log(vm1)

let vm2 = proxy2(data)
vm2.msg = "sa87ashjgd"
console.log(vm2)

