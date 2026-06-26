import { useState, useCallback } from 'react';
import { fetchReport } from '../services/api';

export default function useReport(type) {
  const [data, setData]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const load = useCallback(async (filters = {}, p = 1) => {
    setLoading(true); setError(null);
    try {
      const res = await fetchReport(type, { ...filters, page: p, limit: 10 });
      setData(res.data.data); setTotal(res.data.total); setPage(p);
    } catch { setError('Failed to load data. Is the backend running?'); }
    finally { setLoading(false); }
  }, [type]);

  return { data, total, page, loading, error, load, setPage };
}
