/** @param {NS} ns **/
export async function main(ns) {
	let host = ns.args[0]
	// while (true) {
	// 	if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(host)) {
	// 		await ns.sleep(10000)
	// 		continue
	// 	}
	// 	if(!ns.hasRootAccess(host)){
	// 		await ns.sleep(10000)
	// 		continue
	// 	}
	// 	await ns.hack(host)
	// }
	if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(host)) {
		if (ns.hasRootAccess(host)) {
			await ns.hack(host)
		}
	}

}