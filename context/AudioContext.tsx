"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextProps {
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement | null) => void;
  playingTrackIndex: number | null;
  setPlayingTrackIndex: (index: number | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playingTrackIndex, setPlayingTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioContext.Provider
      value={{ audio, setAudio, playingTrackIndex, setPlayingTrackIndex, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
};
