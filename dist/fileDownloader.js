/** @param {NS} ns **/
export async function main(ns) {
  let urlPre = 'http://localhost:9999/dist/'
  let fileList = ['main.js']
  for (let file of fileList) {
    if (ns.fileExists(file, 'home')) {
      await ns.rm(file, 'home')
    }
    await ns.wget(urlPre + file, file, 'home')
  }
}