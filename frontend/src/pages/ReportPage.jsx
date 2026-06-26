import React, { useEffect, useState } from 'react';
import useReport from '../hooks/useReport';
import { FilterPanel, ExportButtons, ReportTable, Pagination, PageHeader, Loader, ErrorMsg } from '../components/index.jsx';

export default function ReportPage({ type, title, subtitle, statusKey = 'status', extras = [] }) {
  const { data, total, page, loading, error, load } = useReport(type);
  const [filters, setFilters] = useState({});
  const [applied, setApplied] = useState({});

  useEffect(() => { load({}, 1); }, [type]);

  const change = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  const apply  = ()     => { setApplied(filters); load(filters, 1); };
  const clear  = ()     => { setFilters({}); setApplied({}); load({}, 1); };

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle}
        actions={<ExportButtons type={type} filters={applied}/>}/>

      <div className="card mb-4">
        <FilterPanel filters={filters} onChange={change} onApply={apply} onClear={clear} extras={extras}/>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500 font-medium">{total} records found</p>
        </div>
        {error   && <ErrorMsg msg={error}/>}
        {loading && <Loader/>}
        {!loading && !error && <ReportTable data={data} statusKey={statusKey}/>}
        <Pagination page={page} total={total} onPage={p => load(applied, p)}/>
      </div>
    </div>
  );
}
