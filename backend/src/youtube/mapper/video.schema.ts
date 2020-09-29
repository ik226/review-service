export type VideoPrimaryKey = {
  pk: string;
};

export type VideoRaw = {
  title: string,
  description: string,
  videoUrl: string,
  channelTitle: string,
  channelId: string,
  thumbnail: any,
  publishedAt: number,
} & VideoPrimaryKey;

