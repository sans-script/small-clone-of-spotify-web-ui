"use client";

import { useAudio } from "@/context/AudioContext";
import { fetchArtist } from "@/lib/fetchArtist";
import { Artist } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function AudioControl() {
  // const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const {
    audio,
    playingTrackIndex,
    isPlaying,
    setAudio,
    setPlayingTrackIndex,
    setIsPlaying,
    artist,
    currentTrack,
    setCurrentTrack,
  } = useAudio();

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      setPlaybackPosition(audio.currentTime);
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = playbackPosition;
      audio.play();
      setIsPlaying(true);
    }
    console.log(artist, currentTrack);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full h-[15%] bg-black p-6 flex items-center justify-center">
      {/* Informações da faixa atual */}
      <div className="flex items-center justify-center gap-2 absolute left-5">
        {currentTrack ? (
          <>
            <div className="flex w-14 h-14 rounded-md">
              <Image
                src={currentTrack.albumImageUrl}
                alt="Current Track"
                width={100}
                height={100}
                objectFit="cover"
                className="rounded-md w-14 h-14"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="scroll-container">
                <span className="text-white scroll-animation">
                  {currentTrack.name}
                </span>
              </div>
              <span className="text-white text-sm w-[200px] truncate">
                {currentTrack.albumName}
              </span>
            </div>
          </>
        ) : (
          <div className="text-white"></div>
        )}
      </div>
      {/* Controles */}
      <div className="flex flex-col gap-4 w-96 items-center justify-center absolute">
        <div className="flex gap-4">
          <button className="w-10 h-10 flex items-center justify-center">
            <svg
              viewBox="0 0 16 16"
              className="fill-gray-400 w-5 h-5 hover:fill-white transition-all"
            >
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
            </svg>
          </button>

          <button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="fill-black w-6 h-6">
              <path
                d={
                  isPlaying
                    ? "M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
                    : "m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                }
              ></path>
            </svg>
          </button>

          <button
            className="w-10 h-10 flex items-center justify-center"
            onClick={() => {
              if (artist?.topTracks && artist.topTracks.length > 0) {
                setCurrentTrack(artist.topTracks[2]);
              } else {
                setCurrentTrack(null);
              }
            }}
          >
            <svg
              viewBox="0 0 16 16"
              className="fill-gray-400 w-5 h-5 hover:fill-white transition-all"
            >
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="w-96"></div>
    </div>
  );
}

export default AudioControl;
