/** @param {NS} ns **/
function scan(ns, parent, server, list) {
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
      list.push(child);
      scan(ns, server, child, list);
  }
}
function addItem(name, value) {
  document.getElementById(name).innerHTML = value
}
function initDOM() {
  const doc = document;
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(".MuiTableCell-root czh{display:block;text-align:center}"))
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);

  const hook0 = doc.getElementById('overview-extra-hook-0');
  const hook1 = doc.getElementById('overview-extra-hook-1');
  const hook2 = doc.getElementById('overview-extra-hook-2');
  hook0.innerHTML = ''
  hook1.innerHTML = ''
  hook2.innerHTML = ''
  let ele = document.createElement("czh");
  // ele.innerHTML = '削弱目标'
  // hook0.appendChild(ele);
  ele = document.createElement("czh");
  ele.innerHTML = ''
  ele.id = 'WT'
  hook0.appendChild(ele);
  ele = document.createElement("czh");
  ele.innerHTML = ''
  ele.id = 'WTN'
  hook1.appendChild(ele);
  // ele = document.createElement("czh");
  // ele.innerHTML = '发育目标'
  // hook0.appendChild(ele);
  ele = document.createElement("czh");
  ele.innerHTML = ''
  ele.id = 'GT'
  hook0.appendChild(ele);
  ele = document.createElement("czh");
  ele.innerHTML = ''
  ele.id = 'GTN'
  hook1.appendChild(ele);
  ele = document.createElement("czh");
  ele.innerHTML = 'Speed'
  hook0.appendChild(ele);
  ele = document.createElement("czh");
  ele.innerHTML = ''
  ele.id = 'SPEED'
  hook1.appendChild(ele);
}
function getServersInfo(ns, servers) {
  let all = {}
  for (let server of servers) {
      let info = ns.getServer(server)
      all[server] = info
  }
  let ele = document.createElement('czhValue')
  ele.id = 'czhServers'
  ele.innerHTML = JSON.stringify(all)
  ele.setAttribute('style', 'display:none')
  document.getElementById('overview-extra-hook-2').appendChild(ele)
}
export async function main(ns) {
  const list = [];
  scan(ns, '', 'home', list);
  let servers = list.sort(function (s, t) {
      let a = s.toLowerCase();
      let b = t.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
  })
  initDOM()
  getServersInfo(ns, servers)
  let init = true
  let GTN = 9999999, GT = '', WTN = 0, WT = ''
  while (true) {
      if (document.getElementById('GTN') && document.getElementById('WTN')) {
          
      } else {
          await ns.sleep(3000)
      }
      try {
          if (!init) {
              WT = document.getElementById('WT').innerHTML
              GT = document.getElementById('GT').innerHTML
              WTN = parseInt(document.getElementById('WTN').innerHTML)
              GTN = parseInt(document.getElementById('GTN').innerHTML)
              if(!(WTN==0 && GTN==0)){
                  await ns.sleep(3000)
                  continue
              }
          }
          for (let server of servers) {
              if (server == 'darkweb') {
                  continue
              }
              if (server.indexOf('pserv') == 0) {
                  continue
              }
              // TODO growth=0 maxMoney=0 要去掉
              if (ns.hasRootAccess(server)) {
                  let thisMoney = ns.getServerMoneyAvailable(server) / ns.getServerMaxMoney(server)
                  let thisLevel = ns.getServerSecurityLevel(server) / ns.getServerMinSecurityLevel(server)
                  if ((thisMoney > 0) && (thisMoney < GTN)) {
                      if (init || (parseInt(document.getElementById('GTN').innerHTML) == 0)) {
                          GTN = thisMoney
                          GT = server
                          console.log('G')
                      }
                  }
                  if (thisLevel > WTN) {
                      if (init || (parseInt(document.getElementById('WTN').innerHTML) == 0)) {
                          WT = server
                          WTN = thisLevel
                          console.log('W')
                      }
                  }
              }
          }

          // 要计算要执行多少次grow和weaken 加入到port中
          // 每次削弱0.05
          // 每次发育server.serverGrowth

          console.warn('result', WT, GT)
          let missionCountW = Math.floor((ns.getServerSecurityLevel(WT) - ns.getServerMinSecurityLevel(WT)) / 0.05) + 1
          let missionCountG = Math.floor((ns.getServerMaxMoney(GT) - ns.getServerMoneyAvailable(GT)) / ns.getServerGrowth(GT)) + 1
          // Now drop it into the placeholder elements
          addItem('WTN', missionCountW)
          addItem('WT', WT)
          addItem('GTN', missionCountG)
          addItem('GT', GT)
          init = false
      } catch (err) { // This might come in handy later
          ns.print("ERROR: Update Skipped: " + String(err));
      }
      await ns.sleep(5000);
  }
}