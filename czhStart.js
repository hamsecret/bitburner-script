function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);

        scan(ns, server, child, list);
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

/** @param {NS} ns **/
async function openedServers(ns) {
    const servers = list_servers(ns);
    // for (const server of servers) {
    //     const used = ns.getServerUsedRam(server);
    //     const max = ns.getServerMaxRam(server);
    //     ns.tprint(`${server} is opened. ${used} GB / ${max} GB (${(100 * used / max).toFixed(2)}%)`)
    // }
    return servers
}

async function deployAll(ns) {
    const servers = await openedServers(ns)
    ns.tprint(servers)
    console.warn(servers)
    // basicHack(ns)
    const fileList = await getFileList(ns)
    ns.tprint(servers.length + ' servers ' + fileList.length + ' files')
    for (let host of servers) {
        for (let script of fileList) {
            ns.tprint(script + '->' + host)
            ns.killall(host)
            ns.rm(script, host)
            while (true) {
                let maxRam = ns.getServerMaxRam('home')
                let usedRam = ns.getServerUsedRam('home')
                let scriptRam = ns.getScriptRam('czhSendScript.ns', 'home')
                if (maxRam - usedRam > scriptRam) {
                    // console.warn(maxRam, usedRam, scriptRam)
                    break
                }
                // console.warn('wait 500ms')
                await ns.sleep(500)
            }
            ns.exec('czhSendScript.ns', 'home', 1, script, host)
        }
        while (true) {
            let fl = ns.ls(host);
            console.warn(fl)
            let ok = true
            for (let f of fileList) {
                if (fl.indexOf(f) == -1) {
                    ok = false
                    break
                }
            }
            if (ok) {
                break
            }
            else {
                await ns.sleep(500)
            }
        }

        // 运行一次所有hack
        //         AutoLink.exe   BruteSSH.exe   DeepscanV2.exe FTPCrack.exe   HTTPWorm.exe   

        // NUKE.exe       SQLInject.exe  relaySMTP.exe 
        if (ns.fileExists("BruteSSH.exe", "home")) {
            ns.brutessh(host)
        }
        if (ns.fileExists("FTPCrack.exe", "home")) {
            ns.ftpcrack(host)
        }
        if (ns.fileExists("HTTPWorm.exe", "home")) {
            ns.httpworm(host)
        }
        if (ns.fileExists("SQLInject.exe", "home")) {
            ns.sqlinject(host)
        }
        if (ns.fileExists("relaySMTP.exe", "home")) {
            ns.relaysmtp(host)
        }


        ns.nuke(host)
        const script_args = ''
        const script = 'czhAutoRun.js'
        const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(script));
        if (threads > 0) {
            ns.tprint(`Launching script '${script}' on server '${host}' with ${threads} threads and the following arguments: ${script_args}`);
            console.warn(host, script, threads, ns.exec(script, host, threads, host));
        } else {
            ns.tprint(host + '-no ram')
        }
    }
    return
}

async function getFileList(ns) {
    let fileList = ['czhAutoRun.js', 'czhSendScript.ns']
    return fileList
}

export async function main(ns) {
    ns.exec('czhDeployMyServer.js', 'home')
    ns.exec('czhStartFindingContract.js','home')
    ns.exec('czhHUD.js','home')
    await deployAll(ns)
}