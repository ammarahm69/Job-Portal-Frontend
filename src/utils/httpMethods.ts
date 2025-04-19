import axios, { AxiosError, AxiosResponse } from 'axios';
import { getLocalStorageItem } from './helperFunction';

interface AuthToken {
  access_token: string;
}

const authToken = getLocalStorageItem('user') as AuthToken | null;
console.log('authToken', authToken);

interface HttpRequestParams {
  url: string;
  payload?: unknown;
  params?: Record<string, unknown> | null;
}

export const authHttpPost = async ({ url, payload = null }: HttpRequestParams): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (e) {
    console.log(e);
    return (e as AxiosError).response!;
  }
};

export const httpGet = async ({ url, params = null }: HttpRequestParams): Promise<AxiosResponse | undefined> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return;
  }
  try {
    const response = await axios.get(url, {
      headers: { Authorization: 'Bearer ' + authToken.access_token },
      params: params || undefined,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const httpPostBlob = async ({ url, payload }: HttpRequestParams): Promise<AxiosResponse | undefined> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return;
  }
  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken.access_token}`,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const httpPostBlobDoc = async ({ url, payload = null }: HttpRequestParams): Promise<AxiosResponse | undefined> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return;
  }
  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${authToken.access_token}`,
      },
      responseType: 'blob',
    });
    return response;
  } catch (e) {
    console.error('File Upload Error:', e);
  }
};

export const httpPost = async ({ url, payload = null }: HttpRequestParams): Promise<AxiosResponse | AxiosError> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return new AxiosError('No auth token');
  }
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: 'Bearer ' + authToken.access_token },
    });
    return response;
  } catch (e) {
    console.log(e);
    return e as AxiosError;
  }
};

export const httpPut = async ({ url, payload }: HttpRequestParams): Promise<AxiosResponse | AxiosError> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return new AxiosError('No auth token');
  }
  try {
    const response = await axios.put(url, payload, {
      headers: { Authorization: 'Bearer ' + authToken.access_token },
    });
    return response;
  } catch (e) {
    console.log(e);
    return e as AxiosError;
  }
};

export const httpDelete = async ({ url }: HttpRequestParams): Promise<AxiosResponse | AxiosError> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return new AxiosError('No auth token');
  }
  try {
    const response = await axios.delete(url, {
      headers: { Authorization: 'Bearer ' + authToken.access_token },
    });
    return response;
  } catch (e) {
    console.log(e);
    return e as AxiosError;
  }
};

export const httpPatch = async ({ url, payload = null }: HttpRequestParams): Promise<AxiosResponse | AxiosError> => {
  if (!authToken) {
    window.location.href = window.location.origin + '/signin';
    return new AxiosError('No auth token');
  }
  try {
    const response = await axios.patch(url, payload, {
      headers: { Authorization: 'Bearer ' + authToken.access_token },
    });
    return response;
  } catch (e) {
    console.log(e);
    return e as AxiosError;
  }
};

export const httpGetWithOutToken = async ({ url, params = null }: HttpRequestParams): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axios.get(url, {
      params: params || undefined,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const httpPostWithOutToken = async ({ url, payload = null }: HttpRequestParams): Promise<AxiosResponse | AxiosError> => {
  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (e) {
    console.log(e);
    return e as AxiosError;
  }
};

export const httpPutWithOutToken = async ({ url, payload = null }: HttpRequestParams): Promise<AxiosResponse | AxiosError> => {
  try {
    const response = await axios.put(url, payload);
    return response;
  } catch (e) {
    console.log(e);
    return e as AxiosError;
  }
};
