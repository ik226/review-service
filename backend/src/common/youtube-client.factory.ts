import { google, youtube_v3 } from 'googleapis';

const GOOGLE_API_KEY = 'AIzaSyDYvgli7whzQ2g2CoJ3_iiGOjGoKo1z_P0';

export const youtubeClientFactory = (): youtube_v3.Youtube => {
  return google.youtube({
    version: 'v3',
    auth: GOOGLE_API_KEY,
  });
};
