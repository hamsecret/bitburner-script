/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    let allServers = JSON.parse(localStorage.getItem('runningServers'))
    if (allServers) {
      let target = ''
      for (let server of allServers) {
        let thisServerLevel = ns.getServerRequiredHackingLevel(server)
        if (thisServerLevel < ns.getHackingLevel()) {
          if (ns.getServerMoneyAvailable(server) > 1000) {
            target = server
            break
          }
        }
      }
      if (target != '') {
        localStorage.setItem('target', target)
      }
    }
    await ns.sleep(10000)
  }
}