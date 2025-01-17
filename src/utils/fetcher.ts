import { envClient } from '@/configs/env-client.config';
import Axios from 'axios';

// Membuat instance Axios
export const axios = Axios.create({
  baseURL: envClient.NEXT_PUBLIC_API_BASE_URL ?? '', // Ganti dengan URL base API Anda
});
