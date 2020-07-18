export function proxy1(data: any, vm: any): void {
  Object.keys(data).forEach(function (key) {
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        // ts-lint-ignore
        console.log("get: ", key, data[key as any]);
        return data[key as any];
      },
      set: function (newValue) {
        console.log("set: ", key, newValue);
        if (newValue === data[key as any]) {
          return;
        }
        data[key as any] = newValue;
        // 数据更改，更新 DOM 的值
        document.querySelector("#app")!.textContent = data[key as any];
      },
    });
  });  
}
