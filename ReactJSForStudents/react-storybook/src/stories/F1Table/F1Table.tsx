import React, { useMemo, useState } from 'react';
import './F1Table.css';

export type F1Driver = {
  position: number;
  driver: string;
  team: string;
  nationality: string;
  races: number;
  wins: number;
  podiums: number;
  points: number;
  bestFinish?: number;
};

export type F1TableProps = {
  data: F1Driver[];
  pageSize?: number;
  initialSortBy?: keyof F1Driver | 'pointsPerRace' | 'winRate';
  initialSortDir?: 'asc' | 'desc';
  showColumns?: Partial<Record<keyof (F1Driver) | 'pointsPerRace' | 'winRate', boolean>>;
  className?: string;
};

type SortState = {
  key: keyof F1Driver | 'pointsPerRace' | 'winRate';
  dir: 'asc' | 'desc';
};

const DEFAULT_COLUMNS: Array<keyof (F1Driver) | 'pointsPerRace' | 'winRate'> = [
  'position',
  'driver',
  'team',
  'nationality',
  'races',
  'wins',
  'podiums',
  'points',
  'pointsPerRace',
  'winRate'
];

function formatNumber(v: number, digits = 2) {
  return Number.isFinite(v) ? v.toFixed(digits) : '-';
}

export const F1Table: React.FC<F1TableProps> = ({
  data,
  pageSize = 5,
  initialSortBy = 'points',
  initialSortDir = 'desc',
  showColumns = {},
  className = ''
}) => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<SortState>({ key: initialSortBy, dir: initialSortDir });
  const [page, setPage] = useState(1);

  // Compute derived columns per row
  const computed = useMemo(() => {
    return data.map((d) => {
      const pointsPerRace = d.races > 0 ? d.points / d.races : 0;
      const winRate = d.races > 0 ? d.wins / d.races : 0;
      return { ...d, pointsPerRace, winRate };
    });
  }, [data]);

  // Filtering
  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return computed;
    return computed.filter((r) => {
      return (
        String(r.driver).toLowerCase().includes(q) ||
        String(r.team).toLowerCase().includes(q) ||
        String(r.nationality).toLowerCase().includes(q)
      );
    });
  }, [computed, filter]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { key, dir } = sort;
    arr.sort((a: any, b: any) => {
      const va = a[key];
      const vb = b[key];
      if (va == null && vb == null) return 0;
      if (va == null) return dir === 'asc' ? -1 : 1;
      if (vb == null) return dir === 'asc' ? 1 : -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return dir === 'asc' ? va - vb : vb - va;
      }
      return dir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return arr;
  }, [filtered, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageClamped = Math.min(Math.max(1, page), totalPages);
  const pageData = useMemo(() => {
    const start = (pageClamped - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, pageClamped, pageSize]);

  // Columns
  const columns = DEFAULT_COLUMNS.filter((col) => showColumns[col] !== false);

  // Handlers
  const toggleSort = (key: SortState['key']) => {
    setPage(1);
    setSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      }
      return { key, dir: 'desc' };
    });
  };

  const exportCsv = () => {
    const headers = columns;
    const rows = computed.map((row) =>
      headers.map((h) => {
        const v = (row as any)[h];
        if (typeof v === 'number') return v.toString();
        return String(v ?? '');
      })
    );
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'f1-table-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`f1table-root ${className}`}>
      <div className="f1table-toolbar">
        <div className="f1table-search">
          <label className="sr-only" htmlFor="f1-search">
            Search drivers or teams
          </label>
          <input
            id="f1-search"
            placeholder="Filter by driver, team or nationality..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="f1table-input"
          />
        </div>

        <div className="f1table-actions">
          <label className="f1table-pagesize">
            Per page:
            <select
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                // @ts-ignore mutating prop not allowed by TS—this select is for story controls; keep behavior simple
                console.log('Page size change requested:', e.target.value);
              }}
              disabled
              title="Page size controlled via props in stories"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>

          <button className="f1table-btn" onClick={() => { setPage(1); setSort({ key: 'points', dir: 'desc' }); }}>
            Reset sort
          </button>
          <button className="f1table-btn" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      <div className="f1table-wrap">
        <table className="f1table-table" role="table">
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sort.key === col;
                const label =
                  col === 'pointsPerRace'
                    ? 'Pts/R'
                    : col === 'winRate'
                    ? 'Win %'
                    : String(col).replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
                return (
                  <th key={col as string} onClick={() => toggleSort(col)} className="f1table-th" scope="col">
                    <div className="f1table-th-inner">
                      <span>{label}</span>
                      <span className="f1table-sort-indicator">{isSorted ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="f1table-empty">
                  No results
                </td>
              </tr>
            ) : (
              pageData.map((r, idx) => (
                <tr key={`${r.driver}-${idx}`}>
                  {columns.map((col) => {
                    if (col === 'pointsPerRace') {
                      return <td key={String(col)}>{formatNumber((r as any).pointsPerRace, 2)}</td>;
                    }
                    if (col === 'winRate') {
                      return <td key={String(col)}>{formatNumber((r as any).winRate * 100, 1)}%</td>;
                    }
                    const v = (r as any)[col];
                    if (col === 'driver') {
                      return (
                        <td key={String(col)} className="f1table-driver">
                          <div className="f1table-driver-main">{v}</div>
                          <div className="f1table-driver-sub">{r.team}</div>
                        </td>
                      );
                    }
                    return <td key={String(col)}>{v}</td>;
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="f1table-footer">
        <div>
          Showing {(pageClamped - 1) * pageSize + 1} - {Math.min(sorted.length, pageClamped * pageSize)} of {sorted.length}
        </div>
        <div className="f1table-pager">
          <button className="f1table-btn" onClick={() => setPage(1)} disabled={pageClamped === 1}>«</button>
          <button className="f1table-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pageClamped === 1}>‹</button>
          <span className="f1table-page-indicator">Page {pageClamped} / {totalPages}</span>
          <button className="f1table-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={pageClamped === totalPages}>›</button>
          <button className="f1table-btn" onClick={() => setPage(totalPages)} disabled={pageClamped === totalPages}>»</button>
        </div>
      </div>
    </div>
  );
};

F1Table.displayName = 'F1Table';