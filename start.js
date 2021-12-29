/** @param {NS} ns **/
export async function main(ns) {
  let urlPre = 'http://localhost:9999/dist/'
  // 系统启动，首先下载下载器
  if (ns.fileExists('fileDownLoader.js', 'home')) {
    await ns.rm('fileDownLoader.js', 'home')
  }
  await ns.wget('http://localhost:9999/dist/start.js', 'fileDownloader.js', 'home')
  // 启动下载器
  ns.exec('fileDownloader.js','home')
}