function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);
        ns.killall(child)
        scan(ns, server, child, list);
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

export async function main(ns) {
    // 自动清空系统运行
    let servers = await list_servers(ns)

    // 自动hack
    ns.exec('czhKeepHack.js','home')
    // 自动购买物件
    ns.exec('czhAutoBuy.js', 'home')
    // 自动同步所有服务器
    ns.exec('czhCheckServers.js', 'home')
    // 服务器任务控制
    ns.exec('czhDeployMyServer.js', 'home')
    // 自动找contract
    ns.exec('czhStartFindingContract.js', 'home')
    // 自动hack
    ns.exec('czhKeepHack.js','home')

    // for (let server of servers) {
    //     if (server == 'darkweb') {
    //         continue
    //     }
    //     if (server.indexOf('pserv') == 0) {
    //         continue
    //     }
    //     ns.exec('czhHack.js', 'home', 2, server)
    // }
    // let free = ns.getServerMaxRam('home') - ns.getServerUsedRam('home') - 30
    // let ft = Math.floor(free / 1.75)
    // if (ft > 0) {
    //     let tar = hackList[hackList.length - 1]
    //     if (ns.getServerMoneyAvailable(tar) > 0) {
    //         // 还有钱
    //         ns.exec('czhHack.js', 'home', ft, tar, new Date().getTime())
    //     } else {
    //         // 没有钱了
    //         hackList.pop()
    //     }
    // }

}