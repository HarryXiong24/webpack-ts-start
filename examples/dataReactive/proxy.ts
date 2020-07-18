export function proxy2(data: any) {
  // 模拟 Vue 实例
  return new Proxy(data, {
    // 执行代理行为的函数
    // 当访问 vm 的成员会执行
    get (target, key) {
      console.log("get, key: ", key, target[key]);
      return target[key];
    },
    // 当设置 vm 的成员会执行
    set (target, key, newValue) {
      console.log("set, key: ", key, newValue);
      if (target[key] === newValue) {
        return true
      }
      target[key] = newValue;
      document.querySelector("#app")!.textContent = target[key];
      return true
    },
  });
}
