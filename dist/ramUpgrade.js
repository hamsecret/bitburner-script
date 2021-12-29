/** @param {NS} ns **/
export async function main(ns) {
  // 检查内存是否需要升级
  if (ns.getServerMaxRam('home') == 8) {
    // 第一阶段的检查
    while (true) {
      if ((ns.getServerMaxRam('home') == 8)) {
        if (ns.getPlayer().money > 1.02*1000000) {
          // 前期内存紧缺，所以这里就只提醒了，不代为操作
          ns.toast('请前往升级内存到16G')
        }
        await ns.sleep(1000)
      } else {
        // 内存已经升级
        break
      }
    }
  }
}