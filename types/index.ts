import { Song, Playlist as PlaylistType } from "@prisma/client";

export type Playlist = PlaylistType & {
  songs: Song[];
};
