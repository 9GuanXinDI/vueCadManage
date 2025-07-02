/**
 * a的key值在b中存在 则把b赋值给a
 * @param a
 * @param b
 * @returns {*}
 */
export function updateProperties(a, b) {
    console.log(a, b)
    Object.keys(b).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(a, key)) {
            a[key] = b[key];
        }
    });
    return a;
}

// 尝试判断proxy背后代理的对象是否为空
export function isEmptyProxy(proxyObj) {
    try {
        // 尝试通过Reflect获取proxy的属性键
        const keys = Reflect.ownKeys(proxyObj);
        return keys.length === 0;
    } catch (e) {
        // 如果发生错误，可能是因为无法访问被代理的对象
        console.error("Cannot determine if proxy is empty:", e);
        return false; // 或者根据具体需求返回true或其他值
    }
}

/**
 * 节流
 * @param func
 * @param limit
 * @returns {(function(): void)|*}
 */
export function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                lastRan = Date.now();
                func.apply(context, args);
            }, limit);
        }
    }
}

/**
 * 处理网格节点
 * @param data
 * @returns {*[]}
 */
export function hanlderGridData(data) {
    const itemMap = {};
    data.forEach(item => {
        itemMap[item.reseauId] = {
            value: item.reseauId,
            label: item.reseauName,
            pid: item.pid,
            children: [] };
    });

    // 构建树
    const rootItems = [];
    data.forEach(item => {
        if (item.pid === 0) {
            // pid为0的项目是根节点
            rootItems.push(itemMap[item.reseauId]);
        } else {
            findNode(rootItems, item);
        }
    });
    return rootItems;
}

function findNode(tree, node) {
    if (tree && !tree.length) return;
    tree.forEach((item) => {
        if (node.pid === item.value) {
            item.children.push({
                    value: node.reseauId,
                    label: node.reseauName,
                    pid: node.pid,
                    children: []
                }
            );
        }
        if (!item.children) return;
        findNode(item.children, node);
    })
}

export function findNodePath(tree, targetValue, path = []) {
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        // 将当前节点的索引添加到路径中
        path.push(tree[i].value);

        // 检查当前节点是否是目标节点
        if (node.value === targetValue) {
            return path; // 返回当前路径
        }

        // 如果当前节点有子节点，则递归查找
        if (node.children && node.children.length > 0) {
            const result = findNodePath(node.children, targetValue, path);
            if (result.length) {
                return result; // 如果在子树中找到，返回结果
            }
        }

        path.pop();
    }

    return [];
}

export function getTimeText(time) {
    let text = '';
    switch (time) {
        case '10': text = '10分钟'; break;
        case '30': text = '30分钟'; break;
        case '60': text = '1小时'; break;
        case '120': text = '2小时'; break;
    }
    return text;
}

/**
 * 把字典值的对象 转换为下拉选项的格式
 */
export function formatDataToSelect(obj) {
    const list = [];
    if (!obj) return list;
    for (let key in obj) {
        list.push({
            label: obj[key].desc,
            value: obj[key].value
        })
    }
    return list;
}
/**
 * 统一设备管理与微站的tenantCode
 */
export function unifiedTenantCode(code) {
    let data = [
      {
        pm_web: '56SS8wqeWQIJ8645A218Q',
        smart_web: 'NangTong_Aji8H9dUoqw0sHGIw83jaa',
      },
      {
        pm_web: 'ZUNYI_UW78A1a9weg65df4s458ew',
        smart_web: 'ZunYi_Aieo82joaj844kHHKL247Hn0JGS',
      },
      {
        pm_web: '7sau8ihg9ffrre6r545rtLkqPQ4',
        smart_web: 'Zhangzhou_Erts82j124HKqw7Hn0JGS',
      },
    ];
    let indexOf = data.findIndex((item) => code == item.smart_web);
    return indexOf > -1 ? data[indexOf].pm_web : code;
}
