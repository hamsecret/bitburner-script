async function basicHack(ns, hostname) {
    while (true) {
        if (ns.getServerSecurityLevel(hostname) > ns.getServerMinSecurityLevel(hostname)*2) {
            ns.tprint('weak : '+hostname)
            await ns.weaken(hostname);
        } else if (ns.getServerMoneyAvailable(hostname) < ns.getServerMaxMoney(hostname)/3) {
            ns.tprint('grow : '+hostname)
            await ns.grow(hostname);
        } else {
            ns.tprint('hack : '+hostname)
            await ns.hack(hostname);
        }
    }
}
export async function main(ns) {
    let hostname = ns.args[0]
    console.warn('czhAutoRun', hostname)
    await basicHack(ns, hostname)
}