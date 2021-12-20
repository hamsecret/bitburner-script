/** @param {NS} ns **/
export async function main(ns) {
	let buyList = ["BruteSSH.exe", "FTPCrack.exe", "FTPCrack.exe", "HTTPWorm.exe", "SQLInject.exe", "relaySMTP.exe"]
	while (true) {
		if (!ns.fileExists("BruteSSH.exe", "home")) {
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("FTPCrack.exe", "home")) {
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("HTTPWorm.exe", "home")) {
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("SQLInject.exe", "home")) {
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("relaySMTP.exe", "home")) {
			await ns.sleep(3000)
			continue
		}
		var ram = 8;
		var i = getPurchasedServers().length;
		while (i < getPurchasedServerLimit()) {
			if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
				var hostname = purchaseServer("pserv-" + i, ram);
				toast('买入pserv-' + i)
				++i;
			}
		}
		await ns.sleep(3000)
	}


}