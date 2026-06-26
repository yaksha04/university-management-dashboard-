const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const { Parser } = require('@json2csv/plainjs');
const dp = require('../providers/dataProvider');

const getData = (type, filters) => dp.applyFilters(
  type === 'students'   ? dp.students   :
  type === 'faculty'    ? dp.faculty    :
  type === 'attendance' ? dp.attendance : dp.payments,
  filters
);

async function exportCSV(type, filters, res) {
  const data = getData(type, filters);
  const parser = new Parser();
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${type}-report.csv`);
  res.send(parser.parse(data));
  dp.logHistory(`${type} Report`, filters, 'CSV');
}

async function exportExcel(type, filters, res) {
  const data = getData(type, filters);
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(type.toUpperCase());
  if (data.length) {
    ws.columns = Object.keys(data[0]).map(k => ({ header: k.toUpperCase(), key: k, width: 18 }));
    ws.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    ws.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F46E5' } };
    data.forEach(row => ws.addRow(row));
  }
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${type}-report.xlsx`);
  await wb.xlsx.write(res);
  res.end();
  dp.logHistory(`${type} Report`, filters, 'Excel');
}

async function exportPDF(type, filters, res) {
  const data = getData(type, filters);
  const doc = new PDFDocument({ margin: 40, size: 'A4', layout: 'landscape' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${type}-report.pdf`);
  doc.pipe(res);

  doc.fontSize(18).fillColor('#4F46E5').text(`${type.toUpperCase()} REPORT`, { align: 'center' });
  doc.fontSize(10).fillColor('#6B7280').text(
    `Generated: ${new Date().toLocaleString()}  |  Records: ${data.length}`, { align: 'center' }
  );
  doc.moveDown();

  if (data.length) {
    const cols   = Object.keys(data[0]);
    const colW   = Math.floor(750 / cols.length);
    const startX = 40;
    let y = doc.y;

    doc.rect(startX, y, 750, 20).fill('#4F46E5');
    cols.forEach((c, i) =>
      doc.fillColor('#fff').fontSize(8)
        .text(c.toUpperCase(), startX + i * colW + 4, y + 6, { width: colW - 4, lineBreak: false })
    );
    y += 20;

    data.slice(0, 50).forEach((row, ri) => {
      if (y > 540) { doc.addPage({ layout: 'landscape' }); y = 40; }
      doc.rect(startX, y, 750, 18).fill(ri % 2 === 0 ? '#F9FAFB' : '#FFFFFF');
      cols.forEach((c, i) =>
        doc.fillColor('#111827').fontSize(7.5)
          .text(String(row[c] ?? ''), startX + i * colW + 4, y + 5, { width: colW - 6, lineBreak: false })
      );
      y += 18;
    });
  }

  doc.end();
  dp.logHistory(`${type} Report`, filters, 'PDF');
}

module.exports = { exportCSV, exportExcel, exportPDF };
