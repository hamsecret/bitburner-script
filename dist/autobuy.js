/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		// BruteSSH.exe - $500.000k - Opens up SSH Ports.
		// FTPCrack.exe - $1.500m - Opens up FTP Ports.
		// relaySMTP.exe - $5.000m - Opens up SMTP Ports.
		// HTTPWorm.exe - $30.000m - Opens up HTTP Ports.
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
		await ns.sleep(3000)
	}
}