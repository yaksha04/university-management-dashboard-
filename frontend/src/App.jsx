import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard  from './pages/Dashboard';
import ReportPage from './pages/ReportPage';
import History    from './pages/History';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/students"   element={<ReportPage type="students"   title="Student Report"    subtitle="Academic and enrollment overview" statusKey="status" extras={['status','semester']}/>}/>
        <Route path="/faculty"    element={<ReportPage type="faculty"    title="Faculty Report"    subtitle="Staff and course assignments"     statusKey="status" extras={['status']}/>}/>
        <Route path="/attendance" element={<ReportPage type="attendance" title="Attendance Report" subtitle="Course-wise attendance tracking"  statusKey="percentage" extras={['semester']}/>}/>
        <Route path="/payments"   element={<ReportPage type="payments"   title="Payment Report"    subtitle="Fee and payment transactions"     statusKey="status" extras={['status']}/>}/>
        <Route path="/history"    element={<History/>}/>
        <Route path="*"           element={<div className="text-center py-20 text-gray-400">Page not found</div>}/>
      </Routes>
    </Layout>
  );
}
