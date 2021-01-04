import axios from 'axios';

const createService = endpoint => axios.create({ baseURL: endpoint, headers: { ContentType: 'application/json' } });

// eslint-disable-next-line import/prefer-default-export
export const weatherService = createService('/api/weather');
