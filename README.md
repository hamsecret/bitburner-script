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

#### 具体步骤
1. 开局首先运行czhStart.js，将会自动开始在最开始connect到的几台服务器薅羊毛
2. 同时时不时运行一下czhFindContract.js，这个文件将会找到contract，并将去这个contract的路径输出出来，一旦系统中有contract，就去完成，大把赚钱
3. 赚钱之后去电脑店（City中的alpha ent.中上部那个T）买tor router，然后就可以去darkweb买基础攻击工具了
4. 买了新的工具或者hack升级了之后，可以重复运行一下czhStart.js，攻入之前还不能满足条件的服务器

#### TODO
1. 更多的自动化执行上面的策略
2. 待我游戏深入，继续完善后面的策略，现在还是开荒发展阶段

## 刚入坑，欢迎交流
## 代码参考的基本上是官方实例代码，没有引用github上那些动不动全自动不知道干了什么的大后期脚本