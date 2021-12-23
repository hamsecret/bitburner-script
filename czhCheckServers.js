function initDOM() {
	const doc = document;
	var style = document.createElement("style");
	style.type = "text/css";
	style.appendChild(document.createTextNode(".MuiTableCell-root czh{display:block;text-align:center}"))
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(style);

	const hook0 = doc.getElementById('overview-extra-hook-0');
	const hook1 = doc.getElementById('overview-extra-hook-1');
	const hook2 = doc.getElementById('overview-extra-hook-2');
	hook0.innerHTML = ''
	hook1.innerHTML = ''
	hook2.innerHTML = ''
	let ele = document.createElement("czh");

	ele = document.createElement("czh");
	ele.innerHTML = 'Weaken'
	ele.id = 'WT'
	hook0.appendChild(ele);

	ele = document.createElement("czh");
	ele.innerHTML = ''
	ele.id = 'WTN'
	hook1.appendChild(ele);

	ele = document.createElement("czh");
	ele.innerHTML = '控制主机'
	hook0.appendChild(ele);

	ele = document.createElement("czh");
	ele.innerHTML = ''
	ele.id = 'runningServers'
	hook1.appendChild(ele);

}
async function scan(ns, parent, server, list) {
	let fileList = ['czhWeaken.js', 'czhGrow.js']
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
	while (true) {
		
		targetServer = []
		let servers = await list_servers(ns)
		localStorage.setItem('targetList',JSON.stringify(targetServer))
		localStorage.setItem('czhServers',JSON.stringify(servers))

		await ns.sleep(60000)
	}
}