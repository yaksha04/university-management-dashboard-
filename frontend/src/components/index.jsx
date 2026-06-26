import React from 'react';
import { getExportURL } from '../services/api';

// ── Stat Card ────────────────────────────────────────────────────
export function StatCard({ label, value, icon, color = 'text-primary', sub }) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`text-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Loader ───────────────────────────────────────────────────────
export function Loader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"/>
    </div>
  );
}

// ── Error ────────────────────────────────────────────────────────
export function ErrorMsg({ msg }) {
  return <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">{msg}</div>;
}

// ── Status Badge ─────────────────────────────────────────────────
export function Badge({ value }) {
  const v = String(value).toLowerCase();
  const cls = v === 'active' || v === 'paid' ? 'badge-green' : v === 'pending' ? 'badge-yellow' : 'badge-red';
  return <span className={cls}>{value}</span>;
}

// ── Report Table ─────────────────────────────────────────────────
export function ReportTable({ data, statusKey }) {
  if (!data.length) return <div className="text-center py-12 text-gray-400 text-sm">No records found.</div>;
  const cols = Object.keys(data[0]).filter(c => c !== 'id');
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>{cols.map(c => <th key={c} className="th">{c.replace(/([A-Z])/g,' $1').trim()}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              {cols.map(c => (
                <td key={c} className="td">
                  {c === statusKey ? <Badge value={row[c]}/> : row[c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Filter Panel ─────────────────────────────────────────────────
export function FilterPanel({ filters, onChange, onApply, onClear, extras = [] }) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <input className="input w-44" placeholder="Search…"
        value={filters.search || ''} onChange={e => onChange('search', e.target.value)}/>
      <select className="input w-44" value={filters.department || ''}
        onChange={e => onChange('department', e.target.value)}>
        <option value="">All Departments</option>
        {['Computer Science','Electronics','Mechanical','Civil','Business'].map(d =>
          <option key={d}>{d}</option>)}
      </select>
      {extras.includes('status') && (
        <select className="input w-36" value={filters.status || ''}
          onChange={e => onChange('status', e.target.value)}>
          <option value="">All Status</option>
          <option>Active</option><option>Inactive</option>
          <option>Paid</option><option>Pending</option><option>On Leave</option>
        </select>
      )}
      {extras.includes('semester') && (
        <select className="input w-32" value={filters.semester || ''}
          onChange={e => onChange('semester', e.target.value)}>
          <option value="">All Semesters</option>
          {[1,2,3,4,5,6,7,8].map(s => <option key={s}>{s}</option>)}
        </select>
      )}
      <button className="btn-primary" onClick={onApply}>Apply</button>
      <button className="btn-ghost" onClick={onClear}>Clear</button>
    </div>
  );
}

// ── Export Buttons ────────────────────────────────────────────────
export function ExportButtons({ type, filters }) {
  const open = fmt => window.open(getExportURL(fmt, type, filters), '_blank');
  return (
    <div className="flex gap-2">
      <button onClick={() => open('csv')}   className="btn-outline">⬇ CSV</button>
      <button onClick={() => open('excel')} className="btn-outline">⬇ Excel</button>
      <button onClick={() => open('pdf')}   className="btn-outline">⬇ PDF</button>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────
export function Pagination({ page, total, limit = 10, onPage }) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
      <p className="text-xs text-gray-400">Showing {(page-1)*limit+1}–{Math.min(page*limit, total)} of {total}</p>
      <div className="flex gap-1">
        <button disabled={page===1} onClick={()=>onPage(page-1)} className="btn-ghost disabled:opacity-30">← Prev</button>
        {Array.from({length: Math.min(pages,5)},(_,i)=>i+1).map(p=>(
          <button key={p} onClick={()=>onPage(p)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p===page?'bg-primary text-white':'text-gray-600 hover:bg-gray-100'}`}>
            {p}
          </button>
        ))}
        <button disabled={page===pages} onClick={()=>onPage(page+1)} className="btn-ghost disabled:opacity-30">Next →</button>
      </div>
    </div>
  );
}

// ── Page Header ───────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
