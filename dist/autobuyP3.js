/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		// BruteSSH.exe - $500.000k - Opens up SSH Ports.
		// FTPCrack.exe - $1.500m - Opens up FTP Ports.
		// relaySMTP.exe - $5.000m - Opens up SMTP Ports. 18台主机
		// HTTPWorm.exe - $30.000m - Opens up HTTP Ports. 20台主机
		// SQLInject.exe - $250.000m - Opens up SQL Ports.
		// ServerProfiler.exe - $500.000k - Displays detailed information about a server.
		// DeepscanV1.exe - $500.000k - Enables 'scan-analyze' with a depth up to 5.
		// DeepscanV2.exe - $25.000m - Enables 'scan-analyze' with a depth up to 10.
		// AutoLink.exe - $1.000m - Enables direct connect via 'scan-analyze'.
		// Formulas.exe - $5.000b - Unlock access to the formulas API.
		if (!ns.fileExists("BruteSSH.exe", "home")) {
			if (ns.getPlayer().money > 500000) {
				ns.toast('请购买BruteSSH.exe')
			}
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("FTPCrack.exe", "home")) {
			if (ns.getPlayer().money > 1500000) {
				ns.toast('请购买FTPCrack.exe')
			}
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("relaySMTP.exe", "home")) {
			if (ns.getPlayer().money > 5000000) {
				ns.toast('请购买relaySMTP.exe')
			}
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("HTTPWorm.exe", "home")) {
			if (ns.getPlayer().money > 30000000) {
				ns.toast('请购买HTTPWorm.exe')
			}
			await ns.sleep(3000)
			continue
		}
		if (!ns.fileExists("SQLInject.exe", "home")) {
			if (ns.getPlayer().money > 250000000) {
				ns.toast('请购买SQLInject.exe')
			}
			await ns.sleep(3000)
			continue
		}
		if (localStorage.getItem('stage') == 3) {
			// 第三阶段的购买
			// let isUpgrade = false
			// let nodeCount = ns.hacknet.numNodes()
			// for (let ii = 0; ii < nodeCount; ii++) {
			// 	try {
			// 		if (ns.hacknet.getNodeStats(ii).level < 200) {
			// 			// 升级等级
			// 			ns.hacknet.upgradeLevel(ii, 1)
			// 			isUpgrade = true
			// 		}
			// 		if (ns.hacknet.getNodeStats(ii).ram < 64) {
			// 			// 升级内存
			// 			ns.hacknet.upgradeRam(ii, 1)
			// 			isUpgrade = true
			// 		}
			// 		if (ns.hacknet.getNodeStats(ii).cores < 16) {
			// 			// 升级核心
			// 			ns.hacknet.upgradeCore(ii, 1)
			// 			isUpgrade = true
			// 		}

			// 	} catch (e) {

			// 	}
			// }
			// if (isUpgrade) {
			// 	await ns.sleep(500)
			// 	continue
			// }
      // else{
      //   try {
			// 		ns.hacknet.purchaseNode()
			// 	} catch (e) {

			// 	}
      // }
		}

		await ns.sleep(3000)
	}
}