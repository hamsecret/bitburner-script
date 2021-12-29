/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    let allServers = JSON.parse(localStorage.getItem('runningServers'))
    let maxLevel = 0
    let target = ''
    let oldTarget = localStorage.getItem('target')
    if (oldTarget) {
      console.warn(oldTarget, ns.getServerMoneyAvailable(oldTarget))
      if (ns.getServerMoneyAvailable(oldTarget) > 1000) {
        await ns.sleep(100000)
        continue
      }
    }
    for (let server of allServers) {
      let thisServerLevel = ns.getServerRequiredHackingLevel(server)
      if (thisServerLevel < ns.getHackingLevel()) {
        if (thisServerLevel > maxLevel) {
          maxLevel = thisServerLevel
          target = server
        }
      }
    }
    localStorage.setItem('P2hackTarget', target)
    await ns.sleep(10000)
  }
}