// ...existing code...
import React, { useEffect, useState } from 'react';
import { useGetApodQuery, apodApi } from './apodApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
//   addFavorite,
  removeFavorite,
  toggleFavorite,
  addHistory,
//   setShowHdLink,
} from './apodSlice';
import { selectFavoritesArray, selectIsFavorite, selectHistory } from './selectors';
import type { Apod } from './types';

function formatDateISO(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(dateIso: string, delta: number) {
  const d = new Date(dateIso);
  d.setDate(d.getDate() + delta);
  return formatDateISO(d);
}

export default function ApodViewer() {
  const today = formatDateISO(new Date());
  const [selectedDate, setSelectedDate] = React.useState<string | undefined>(undefined); // undefined => today
  const [imgLoaded, setImgLoaded] = useState(false);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavoritesArray);
  const history = useAppSelector(selectHistory);

  // RTK Query hook for the selected date
  const { data, error, isLoading, isFetching, refetch } = useGetApodQuery(
    selectedDate ? { date: selectedDate } : undefined,
  );

  // reset image loaded state whenever the image url changes
  useEffect(() => {
    setImgLoaded(false);
  }, [data?.url]);

  // When we receive data, add it to history automatically
  useEffect(() => {
    if (data) {
      dispatch(addHistory(data.date));
    }
  }, [data, dispatch]);

  // toggle favorite helper
  function onToggleFavorite(current?: Apod) {
    if (!current) return;
    dispatch(toggleFavorite(current));
  }

  // prefetch helpers for prev/next
  function prefetchDate(dateIso: string) {
    dispatch(apodApi.util.prefetch('getApod', { date: dateIso }, { force: false }));
  }

  // convenience: check if currently favorited
  const isFavorite = useAppSelector((s) => selectIsFavorite(s, data?.date));

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h2>NASA APOD (RTK Query + Redux Slice)</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Select date:
          <input
            type="date"
            value={selectedDate ?? today}
            max={today}
            onChange={(e) => {
              const val = e.target.value;
              if (val === today) setSelectedDate(undefined);
              else setSelectedDate(val);
            }}
            style={{ marginLeft: 8 }}
            onMouseEnter={() => {
              // prefetch the selected date if present (no-op if undefined => today)
              if (selectedDate) prefetchDate(selectedDate);
            }}
          />
        </label>

        <button
          onClick={() => {
            const next = addDays(selectedDate ?? today, -1);
            setSelectedDate(next);
          }}
          style={{ marginLeft: 12 }}
          disabled={isFetching}
        >
          Prev Day
        </button>

        <button
          onClick={() => {
            const next = addDays(selectedDate ?? today, 1);
            // if next === today, treat as undefined
            if (next === today) setSelectedDate(undefined);
            else setSelectedDate(next);
          }}
          style={{ marginLeft: 8 }}
          disabled={selectedDate === undefined || selectedDate === today || isFetching}
        >
          Next Day
        </button>

        <button onClick={() => setSelectedDate(undefined)} style={{ marginLeft: 8 }}>
          Today
        </button>

        <button onClick={() => refetch()} style={{ marginLeft: 8 }}>
          Refresh
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        {isLoading ? (
          <div>Loading…</div>
        ) : error ? (
          <div style={{ color: 'crimson' }}>Error loading APOD.</div>
        ) : data ? (
          <article>
            <h3>
              {data.title} <small>({data.date})</small>
            </h3>

            <div style={{ marginBottom: 8 }}>
              {data.media_type === 'image' ? (
                // Image container with placeholder animation while image is loading.
                <div className="relative rounded-md overflow-hidden bg-gray-100 dark:bg-slate-800" style={{ minHeight: 280 }}>
                  {/* skeleton / shimmer */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                    aria-hidden
                  >
                    <div className="w-full h-full animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" />
                    {/* optional spinner centered */}
                    <div className="absolute">
                      <svg className="h-8 w-8 text-gray-400 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 24v-4a8 8 0 01-8-8z" />
                      </svg>
                    </div>
                  </div>

                  <img
                    src={data.url}
                    alt={data.title}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-auto transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ borderRadius: 8 }}
                  />
                </div>
              ) : data.media_type === 'video' ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src={data.url}
                    title={data.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                      borderRadius: 8,
                    }}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div>Unsupported media type: {data.media_type}</div>
              )}
            </div>

            <p style={{ whiteSpace: 'pre-wrap' }}>{data.explanation}</p>

            <div style={{ marginTop: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
              {data.hdurl ? (
                <a href={data.hdurl} target="_blank" rel="noreferrer">
                  View HD
                </a>
              ) : null}
              <button onClick={() => onToggleFavorite(data)}>
                {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
              </button>
              <span style={{ marginLeft: 8 }}>
                {data.copyright ? `© ${data.copyright}` : 'Public domain / NASA'}
              </span>
              {isFetching ? <span style={{ marginLeft: 8 }}>Updating…</span> : null}
            </div>
          </article>
        ) : (
          <div>No data</div>
        )}
      </div>

      <hr />

      <section style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h4>Favorites ({favorites.length})</h4>
          {favorites.length === 0 ? (
            <div>No favorites yet.</div>
          ) : (
            <ul>
              {favorites.map((f) => (
                <li key={f.date}>
                  <button
                    onClick={() => {
                      // navigate to that date
                      setSelectedDate(f.date === today ? undefined : f.date);
                    }}
                    style={{ marginRight: 8 }}
                  >
                    View
                  </button>
                  <strong>{f.title}</strong> <small>({f.date})</small>{' '}
                  <button
                    onClick={() => {
                      dispatch(removeFavorite(f.date));
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ width: 320 }}>
          <h4>History</h4>
          {history.length === 0 ? (
            <div>No history yet.</div>
          ) : (
            <ul>
              {history.map((d) => (
                <li key={d}>
                  <button
                    onClick={() => setSelectedDate(d === today ? undefined : d)}
                    style={{ marginRight: 8 }}
                  >
                    View
                  </button>
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
// ...existing code...