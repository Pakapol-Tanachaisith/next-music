"use client";

import { Song } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import { useGlobalAudioPlayer, AudioPlayer } from "react-use-audio-player";

interface PlayerContextStore extends AudioPlayer {
  songs: Song[];
  currentSong: Song;
  loadSongs: (track: Song | Song[]) => void;
  nextSong: () => void;
}

export const PlayerContext = createContext<PlayerContextStore>(null!);

export const PlayerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const globalAudioPlayer = useGlobalAudioPlayer();

  const [songs, setSongs] = useState<Song[]>([]);
  const [songIndex, setSongIndex] = useState(0);

  const currentSong = songs[songIndex];

  const loadSongs = (track: Song | Song[]) => {
    if (Array.isArray(track)) {
      setSongs(track);
    } else {
      setSongs([track]);
    }
  };

  const nextSong = () => {
    let newIndex = songIndex + 1;
    if (newIndex > songs.length - 1) {
      newIndex = 0;
    }
    setSongIndex(newIndex);
  };

  useEffect(() => {
    if (currentSong) {
      globalAudioPlayer.load(currentSong.audioUrl, {
        onend: () => nextSong(),
      });
    }
  }, [globalAudioPlayer.load, songs, songIndex]);

  return (
    <PlayerContext.Provider
      value={{ songs, currentSong, loadSongs, nextSong, ...globalAudioPlayer }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
