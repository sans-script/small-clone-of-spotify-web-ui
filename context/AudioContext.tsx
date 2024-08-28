"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchArtist } from "@/lib/fetchArtist";
import { Artist, Track } from "@/lib/types";

interface AudioContextProps {
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement | null) => void;
  playingTrackIndex: number | null;
  setPlayingTrackIndex: (index: number | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  artist: Artist | null;
  setArtist: (artist: Artist | null) => void;
  currentTrack: Track | null; // Adicione a faixa atual ao contexto
  setCurrentTrack: (track: Track | null) => void; // Função para atualizar a faixa atual
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
  const [artist, setArtist] = useState<Artist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null); // Adicione a faixa atual ao estado

  return (
    <AudioContext.Provider
      value={{
        audio,
        setAudio,
        playingTrackIndex,
        setPlayingTrackIndex,
        isPlaying,
        setIsPlaying,
        artist,
        setArtist,
        currentTrack,
        setCurrentTrack, // Exponha a função para atualizar a faixa atual
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
