/** @param {NS} ns **/
export async function main(ns) {
  // 一些初始化设置
  localStorage.clear()

  // 下载代码
  let urlPre = 'http://localhost:9999/dist/'
  localStorage.setItem('urlPre', urlPre)
  let allServers = ['home', 'n00dles', 'CSEC', 'neo-net', 'the-hub', 'crush-fitness', 'catalyst', 'silver-helix', 'netlink', 'syscore', 'lexo-corp', 'rho-construction', 'aerocorp', 'deltaone', 'icarus', 'infocomm', 'titan-labs', 'taiyang-digital', 'applied-energetics', 'univ-energy', 'solaris', 'zb-def', 'microdyne', 'fulcrumtech', '4sigma', 'powerhouse-fitness', 'ecorp', '.', 'nwo', 'fulcrumassets', 'helios', 'kuai-gong', 'b-and-a', 'clarkinc', 'vitalife', 'run4theh111z', 'stormtech', 'omnitek', 'blade', 'megacorp', 'The-Cave', 'zeus-med', 'omega-net', 'comptek', 'foodnstuff', 'sigma-cosmetics', 'joesguns', 'zer0', 'nectar-net', 'phantasy', 'johnson-ortho', 'zb-institute', 'I.I.I.I', 'alpha-ent', 'global-pharm', 'unitalife', 'defcomm', 'nova-med', 'millenium-fitness', 'snap-fitness', 'avmnite-02h', 'rothman-uni', 'summit-uni', 'aevum-police', 'galactic-cyber', 'omnia', 'max-hardware', 'hong-fang-tea', 'harakiri-sushi', 'iron-gym']
  localStorage.setItem('allServers', JSON.stringify(allServers))
  let fileList = ['autobuyP3.js', 'p3.js', 'findContract.js', 'startFindingContract.js', 'selectTargetP2.js', 'grow.js', 'weaken.js', 'hack.js', 'p2.js', 'p2hack.js', 'autobuy.js', 'checkServers.js', 'main.js', 'p1hack.js', 'ramUpgrade.js', 'selectTarget.js']
  for (let server of allServers) {
    for (let file of fileList) {
      if (ns.fileExists(file, server)) {
        await ns.rm(file, server)
      }
      await ns.wget(urlPre + file, file, server)
    }
  }
  allServers.shift()
  // 主进程
  let stage = 0
  while (true) {
    let home = ns.getServer('home')
    // ns.tprint('系统内存：' + home.maxRam)
    if (home.maxRam == 8) {
      if (stage != 1) {
        stage = 1
        ns.tprint('开始第一阶段')
        // 第一阶段
        // 第一阶段极度贫穷，主要策略是选择一个最能黑的主机，全力去黑他，然后升级内存
        // 检查内存是否可以升级了
        ns.tprint('请注意内存升级提示，及时前往商店升级内存到16G')
        ns.exec('ramUpgrade.js', 'n00dles')
        let targets = ['n00dles', 'foodnstuff', 'sigma-cosmetics', 'joesguns', 'hong-fang-tea', 'harakiri-sushi']
        // 选择能黑的最高等级的主机，一般级别越高钱越多
        let hackTarget = ''
        for (let ii = targets.length; ii > 0; ii--) {
          let target = targets[ii - 1]
          if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) { }
          else {
            hackTarget = target
            localStorage.setItem('P1hackTarget', hackTarget)
            break
          }
        }
        // 分发任务
        for (let server of allServers) {
          let t = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam('p1hack.js', server))
          if (t > 0) {
            try {
              await ns.nuke(server)
              await ns.exec('p1hack.js', server, t)
            } catch (e) {
              console.warn(server + '->' + e.toString())
            }
          }
        }
      }
    }
    else if ((home.maxRam < 32) || (!ns.fileExists("BruteSSH.exe", "home")) || (!ns.fileExists("FTPCrack.exe", "home")) || (!ns.fileExists("relaySMTP.exe", "home")) || (!ns.fileExists("HTTPWorm.exe", "home")) || (!ns.fileExists("HTTPWorm.exe", "home"))) {
      if (stage != 2) {
        stage = 2
        ns.tprint('开始第二阶段')
        ns.tprint('您可以尝试完成Milestone中不要钱的任务，并加入组织，开始hacking contract。')
        ns.tprint('购买所有工具，且拥有32G内存之后进入下一阶段')

        // 第二阶段
        localStorage.setItem('P2hackTarget', 'n00dles')
        // 第二阶段的内存稍微宽松一些
        // 动态获取最高价值的目标
        ns.exec('selectTargetP2.js', 'home')
        // 动态获取更多服务器
        ns.exec('checkServers.js', 'home')
        // 动态购买内容
        ns.exec('autobuy.js', 'n00dles')
        // 分发任务
        ns.exec('p2.js', 'home')
      }
    } else {
      if (stage != 3) {
        stage = 3
        ns.tprint('开始第三阶段')
        ns.tprint('这一阶段的主要任务hacknet，购买插件，和升级home的内存')
        localStorage.setItem('stage', 3)
        // 动态获取最高价值的目标
        ns.exec('selectTarget.js', 'home')
        // 动态获取更多服务器
        ns.exec('checkServers.js', 'home')
        // 动态购买内容
        ns.exec('autobuyP3.js', 'home')
        // 分发任务
        ns.exec('p3.js', 'home')
      }
    }
    await ns.sleep(1000 * 60)
  }
}