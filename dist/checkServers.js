async function scan(ns, parent, server, list) {
	let fileList = ['czhWeaken.js', 'czhGrow.js', 'czhStockUp.js', 'czhStockDown.js']
	const children = await ns.scan(server);
	for (let child of children) {
		if (parent == child) {
			continue;
		}
		let host = child
		// 自动nuke
		let openPorts = 0
		if (ns.fileExists("BruteSSH.exe", "home")) {
			ns.brutessh(host)
			openPorts++
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			ns.ftpcrack(host)
			openPorts++
		}
		if (ns.fileExists("HTTPWorm.exe", "home")) {
			ns.httpworm(host)
			openPorts++
		}
		if (ns.fileExists("SQLInject.exe", "home")) {
			ns.sqlinject(host)
			openPorts++
		}
		if (ns.fileExists("relaySMTP.exe", "home")) {
			ns.relaysmtp(host)
			openPorts++
		}
		if (ns.getServerNumPortsRequired(host) > openPorts) {

		} else {
			ns.nuke(host)
		}


		if ((server != 'darkweb') && (server.indexOf('pserv') != 0) && (ns.getServerGrowth(server) > 0) && (ns.getServerMaxMoney(server) > 0)) {
			if (targetServer.includes(server)) { } else {
				targetServer.push(server)
			}
		}

		// 自动同步文件
		for (let script of fileList) {
			// ns.tprint(script + '->' + host)
			// ns.killall(host)
			ns.rm(script, host)
			if (ns.scriptRunning(script, host)) {
				continue
			}
			while (true) {
				let maxRam = ns.getServerMaxRam('home')
				let usedRam = ns.getServerUsedRam('home')
				let scriptRam = ns.getScriptRam('czhSendScript.script', 'home')
				if (maxRam - usedRam > scriptRam) {
					break
				}
				await ns.sleep(500)
			}
			ns.exec('czhSendScript.script', 'home', 1, script, host)
		}
		if (server == 'darkweb') {
			continue
		}
		if (ns.hasRootAccess(child)) {
			list.push(child);
		}
		await scan(ns, server, child, list);
	}
}
async function list_servers(ns) {
	const list = [];
	await scan(ns, '', 'home', list);
	return list;
}

/** @param {NS} ns **/
var targetServer = []
export async function main(ns) {
	initDOM()
	targetServer = []
	let servers = await list_servers(ns)
  // TODO save to localStorage
}