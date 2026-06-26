const dp = require('../providers/dataProvider');

const reportMap = {
  students: () => dp.students,
  faculty:  () => dp.faculty,
  attendance: () => dp.attendance,
  payments: () => dp.payments,
  fees: () => dp.payments.filter(p => p.type === 'Tuition'),
};

function getReport(type, filters = {}, page, limit) {
  const raw = reportMap[type] ? reportMap[type]() : [];
  const filtered = dp.applyFilters(raw, filters);
  dp.logHistory(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, filters);
  return dp.paginate(filtered, page, limit);
}

function getSummary() {
  return {
    totalStudents: dp.students.length,
    activeStudents: dp.students.filter(s => s.status === 'Active').length,
    totalFaculty: dp.faculty.length,
    avgAttendance: (dp.attendance.reduce((s, a) => s + +a.percentage, 0) / dp.attendance.length).toFixed(1),
    totalRevenue: dp.payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0),
    pendingPayments: dp.payments.filter(p => p.status === 'Pending').length,
  };
}

module.exports = { getReport, getSummary };
