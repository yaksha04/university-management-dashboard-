# Reporting Module — University Management System

Full-stack reporting module: React + Vite frontend, Express backend, mock data (Phase 1).

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev        # → http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # → http://localhost:5173
```

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/reports/summary | Dashboard summary stats |
| GET | /api/reports/students | Student report (filterable, paginated) |
| GET | /api/reports/faculty | Faculty report |
| GET | /api/reports/attendance | Attendance report |
| GET | /api/reports/payments | Payment report |
| GET | /api/reports/fees | Fee report |
| GET | /api/reports/history | Report generation history |
| GET | /api/reports/export/csv?type=students | Export as CSV |
| GET | /api/reports/export/excel?type=students | Export as Excel |
| GET | /api/reports/export/pdf?type=students | Export as PDF |

### Filter Query Params
`?department=Computer+Science&status=Active&semester=3&search=keyword&page=1&limit=10`

## Structure
```
reporting-module/
├── backend/
│   └── src/
│       ├── controllers/    # Request handling
│       ├── routes/         # API routes
│       ├── services/       # Business logic
│       ├── providers/      # Mock data (swap with real APIs in Phase 5)
│       └── exports/        # CSV / Excel / PDF generation
└── frontend/
    └── src/
        ├── pages/          # Dashboard, ReportPage, History
        ├── components/     # Table, FilterPanel, ExportButtons, Pagination
        ├── services/       # Axios API calls
        └── hooks/          # useReport data hook
```

## Phase Roadmap
- **Phase 1** ✅ — Setup, mock data, Dashboard UI
- **Phase 2** ✅ — Student, Faculty, Attendance, Payment reports + filters
- **Phase 3** ✅ — CSV, Excel, PDF export
- **Phase 4** ✅ — History, Pagination, Search, Validation
- **Phase 5** 🔜 — Replace `src/providers/dataProvider.js` with real module APIs
