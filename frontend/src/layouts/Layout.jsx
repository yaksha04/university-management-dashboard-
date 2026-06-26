import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to:'/',           icon:'⊞', label:'Dashboard' },
  { to:'/students',   icon:'👤', label:'Students' },
  { to:'/faculty',    icon:'🎓', label:'Faculty' },
  { to:'/attendance', icon:'📋', label:'Attendance' },
  { to:'/payments',   icon:'💳', label:'Payments' },
  { to:'/history',    icon:'🕐', label:'History' },
];

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">U</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-none">UniReport</p>
              <p className="text-xs text-gray-400 mt-0.5">Reporting Module</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`
              }>
              <span className="text-base">{l.icon}</span>{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">A</div>
            <div><p className="text-xs font-medium text-gray-700">Admin</p><p className="text-xs text-gray-400">admin@uni.edu</p></div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
