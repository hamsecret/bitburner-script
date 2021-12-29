/** @param {NS} ns **/
export async function main(ns) {
  let urlPre = 'http://localhost:9999/dist/'
  // 系统启动
  if (ns.fileExists('main.js', 'home')) {
    await ns.rm('main.js', 'home')
  }
  await ns.wget('http://localhost:9999/dist/main.js', 'main.js', 'home')
  await ns.wget('http://localhost:9999/dist/thirdStart.js', 'thirdStart.js', 'n00dles')
  ns.nuke('n00dles')
  // 启动
  ns.exec('thirdStart.js','n00dles')
}