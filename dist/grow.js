/** @param {NS} ns **/
export async function main(ns) {
  while (true) {
    let host = localStorage.getItem('target')
    if (host) {
      await ns.grow(host,{stock:true})
    }
  }
}