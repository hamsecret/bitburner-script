/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		if (localStorage.getItem('weakenList')) { } else { await ns.sleep(1000); continue }
		let hackList = JSON.parse(localStorage.getItem('weakenList'))
		let free = ns.getServerMaxRam('home') - ns.getServerUsedRam('home') - 30
		let r = ns.getScriptRam('czhHack.js')
		let ft = Math.floor(free / r)
		if (ft > 0) {
			let min = 0
			let max = hackList.length - 1
			let ii = Math.floor(Math.random() * (max - min + 1)) + min

			let tar = undefined
			let tarOne = 999999
			for (let server of hackList) {
				if (ns.getServerMoneyAvailable(server) < 10000) { continue }
				if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel()) { continue }
				let thisOne = ns.getServerSecurityLevel(server) / ns.getServerMinSecurityLevel(server)
				if (thisOne < tarOne) {
					tar = server
					tarOne = thisOne
				}
			}
			if (tar) {
				if (ns.getServerMoneyAvailable(tar) > 0) {
					// 还有钱
					let ttttt = new Date().getTime()
					ns.toast('hack : ' + tar + '-' + ns.getServerMoneyAvailable(tar))
					ns.exec('czhHack.js', 'home', ft, tar, ttttt)
				} else {
					// 没有钱了
					// hackList.pop()
					// document.getElementById('hackList').innerHTML=JSON.stringify(hackList)
				}
			}
		}
		await ns.sleep(1000)
	}

}