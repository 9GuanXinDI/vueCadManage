import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'data.xlsx') => {
    // 创建一个工作簿
    const wb = XLSX.utils.book_new();

    console.log('data', data);
    // 转换数据为工作表
    const ws = XLSX.utils.json_to_sheet(data);

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // 生成 Excel 文件并触发下载
    XLSX.writeFile(wb, fileName);
};
