async function basicHack(ns, hostname) {
    while (true) {
        if (ns.getServerSecurityLevel(hostname) > ns.getServerMinSecurityLevel(hostname)) {
            await ns.weaken(hostname);
        } else if (ns.getServerMoneyAvailable(hostname) < ns.getServerMaxMoney(hostname)) {
            await ns.grow(hostname);
        } else {
            await ns.hack(hostname);
        }
    }
}
export async function main(ns) {
    let hostname = ns.args[0]
    console.warn('czhAutoRun', hostname)
    await basicHack(ns, hostname)
}