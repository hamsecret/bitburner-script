/** @param {NS} ns **/
export async function main(ns) {
  // 第一阶段的hack
  while(true){
    let host = localStorage.getItem('P1hackTarget')
    try{
      await ns.hack(host)
    }catch(e){
      ns.tprint(e.toString())
    }
  }
}