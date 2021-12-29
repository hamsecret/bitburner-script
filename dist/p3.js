/** @param {NS} ns **/
export async function main(ns) {
  // 第二阶段任务
  while (true) {
    let host = localStorage.getItem('P2hackTarget')
    let currentMode = localStorage.getItem('P2Mode')
    localStorage.setItem('target', host)
    let runningServers = JSON.parse(localStorage.getItem('runningServers'))
    try {
      if (ns.getServerMoneyAvailable(host) < ns.getServerMaxMoney(host)) {
        // grow
        for (let server of runningServers) {
          if (server != 'n00dles') {
            if (!ns.isRunning('grow.js', server)) {
              await ns.killall(server)
              ns.exec('grow.js', server, Math.floor((ns.getServerMaxRam(server) / ns.getScriptRam('grow.js', 'home'))))
            }
          }
        }
      } else {
        if (ns.getServerSecurityLevel(host) > ns.getServerMinSecurityLevel(host)) {
          // weak
          for (let server of runningServers) {
            if (server != 'n00dles') {
              if (!ns.isRunning('weaken.js', server)) {
                await ns.killall(server)
                ns.exec('weaken.js', server, Math.floor((ns.getServerMaxRam(server) / ns.getScriptRam('weaken.js', 'home'))))
              }
            }
          }
        } else {
          // hack
          for (let server of runningServers) {
            if (server != 'n00dles') {
              if (!ns.isRunning('hack.js', server)) {
                await ns.killall(server)
                ns.exec('hack.js', server, Math.floor((ns.getServerMaxRam(server) / ns.getScriptRam('hack.js', 'home'))))
              }
            }
          }
        }
      }
    } catch (e) {
      ns.tprint(e.toString())
    }
    await ns.sleep(2000)
  }
}