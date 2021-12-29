/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		let contractor=localStorage.getItem('contractor')
		ns.exec('findContract.js', contractor)
		await ns.sleep(20000)
	}
}