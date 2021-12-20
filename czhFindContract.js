var now
var p
var totalStep
var arr
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
        // ns.tprint("No coding contract found.");
        return;
    }

    // ns.tprint(`Found coding contract on '${hostname}'.`)
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

async function uniquePathsInAGridI(data) {
    let rr = data[0]
    let cc = data[1]
    arr = []
    for (let ii = 0; ii < rr; ii++) {
        let t = []
        for (let jj = 0; jj < cc; jj++) {
            t.push(0)
        }
        arr.push(t)
    }
    now = [0, 0]
    p = [[[0, 0]]]
    totalStep = arr.length + arr[0].length - 2
    let result = findWay()
    return result
}

async function uniquePathsInAGridII(data) {
    let rr = data[0]
    let cc = data[1]
    arr = data
    now = [0, 0]
    p = [[[0, 0]]]
    totalStep = arr.length + arr[0].length - 2
    let result = findWay()
    return result
}

function findWay() {
    let newP = []
    for (let ii = 0; ii < p.length; ii++) {
        let thisWay = p[ii]
        let tmpWay = []
        let currentPos = thisWay[thisWay.length - 1]
        if (currentPos[0] < (arr.length - 1)) {
            if (arr[currentPos[0] + 1][currentPos[1]] != 1) {
                tmpWay.push(thisWay.concat([[currentPos[0] + 1, currentPos[1]]]))
            }
        }
        if (currentPos[1] < (arr[0].length - 1)) {
            if (arr[currentPos[0]][currentPos[1] + 1] != 1) {
                tmpWay.push(thisWay.concat([[currentPos[0], currentPos[1] + 1]]))
            }
        }
        newP = newP.concat(tmpWay)
    }
    p = newP
    //   console.warn('answer:' + p.length)
    if (p[0].length != totalStep) {
        return findWay()
    } else {
        return p.length
    }
}
async function spiralizeMatrix(data) {
    let matrix = data
    if (!matrix.length || !matrix[0].length) {
        return [];
    }
    const rows = matrix.length, columns = matrix[0].length;
    const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
    const total = rows * columns;
    const order = new Array(total).fill(0);

    let directionIndex = 0, row = 0, column = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let i = 0; i < total; i++) {
        order[i] = matrix[row][column];
        visited[row][column] = true;
        const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
            directionIndex = (directionIndex + 1) % 4;
        }
        row += directions[directionIndex][0];
        column += directions[directionIndex][1];
    }


    let result = order
    let str = '['
    for (let ii = 0; ii < result.length; ii++) {
        str += result[ii] + ','
    }
    str = str.substring(0, str.length - 1)
    str += ']'
    return str
}
async function arrayJumpingGame(data) {
    return isEndarrayJumpingGame(data, 0) ? 1 : 0
}

function isEndarrayJumpingGame(data, nowPos) {
    let thisOne = data[nowPos]
    let ok = false
    for (let ii = 1; ii < thisOne + 1; ii++) {
        if (nowPos + ii == data.length - 1) {
            console.log(thisOne, 'go ' + (nowPos + ii), 'ok', nowPos)
            return true
        } else if (nowPos + ii > data.length - 1) {
            console.log(thisOne, 'go ' + (nowPos + ii), data.length, 'overflow', nowPos)
            continue
        } else {
            console.log(thisOne, 'go ' + (nowPos + ii), data.length, 'next', nowPos)
            ok = isEndarrayJumpingGame(data, nowPos + ii)
        }
    }
    return ok
}

