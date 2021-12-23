/** @param {NS} ns **/
// list 为targetserver
// list2 为可以供操控的server
async function scan(ns, parent, server, list = []) {

	const children = ns.scan(server);
	for (let child of children) {
			if (parent == child) {
					continue;
			}
			if (server == 'darkweb') {
					continue
			}
			if (server.indexOf('pserv') == 0) {
					continue
			}
			if (ns.getServerGrowth(server) == 0) {
					continue
			}
			if (ns.getServerMaxMoney(server) == 0) {
					continue
			}
			list.push(child);
			scan(ns, server, child, list);
	}
}
function addItem(name, value) {
	document.getElementById(name).innerHTML = value
}

function arrSort(ns, arr) {
	let res = []
	for (let server of arr) {
			res.push({ n: server, s: ns.getServerSecurityLevel(server) })
	}
	let a = []
	let r = res.sort(function (a, b) { return a.s - b.s })
	for (let server of r) {
			a.push(server.n)
	}
	return a
}

async function scanServers(ns) {
	let list = await scan(ns, '', 'home');
	return list;
}


function getWeakenTarget(ns) {
	let list = JSON.parse(localStorage.getItem('targetList') ? localStorage.getItem('targetList') : '[]')

	// list 是targetServer 
	// 对targetServer进行操作有限度排序，即按照操作所需时间排序，即按照目标服务器的securityLevel从小到大
	list = arrSort(ns, list)

	let servers = list

	let weakList = []
	for (let server of servers) {
			if (ns.hasRootAccess(server)) {
					// 对于每台服务器
					// 首先检查是否需要weak
					let weakenCount = Math.floor((ns.getServerSecurityLevel(server) - ns.getServerMinSecurityLevel(server)) / 0.05)
					for (let ii = 0; ii < weakenCount; ii++) {
							weakList.push(server)
					}

			}
	}
	localStorage.setItem('weakenList', JSON.stringify(weakList))
}

/** @param {NS} ns **/
export async function main(ns) {
	let running = false
	while (true) {
			let weakenList = JSON.parse(localStorage.getItem('weakenList') ? localStorage.getItem('weakenList') : '[]')
			if (weakenList.length == 0) {
					if (!running) {
							getWeakenTarget(ns);
							running = true
					}
					await ns.sleep(1000)
					continue
			}
			let servers = JSON.parse(localStorage.getItem('czhServers') ? localStorage.getItem('czhServers') : '[]')
			document.getElementById('runningServers').innerHTML = servers.length
			let ramCost = ns.getScriptRam('czhWeaken.js', 'home')
			for (let server of servers) {
					let threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ramCost)
					if (threads > 0) {
							for (let ii = 0; ii < threads; ii++) {
									if (weakenList.length > 0) {
											// weaken还有
											let tar = weakenList.shift()
											console.warn('weaken:' + tar)
											ns.exec('czhWeaken.js', server, 1, tar, new Date().getTime())
									}
									else {
											break
											// // 尝试hack
											// if (hackList.length > 0) {
											//     let tar = hackList[hackList.length - 1]
											//     if (ns.getServerMoneyAvailable(tar) > 0) {
											//         // 还有钱
											//         ns.exec('czhHack.js', server, 1, tar, new Date().getTime())
											//     } else {
											//         // 没有钱了
											//         hackList.pop()
											//     }
											// }
											// else {
											//     // hack没有了
											//     documen.getElementById('hackList').innerHTML = ''
											// }
									}
							}
					}
			}


			localStorage.setItem('weakenList', JSON.stringify(weakenList))
			document.getElementById('WTN').innerHTML = weakenList.length
			// // ns.toast('running Threads: ' + avg)
			// document.getElementById('SPEED').innerHTML = avg + '/min'
			// document.getElementById('GTN').innerHTML = GTN
			// document.getElementById('WTN').innerHTML = WTN
			// document.getElementById('hackList').innerHTML = JSON.stringify(hackList)
			// document.getElementById('weakenList').innerHTML = JSON.stringify(weakenList)
			await ns.sleep(1000)
	}
}