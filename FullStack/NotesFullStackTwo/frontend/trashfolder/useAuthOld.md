// import { useCallback, useRef, useState } from 'react';
// import { register as apiRegister, login as apiLogin, APIError } from '../services/auth';
// import type { RegisterPayload, UserResponse, LoginPayload, LoginResponse } from '../services/auth';

// export function useRegister() {
//   const [data, setData] = useState<UserResponse | null>(null);
//   const [error, setError] = useState<APIError | Error | null>(null);
//   const [loading, setLoading] = useState(false);
//   const abortRef = useRef<AbortController | null>(null);

//   const register = useCallback(async (payload: RegisterPayload) => {
//     if (abortRef.current) {
//       abortRef.current.abort();
//     }
//     const ac = new AbortController();
//     abortRef.current = ac;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await apiRegister(payload, { signal: ac.signal });
//       setData(res as UserResponse);
//       return res as UserResponse;
//     } catch (err: any) {
//       if (err?.name === 'AbortError') return;
//       const e = err instanceof APIError ? err : new APIError(err?.message || 'Registration failed');
//       setError(e);
//       throw err;
//     } finally {
//       setLoading(false);
//       abortRef.current = null;
//     }
//   }, []);

//   const cancel = useCallback(() => {
//     if (abortRef.current) {
//       abortRef.current.abort();
//       abortRef.current = null;
//       setLoading(false);
//     }
//   }, []);

//   const reset = useCallback(() => {
//     setData(null);
//     setError(null);
//     setLoading(false);
//   }, []);

//   return { register, data, error, loading, cancel, reset };
// }

// export function useLogin() {
//   const [data, setData] = useState<LoginResponse | null>(null);
//   const [error, setError] = useState<APIError | Error | null>(null);
//   const [loading, setLoading] = useState(false);
//   const abortRef = useRef<AbortController | null>(null);

//   const login = useCallback(async (payload: LoginPayload) => {
//     if (abortRef.current) {
//       abortRef.current.abort();
//     }
//     const ac = new AbortController();
//     abortRef.current = ac;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await apiLogin(payload, { signal: ac.signal });
//       setData(res as LoginResponse);
//       return res as LoginResponse;
//     } catch (err: any) {
//       if (err?.name === 'AbortError') return;
//       const e = err instanceof APIError ? err : new APIError(err?.message || 'Login failed');
//       setError(e);
//       throw err;
//     } finally {
//       setLoading(false);
//       abortRef.current = null;
//     }
//   }, []);

//   const cancel = useCallback(() => {
//     if (abortRef.current) {
//       abortRef.current.abort();
//       abortRef.current = null;
//       setLoading(false);
//     }
//   }, []);

//   const reset = useCallback(() => {
//     setData(null);
//     setError(null);
//     setLoading(false);
//   }, []);

//   return { login, data, error, loading, cancel, reset };
// }

// export default useRegister;