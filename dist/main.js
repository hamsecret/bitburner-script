/** @param {NS} ns **/
export async function main(ns) {
  // 下载代码
  let urlPre = 'http://localhost:9999/dist/'
  localStorage.setItem('urlPre', urlPre)
  let allServers = ['home', 'n00dles', 'CSEC', 'neo-net', 'the-hub', 'crush-fitness', 'catalyst', 'silver-helix', 'netlink', 'syscore', 'lexo-corp', 'rho-construction', 'aerocorp', 'deltaone', 'icarus', 'infocomm', 'titan-labs', 'taiyang-digital', 'applied-energetics', 'univ-energy', 'solaris', 'zb-def', 'microdyne', 'fulcrumtech', '4sigma', 'powerhouse-fitness', 'ecorp', '.', 'nwo', 'fulcrumassets', 'helios', 'kuai-gong', 'b-and-a', 'clarkinc', 'vitalife', 'run4theh111z', 'stormtech', 'omnitek', 'blade', 'megacorp', 'The-Cave', 'zeus-med', 'omega-net', 'comptek', 'foodnstuff', 'sigma-cosmetics', 'joesguns', 'zer0', 'nectar-net', 'phantasy', 'johnson-ortho', 'zb-institute', 'I.I.I.I', 'alpha-ent', 'global-pharm', 'unitalife', 'defcomm', 'nova-med', 'millenium-fitness', 'snap-fitness', 'avmnite-02h', 'rothman-uni', 'summit-uni', 'aevum-police', 'galactic-cyber', 'omnia', 'max-hardware', 'hong-fang-tea', 'harakiri-sushi', 'iron-gym']
  localStorage.setItem('allServers', JSON.stringify(allServers))
  let fileList = ['main.js', 'p1hack.js', 'ramUpgrade.js']
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


  let home = ns.getServer('home')
  ns.tprint('系统内存：' + home.maxRam)
  if (home.maxRam == 8) {
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
    // 分发代码
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