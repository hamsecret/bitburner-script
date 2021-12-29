# Bitburner

#### 介绍
bitburner ns code

#### 使用方法
这里我使用了一个静态服务器作为代码仓库，用于向游戏传输代码，```node server.js```运行服务器，
同时，建议游戏期间一直开着这个服务器，可以节约一些游戏内存

1. 创建一个```nano start.js```
```
/** @param {NS} ns **/
export async function main(ns) {
  let urlPre = 'http://localhost:9999/dist/'
  // 系统启动
  if (ns.fileExists('main.js', 'home')) {
    await ns.rm('main.js', 'home')
  }
  await ns.wget('http://localhost:9999/dist/main.js', 'main.js', 'home')
  await ns.wget('http://localhost:9999/dist/thirdStart.js', 'thirdStart.js', 'n00dles')
  ns.nuke('n00dles')
  // 启动
  ns.exec('thirdStart.js','n00dles')
}
```
2. 运行```run start.js```

#### 各阶段任务解析
1. 第一阶段
   游戏刚开始，内存只有8G
   这一阶段是非常贫穷的，我认为首要任务是赚到第一桶金，去升级内存，以便使用更多的代码。所以这一阶段就是启动所有机器去hack当前能hack的最高级别的主机。这样很快就可以获得第一个M，可以去升级内存到16G。
2. 第二阶段
#### TODO
1. 更多的自动化执行上面的策略
2. 待我游戏深入，继续完善后面的策略，现在还是开荒发展阶段

## 刚入坑，欢迎交流
## 代码参考的基本上是官方实例代码，没有引用github上那些动不动全自动不知道干了什么的大后期脚本