async function generrateIpAddress(data) {
    const SEG_COUNT = 4;
    const segments = new Array(SEG_COUNT);
    const ans = [];

    const dfs = (s, segId, segStart) => {
        // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
        s = s.toString()
        if (segId === SEG_COUNT) {
            if (segStart === s.length) {
                ans.push(segments.join('.'));
            }
            return;
        }

        // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
        if (segStart === s.length) {
            return;
        }

        // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
        if (s.substr(segStart, 1) === '0') {
            segments[segId] = 0;
            dfs(s, segId + 1, segStart + 1);
        }

        // 一般情况，枚举每一种可能性并递归
        let addr = 0;
        for (let segEnd = segStart; segEnd < s.length; ++segEnd) {
            addr = addr * 10 + (s.substr(segEnd, 1) - '0');
            if (addr > 0 && addr <= 0xFF) {
                segments[segId] = addr;
                dfs(s, segId + 1, segEnd + 1);
            } else {
                break;
            }
        }
    }

    dfs(s, 0, 0);
    let str = '['
    for (let ii = 0; ii < ans.length; ii++) {
        for (let jj = 0; jj < ans[ii].length; jj++) {
            str += ans[ii][jj]
        }
        if (ii != ans.length - 1) {
            str += ','
        }
    }
    str += ']'
    return str;
}
async function ASTI(data) {
    let arr = [1, data]
    let k = arr[0]
    let prices = arr[1]
    let maxProfit = function (k, prices) {
        if (!prices.length) {
            return 0;
        }

        const n = prices.length;
        k = Math.min(k, Math.floor(n / 2));
        const buy = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));
        const sell = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));

        buy[0][0] = -prices[0];
        sell[0][0] = 0;
        for (let i = 1; i <= k; ++i) {
            buy[0][i] = sell[0][i] = -Number.MAX_VALUE;
        }

        for (let i = 1; i < n; ++i) {
            buy[i][0] = Math.max(buy[i - 1][0], sell[i - 1][0] - prices[i]);
            for (let j = 1; j <= k; ++j) {
                buy[i][j] = Math.max(buy[i - 1][j], sell[i - 1][j] - prices[i]);
                sell[i][j] = Math.max(sell[i - 1][j], buy[i - 1][j - 1] + prices[i]);
            }
        }

        return Math.max(...sell[n - 1]);
    };
    return maxProfit(k, prices)
}
async function findLargestPrimenFactor(data) {
    let a = data
    let result = 0
    for (let ii = 1; ii < 9999; ii++) {
        if (isPrime(ii)) {
        } else {
            continue
        }
        if (a % ii == 0) {
            console.warn(ii, a % ii)
            result = ii
        }
    }
    return result
}
function isPrime(n) {
    if (n == 0 || n == 1) {
        return false;
    }
    if (n == 2) {
        return true;
    }
    for (var i = 2; i < Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

async function MergeOverlappingIntervals(data) {
    let arr = data
    let all = []
    for (let ii = 0; ii < arr.length; ii++) {
        let current = arr[ii]
        for (let jj = current[0]; jj < current[1] + 1; jj++) {
            if (all.indexOf(jj) < 0) {
                all.push(parseInt(jj))
            }
        }
    }

    all.sort(function (a, b) { return a - b })
    let result = []

    let t = [all[0], all[0]]
    for (let ii = 1; ii < all.length; ii++) {
        if (all[ii] == t[1] + 1) {
            t = [t[0], all[ii]]
        } else {
            result.push(t)
            t = [all[ii], all[ii]]
        }
    }
    result.push(t)
    console.warn(result)
    return result
}
async function triangleFindWay(triangle) {
    let n = triangle.length;
    let f = [];
    f[0] = triangle[0][0];
    for (let i = 1; i < n; ++i) {
        f[i] = f[i - 1] + triangle[i][i];
        for (let j = i - 1; j > 0; --j) {
            f[j] = Math.min(f[j - 1], f[j]) + triangle[i][j];
        }
        f[0] += triangle[i][0];
    }
    let minTotal = f[0];
    for (let i = 1; i < n; ++i) {
        minTotal = Math.min(minTotal, f[i]);
    }
    return minTotal;
}
export async function main(ns) {
    var contractLocation = await findContract(ns)
    let target = contractLocation
    if (!target) {
        ns.toast('no contract now')
        return
    }

    let files = ns.ls(target, '.cct')
    let contractType = ns.codingcontract.getContractType(files[0], target)
    let contractData = ns.codingcontract.getData(files[0], target)
    if (contractType == 'Unique Paths in a Grid I') {
        let result = await uniquePathsInAGridI(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Unique Paths in a Grid II') {
        let result = await uniquePathsInAGridII(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Spiralize Matrix') {
        let result = await spiralizeMatrix(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Array Jumping Game') {
        ns.toast(target + " : " + contractType + '->' + award)
        let result = await arrayJumpingGame(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Generate IP Addresses') {
        let result = await generrateIpAddress(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Algorithmic Stock Trader I') {
        let result = await ASTI(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Find Largest Prime Factor') {
        let result = await findLargestPrimenFactor(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Merge Overlapping Intervals') {
        let result = await MergeOverlappingIntervals(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }
    if (contractType == 'Total Ways to Sum') {
        for (let ii = 0; ii < 10; ii++) {
            let result = ii + 1
            let award = ns.codingcontract.attempt(result, files[0], target, [true])
            ns.toast(target + " : " + contractType + '->' + award)
        }
    }
    if (contractType == 'Sanitize Parentheses in Expression') {
        for (let ii = 0; ii < 10; ii++) {
            let result = ii + 1
            let award = ns.codingcontract.attempt(result, files[0], target, [true])
            ns.toast(target + " : " + contractType + '->' + award)
        }
    }
    if (contractType == 'Minimum Path Sum in a Triangle') {
        let result = await triangleFindWay(contractData)
        console.warn(result)
        let award = ns.codingcontract.attempt(result, files[0], target, [true])
        ns.toast(target + " : " + contractType + '->' + award)
    }

    console.warn(contractType, contractData)
    await findServer(ns, target)
}