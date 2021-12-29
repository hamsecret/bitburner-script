/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    let allServers = JSON.parse(localStorage.getItem('allServers'))
    let maxLevel = 0
    let target = ''
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
    await ns.sleep(100000)
  }
}