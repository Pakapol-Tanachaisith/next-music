"use client";

import useAudioTime from "@/hooks/use-audio-time";
import { Song } from "@prisma/client";
import { createContext, useEffect, useMemo, useState } from "react";
import { useGlobalAudioPlayer, AudioPlayer } from "react-use-audio-player";

interface PlayerContextStore extends AudioPlayer {
  songs: Song[];
  currentSong: Song;
  pos: number;
  loadSongs: (track: Song | Song[]) => void;
  nextSong: () => void;
  prevSong: () => void;
  resetPlayer: () => void;
}

export const PlayerContext = createContext<PlayerContextStore>(null!);

export const PlayerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const globalAudioPlayer = useGlobalAudioPlayer();
  const pos = useAudioTime();

  const [songs, setSongs] = useState<Song[]>([]);
  const [songIndex, setSongIndex] = useState(0);

  const loadSongs = (track: Song | Song[]) => {
    if (Array.isArray(track)) {
      setSongs(track);
    } else {
      setSongs([track]);
    }
    setSongIndex(0);
  };

  const nextSong = () => {
    let newIndex = songIndex + 1;
    if (newIndex > songs.length - 1) {
      newIndex = 0;
    }
    setSongIndex(newIndex);
  };

  const prevSong = () => {
    let newIndex = songIndex - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    }
    setSongIndex(newIndex);
  };

  const resetPlayer = () => {
    globalAudioPlayer.stop();
    setSongs([]);
    setSongIndex(0);
  };

  const currentSong = useMemo(() => songs[songIndex], [songs, songIndex]);

  useEffect(() => {
    if (currentSong) {
      globalAudioPlayer.load(currentSong.audioUrl, {
        onend: () => nextSong(),
        autoplay: true,
        html5: true,
        loop: songs.length === 1 ? true : false,
      });
    }
  }, [globalAudioPlayer.load, currentSong, songs]);

  return (
    <PlayerContext.Provider
      value={{
        songs,
        currentSong,
        pos,
        loadSongs,
        nextSong,
        prevSong,
        resetPlayer,
        ...globalAudioPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
