/** @param {NS} ns **/
export async function main(ns) {
	let time = new Date().getTime()
	let totalcount = 0
	let avg = 0
	while (true) {
		if (document.getElementById('czhServers')) { }
		else { await ns.sleep(1000) }
		let WT = document.getElementById('WT').innerHTML
		let GT = document.getElementById('GT').innerHTML
		let WTN = parseInt(document.getElementById('WTN').innerHTML)
		let GTN = parseInt(document.getElementById('GTN').innerHTML)
		if (WT && GT) { } else { await ns.sleep(1000); continue }
		let data = JSON.parse(document.getElementById('czhServers').innerHTML)
		let servers = []
		Object.keys(data).forEach(function (key) {
			if (key == 'darkweb') { return }
			// if (key.indexOf('pser') == 0) { return }
			servers.push(key)
		});
		console.warn('ready to control ' + servers.length)
		for (let server of servers) {
			if (ns.hasRootAccess(server)) {
				let threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75)
				if (threads > 0) {
					if (WTN == 0) {
						if (GTN != 0) {
							ns.exec('czhGrow.js', server, threads, GT, new Date().getTime())
							GTN = ((GTN - threads) < 0) ? 0 : (GTN - threads)
							totalcount += threads
						}
					} else {
						ns.exec('czhWeaken.js', server, threads, WT, new Date().getTime())
						WTN = ((WTN - threads) < 0) ? 0 : (WTN - threads)
						totalcount += threads
					}
				}
			}
		}
		if ((new Date().getTime() - time) > (1000 * 60)) {
			time = new Date().getTime()
			avg = totalcount
			totalcount = 0
		}
		// ns.toast('running Threads: ' + avg)
		document.getElementById('SPEED').innerHTML = avg + '/min'
		document.getElementById('GTN').innerHTML = GTN
		document.getElementById('WTN').innerHTML = WTN
		await ns.sleep(1000)
	}
}