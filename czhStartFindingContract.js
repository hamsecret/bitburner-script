/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		ns.exec('czhFindContract.js', 'home')
		await ns.sleep(20000)
	}
}