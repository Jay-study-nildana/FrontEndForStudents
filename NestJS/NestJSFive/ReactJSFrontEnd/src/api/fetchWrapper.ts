// src/api/fetchWrapper.ts
// Robust fetch wrapper for backend API

//this is not being used. 
//the original plan was to use a fetch wrapper for all API calls to centralize error handling and token management,
//but it keeps returning HTML instead of JSON for some reason, even when the endpoint is correct and returns JSON in Postman.
//I will investigate this in the future and refactor the components to use this wrapper for cleaner code.
//This file can be used in the future to refactor those components for cleaner code.
//adding a TODO comment to indicate this is a work in progress and not currently used.
//dear students, if you can fix it, let me know! I will also try to fix it when I have time. 
// 
// The main issue is that the fetch wrapper is not correctly handling the response and is trying to parse HTML as JSON, which causes errors. I need to add better error handling and check the content type of the response before trying to parse it as JSON.

export interface FetchWrapperOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
  signal?: AbortSignal;
}

export async function fetchWrapper(
  url: string,
  options: FetchWrapperOptions = {},
): Promise<any> {
  const { method = "GET", headers = {}, body, token, signal } = options;
  const fetchHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };
  if (body && !(body instanceof FormData)) {
    fetchHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
    signal,
    credentials: "include", // for cookies if needed
  });
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }
  if (!response.ok) {
    const error = new Error(
      typeof data === "object" && data && data.message
        ? data.message
        : response.statusText,
    );
    (error as any).status = response.status;
    (error as any).data = data;
    throw error;
  }
  return data;
}
