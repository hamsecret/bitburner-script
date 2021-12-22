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
    let servers = list_servers(ns)

    // 开启HUD HUD承载了数据存储的任务
    ns.exec('czhHUD.js', 'home')
    // 自动购买物件
    ns.exec('czhAutoBuy.js', 'home')
    // 自动同步所有服务器
    ns.exec('czhCheckServers.js', 'home')
    // 服务器任务控制
    ns.exec('czhDeployMyServer.js', 'home')
    // 自动找contract
    ns.exec('czhStartFindingContract.js', 'home')

    
    for (let server of servers) {
        if (server == 'darkweb') {
            continue
        }
        if (server.indexOf('pserv') == 0) {
            continue
        }
        ns.exec('czhHack.js', 'home', 2, server)
    }
}