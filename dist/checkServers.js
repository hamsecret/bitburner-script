async function scan(ns, parent, server, list) {
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
	while(true){
		targetServer = []
		let servers = await list_servers(ns)
		localStorage.setItem('runningServers',JSON.stringify(servers))
		await ns.sleep(100000)
	}
}