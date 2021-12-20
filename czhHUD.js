/** @param {NS} ns **/
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

export async function main(ns) {
  const list = [];
  scan(ns, '', 'home', list);
  const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
  const hook0 = doc.getElementById('overview-extra-hook-0');
console.warn(hook0.parentNode)
hook0.parentNode.parentNode.setAttribute('style','height: 50vh!important;overflow-y:scroll;display: block;')
  const hook1 = doc.getElementById('overview-extra-hook-1');
  while (true) {
      try {
          const headers = []
          const values = [];
          // Add script income per second
          for (let ii = 0; ii < list.length; ii++) {
              headers.push(list[ii]);
              let a = (ns.getServerMoneyAvailable(list[ii]) / ns.getServerMaxMoney(list[ii]))
              let b = (ns.getServerSecurityLevel(list[ii]) / ns.getServerMinSecurityLevel(list[ii]))
              values.push(a.toFixed(2) + '-' + b.toFixed(2));
          }
          // Now drop it into the placeholder elements
          hook0.innerText = headers.join(" \n");
          hook1.innerText = values.join("\n");
      } catch (err) { // This might come in handy later
          ns.print("ERROR: Update Skipped: " + String(err));
      }
      await ns.sleep(5000);
  }
}