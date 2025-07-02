export function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear(); // 获取年
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 获取月，并格式化为两位数字
    const day = String(now.getDate()).padStart(2, '0'); // 获取日，并格式化为两位数字
    const hours = String(now.getHours()).padStart(2, '0'); // 获取小时，并格式化为两位数字
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 获取分钟，并格式化为两位数字
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 获取秒，并格式化为两位数字

    // 拼接成你想要的格式
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 类似1724700618719转换为日期格式的方法
 */
export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}