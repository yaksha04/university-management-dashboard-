const reportService = require('../services/reportService');
const exportService = require('../exports/exportService');
const dp = require('../providers/dataProvider');

const getFilters = q => ({
  department: q.department || '',
  status: q.status || '',
  semester: q.semester || '',
  search: q.search || '',
});

exports.getReport = (type) => (req, res) => {
  try {
    const result = reportService.getReport(type, getFilters(req.query), req.query.page, req.query.limit);
    res.json({ success: true, ...result });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getSummary = (_, res) => {
  try { res.json({ success: true, data: reportService.getSummary() }); }
  catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

exports.getHistory = (_, res) => {
  try { res.json({ success: true, data: dp.history }); }
  catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

exports.exportReport = (format) => async (req, res) => {
  const type = req.query.type || 'students';
  const filters = getFilters(req.query);
  try {
    if (format === 'csv')   await exportService.exportCSV(type, filters, res);
    if (format === 'excel') await exportService.exportExcel(type, filters, res);
    if (format === 'pdf')   await exportService.exportPDF(type, filters, res);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
