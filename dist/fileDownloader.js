/** @param {NS} ns **/
export async function main(ns) {
  let urlPre = 'http://localhost:9999/dist/'
  localStorage.setItem('urlPre', urlPre)
  let allServers = ['home', 'n00dles', 'CSEC', 'neo-net', 'the-hub', 'crush-fitness', 'catalyst', 'silver-helix', 'netlink', 'syscore', 'lexo-corp', 'rho-construction', 'aerocorp', 'deltaone', 'icarus', 'infocomm', 'titan-labs', 'taiyang-digital', 'applied-energetics', 'univ-energy', 'solaris', 'zb-def', 'microdyne', 'fulcrumtech', '4sigma', 'powerhouse-fitness', 'ecorp', '.', 'nwo', 'fulcrumassets', 'helios', 'kuai-gong', 'b-and-a', 'clarkinc', 'vitalife', 'run4theh111z', 'stormtech', 'omnitek', 'blade', 'megacorp', 'The-Cave', 'zeus-med', 'omega-net', 'comptek', 'foodnstuff', 'sigma-cosmetics', 'joesguns', 'zer0', 'nectar-net', 'phantasy', 'johnson-ortho', 'zb-institute', 'I.I.I.I', 'alpha-ent', 'global-pharm', 'unitalife', 'defcomm', 'nova-med', 'millenium-fitness', 'snap-fitness', 'avmnite-02h', 'rothman-uni', 'summit-uni', 'aevum-police', 'galactic-cyber', 'omnia', 'max-hardware', 'hong-fang-tea', 'harakiri-sushi', 'iron-gym']
  localStorage.setItem('allServers', JSON.stringify(allServers))
  let fileList = ['main.js', 'p1hack.js']
  for (let server of allServers) {
    for (let file of fileList) {
      if (ns.fileExists(file, server)) {
        await ns.rm(file, server)
      }
      await ns.wget(urlPre + file, file, server)
    }
  }
  ns.exec('main.js', 'home')
}