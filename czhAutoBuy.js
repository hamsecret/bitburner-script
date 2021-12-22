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
		var i = ns.getPurchasedServers().length;
		let noMore = true
		while (i < ns.getPurchasedServerLimit()) {
			if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
				var hostname = ns.purchaseServer("pserv-" + i, ram);
				ns.toast('买入pserv-' + i)
				noMore = false
				++i;
			}
		}
		if (!noMore) {
			ns.kill('czhHUD.js', 'home')
			ns.exec('czhHUD.js', 'home')
			if (ns.isRunning('czhCheckServers.js', 'home')) {
				await ns.sleep(30000)
			}
			ns.exec('czhCheckServers.js', 'home')
		}
		await ns.sleep(3000)
	}


}