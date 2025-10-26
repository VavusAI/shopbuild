import axios from 'axios';
import { ENV } from '../config/env.generated';
import { getToken } from './auth';

export const api = axios.create({ baseURL: ENV.API_BASE_URL });

api.interceptors.request.use(async (config) => {
  const tk = await getToken();
  if (tk) {
    // If headers is AxiosHeaders, use its API; else merge onto a POJO
    const h = config.headers as any;
    if (h && typeof h.set === 'function') {
      h.set('Authorization', `Bearer ${tk}`);
    } else {
      config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${tk}` } as any;
    }
  }
  return config;
});
