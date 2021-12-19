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
var contract = ''
export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

async function findContract(ns) {
    let servers = list_servers(ns);
    const boughtServers = ns.getPurchasedServers(ns);
    servers = servers.filter(s => !boughtServers.includes(s));
    const hostname = servers.find(s => ns.ls(s).find(f => f.endsWith(".cct")))
    if (!hostname) {
        ns.tprint("No coding contract found.");
        return;
    }

    ns.tprint(`Found coding contract on '${hostname}'.`)
    return hostname
}

function recursiveScan(ns, parent, server, target, route) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        if (child == target) {
            route.unshift(child);
            route.unshift(server);
            return true;
        }

        if (recursiveScan(ns, server, child, target, route)) {
            route.unshift(server);
            return true;
        }
    }
    return false;
}

export async function findServer(ns, server) {
    const args = ns.flags([["help", false]]);
    let route = [];
    if (!server || args.help) {
        ns.tprint("This script helps you find a server on the network and shows you the path to get to it.");
        ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }

    recursiveScan(ns, '', 'home', server, route);
    ns.tprint(route)
    // await goThere(ns, route)
}

async function goThere(ns, route) {
    let target = route.pop()
    let filelist = ns.ls(target)
    ns.tprint(filelist)
    for (let f of filelist) {
        if (f.endsWith('.cct')) {
            ns.tprint(f)
            ns.exec(f, target, 1)
            break
        }
    }
}

export function autocomplete(data, args) {
    return data.servers;
}

export async function main(ns) {
    var contractLocation = await findContract(ns)
    let target = contractLocation
    ns.tprint(target)
    await findServer(ns, target)
}