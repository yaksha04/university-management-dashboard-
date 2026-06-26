// Phase 1: Mock Data Provider — swap with real API calls in Phase 5

const students = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: ['Aarav Singh','Priya Sharma','Rohan Mehta','Anjali Gupta','Rahul Verma','Neha Joshi','Kabir Patel','Sanya Nair','Vivek Kumar','Deepika Rao'][i % 10],
  department: ['Computer Science','Electronics','Mechanical','Civil','Business'][i % 5],
  program: ['B.Tech','M.Tech','MBA','BCA'][i % 4],
  semester: (i % 8) + 1,
  batch: 2021 + (i % 4),
  status: i % 7 === 0 ? 'Inactive' : 'Active',
  cgpa: (6.5 + Math.random() * 3).toFixed(2),
}));

const faculty = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ['Dr. A. Kumar','Prof. B. Singh','Dr. C. Sharma','Prof. D. Patel','Dr. E. Nair'][i % 5],
  department: ['Computer Science','Electronics','Mechanical','Civil','Business'][i % 5],
  designation: ['Professor','Associate Professor','Assistant Professor'][i % 3],
  courses: Math.floor(Math.random() * 4) + 1,
  status: i % 6 === 0 ? 'On Leave' : 'Active',
}));

const attendance = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  studentId: (i % 40) + 1,
  studentName: students[i % 40].name,
  course: ['Data Structures','DBMS','OS','Networks','Algorithms'][i % 5],
  department: students[i % 40].department,
  semester: students[i % 40].semester,
  present: Math.floor(Math.random() * 30) + 20,
  total: 50,
  percentage: 0,
})).map(r => ({ ...r, percentage: ((r.present / r.total) * 100).toFixed(1) }));

const payments = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  studentId: (i % 40) + 1,
  studentName: students[i % 40].name,
  department: students[i % 40].department,
  amount: [25000, 30000, 45000, 15000][i % 4],
  type: ['Tuition','Hostel','Library','Exam'][i % 4],
  status: i % 5 === 0 ? 'Pending' : 'Paid',
  date: new Date(2024, i % 12, (i % 28) + 1).toISOString().split('T')[0],
}));

const history = [];

function applyFilters(data, filters) {
  return data.filter(item => {
    if (filters.department && item.department !== filters.department) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.semester && String(item.semester) !== String(filters.semester)) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return Object.values(item).some(v => String(v).toLowerCase().includes(q));
    }
    return true;
  });
}

function paginate(data, page = 1, limit = 10) {
  const start = (page - 1) * limit;
  return { data: data.slice(start, start + limit), total: data.length, page: +page, limit: +limit };
}

function logHistory(reportName, filters, format = 'view') {
  history.unshift({ id: history.length + 1, reportName, generatedBy: 'Admin', generatedAt: new Date().toISOString(), format, filters });
  if (history.length > 100) history.pop();
}

module.exports = { students, faculty, attendance, payments, history, applyFilters, paginate, logHistory };
