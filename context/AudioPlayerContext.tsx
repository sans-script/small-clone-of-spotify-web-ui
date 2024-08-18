"use client"

import React, { createContext, useContext, useState } from 'react';

interface AudioPlayerContextType {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  playingTrackIndex: number | null;
  playbackPosition: number;
  play: (trackPreviewUrl: string, index: number) => void;
  pause: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTrackIndex, setPlayingTrackIndex] = useState<number | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);

  const play = (trackPreviewUrl: string, index: number) => {
    if (playingTrackIndex === index && audio) {
      if (isPlaying) {
        setPlaybackPosition(audio.currentTime);
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.currentTime = playbackPosition;
        audio.play();
        setIsPlaying(true);
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(trackPreviewUrl);
      setAudio(newAudio);
      setPlayingTrackIndex(index);
      setPlaybackPosition(0);
      newAudio.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audio) {
      setPlaybackPosition(audio.currentTime);
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{ audio, isPlaying, playingTrackIndex, playbackPosition, play, pause }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
