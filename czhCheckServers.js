async function scan(ns, parent, server, list) {
	let fileList = ['czhAutoRun.js', 'czhSendScript.ns', 'czhNuke.js', 'czhWeaken.js', 'czhGrow.js']
	const children = ns.scan(server);
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
			continue
		} else {
			ns.nuke(host)
		}
		// 自动同步文件
		for (let script of fileList) {
			// ns.tprint(script + '->' + host)
			// ns.killall(host)
			ns.rm(script, host)
			while (true) {
				let maxRam = ns.getServerMaxRam('home')
				let usedRam = ns.getServerUsedRam('home')
				let scriptRam = ns.getScriptRam('czhSendScript.ns', 'home')
				if (maxRam - usedRam > scriptRam) {
					break
				}
				await ns.sleep(500)
			}
			ns.exec('czhSendScript.ns', 'home', 1, script, host)
		}
		list.push(child);
		scan(ns, server, child, list);
	}
}
async function list_servers(ns) {
	const list = [];
	await scan(ns, '', 'home', list);
	return list;
}

/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		let servers = await list_servers(ns)

		await ns.sleep(30000)
	}
}