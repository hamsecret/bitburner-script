/** @param {NS} ns **/
export async function main(ns) {
  // 第二阶段任务
  while (true) {
    let contractor=localStorage.getItem('contractor')
    if(contractor){
      if(!ns.isRunning('startFindingContract.js',contractor)){
        await ns.killall(contractor)
        ns.exec('startFindingContract.js',contractor)
      }
    }
    let host = localStorage.getItem('P2hackTarget')
    let currentMode = localStorage.getItem('P2Mode')
    localStorage.setItem('target', host)
    let runningServers = JSON.parse(localStorage.getItem('runningServers'))
    try {
      if (ns.getServerSecurityLevel(host) > ns.getServerMinSecurityLevel(host) * 1.5) {
        // weak
        for (let server of runningServers) {
          if ((server != 'n00dles') && (server!=contractor)) {
            if (!ns.isRunning('weaken.js', server)) {
              await ns.killall(server)
              let t = Math.floor((ns.getServerMaxRam(server) / ns.getScriptRam('weaken.js', 'home')))
              if (t > 0) {
                ns.exec('weaken.js', server,t)
              }
            }
          }
        }
      } else {
        // hack
        for (let server of runningServers) {
          if ((server != 'n00dles') && (server!=contractor)) {
            if (!ns.isRunning('hack.js', server)) {
              await ns.killall(server)
              let t = Math.floor((ns.getServerMaxRam(server) / ns.getScriptRam('hack.js', 'home')))
              if (t > 0) {
                ns.exec('hack.js', server, t)
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn(e.toString())
    }
    await ns.sleep(2000)
  }
}