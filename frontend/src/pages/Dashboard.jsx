import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSummary } from '../services/api';
import { StatCard, Loader, ErrorMsg } from '../components/index.jsx';

const fmt = n => typeof n === 'number' ? n.toLocaleString() : n;

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchSummary()
      .then(r => setSummary(r.data.data))
      .catch(() => setError('Backend not reachable. Run: cd backend && npm install && npm run dev'))
      .finally(() => setLoading(false));
  }, []);

  const cards = summary ? [
    { label:'Total Students',    value: fmt(summary.totalStudents),    icon:'👤', color:'text-indigo-500' },
    { label:'Active Students',   value: fmt(summary.activeStudents),   icon:'✅', color:'text-emerald-500' },
    { label:'Faculty Members',   value: fmt(summary.totalFaculty),     icon:'🎓', color:'text-blue-500' },
    { label:'Avg Attendance',    value: `${summary.avgAttendance}%`,   icon:'📋', color:'text-purple-500' },
    { label:'Total Revenue',     value: `₹${fmt(summary.totalRevenue)}`, icon:'💰', color:'text-green-600' },
    { label:'Pending Payments',  value: fmt(summary.pendingPayments),  icon:'⏳', color:'text-amber-500' },
  ] : [];

  const quickLinks = [
    { to:'/students',   label:'Student Report',    icon:'👤', desc:'View & export student data' },
    { to:'/faculty',    label:'Faculty Report',    icon:'🎓', desc:'Faculty & course details' },
    { to:'/attendance', label:'Attendance Report', icon:'📋', desc:'Track attendance %' },
    { to:'/payments',   label:'Payment Report',    icon:'💳', desc:'Fee & payment records' },
  ];

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
        <p className="text-gray-500 text-sm mt-1">University Reporting Dashboard — {new Date().toLocaleDateString('en-IN',{dateStyle:'long'})}</p>
      </div>

      {error  && <div className="mb-6"><ErrorMsg msg={error}/></div>}
      {loading && <Loader/>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {cards.map(c => <StatCard key={c.label} {...c}/>)}
          </div>

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map(l => (
              <Link key={l.to} to={l.to}
                className="card hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group block">
                <div className="text-3xl mb-3">{l.icon}</div>
                <p className="font-semibold text-gray-800 group-hover:text-primary transition-colors text-sm">{l.label}</p>
                <p className="text-xs text-gray-400 mt-1">{l.desc}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
