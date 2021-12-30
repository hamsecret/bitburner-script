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
   这一阶段是非常贫穷的，我认为首要任务是赚到第一桶金，去升级内存，以便使用更多的代码。所以这一阶段就是启动所有机器去hack当前能hack的最高级别的主机。这样很快就可以获得第一个M，可以去升级内存到16G。内存升级到16G就进入到下一阶段
2. 第二阶段
   内存到了16G，但是还是相对贫穷，这里主要要打基础，也就是购买破解工具，捕获更多的server，并榨干能榨干的钱。同时找到一台有32G内存的服务器（我命名为contractor），开始挂合同。这一阶段的目标是买足所有的工具，通过contract尽量赚一些钱。买完所有工具，且有32G内存就进入下一阶段
3. 第三阶段
   购买hacknet，购买插件，和升级home的内存。首先是购买hacknet，前期hacknet购买价格不高，升级费用也不高（完整升级大概在340m左右），但是每个完整hacknet的基础创收能力打到了10k，比直接hack来得高
4. 第四阶段
#### TODO
1. 更多的自动化执行上面的策略
2. 待我游戏深入，继续完善后面的策略，现在还是开荒发展阶段

## 刚入坑，欢迎交流
## 代码参考的基本上是官方实例代码，没有引用github上那些动不动全自动不知道干了什么的大后期脚本