"use client";

import { fetchArtist } from "@/lib/fetchArtist";
import { useEffect, useState } from "react";
import Image from "next/image";
import formatFollowers from "@/utils/formatFollowers";
import { Artist } from "@/lib/types";
import formatDuration from "@/utils/formatDuration";
import { useAudio } from "@/context/AudioContext";

interface ArtistPageProps {
  params: {
    id: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTrackIndex, setHoveredTrackIndex] = useState<number | null>(
    null
  );
  // const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  // const [playingTrackIndex, setPlayingTrackIndex] = useState<number | null>(
  //   null
  // );
  // const [isPlaying, setIsPlaying] = useState(false);
  
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const { audio, setAudio, playingTrackIndex, setPlayingTrackIndex, isPlaying, setIsPlaying } = useAudio();
  const { id } = params;

  useEffect(() => {
    const loadArtist = async () => {
      if (id) {
        const artistData = await fetchArtist(id);
        setArtist(artistData);
        setLoading(false);
        setPlayingTrackIndex(null)
        setIsPlaying(false)
      }
    };

    loadArtist();
  }, [id]);

  // const handlePlayPause = (trackPreviewUrl: string, index: number) => {
  //   if (playingTrackIndex === index && audio) {
  //     if (isPlaying) {
  //       setPlaybackPosition(audio.currentTime);
  //       audio.pause();
  //       setIsPlaying(false);
  //     } else {
  //       audio.currentTime = playbackPosition;
  //       audio.play();
  //       setIsPlaying(true);
  //     }
  //   } else {
  //     if (audio) {
  //       audio.pause();
  //     }
  //     const newAudio = new Audio(trackPreviewUrl);
  //     setAudio(newAudio);
  //     setPlayingTrackIndex(index);
  //     setPlaybackPosition(0);
  //     newAudio.play();
  //     setIsPlaying(true);
  //   }
  // };


  const handlePlayPause = (trackPreviewUrl: string, index: number) => {
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

  if (loading) {
    return (
      <main
        className="w-full h-full rounded-lg ml-2 flex flex-col p-2"
        style={{
          background:
            "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
        }}
      >
        <div className="relative w-full h-64 bg-[#212121] rounded-lg"></div>
      </main>
    );
  }

  if (!artist) {
    return (
      <main
        className="w-full h-full rounded-lg ml-2 flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
        }}
      >
        <div>Artist not found</div>
      </main>
    );
  }

  return (
    <main
      className="w-full h-[85%] rounded-lg ml-2 flex flex-col p-2 overflow-auto"
      style={{
        background:
          "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
      }}
    >
      <div className="relative w-full h-64">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4 z-10">
          <p className="text-white">
            {formatFollowers(artist.followers)} followers
          </p>
          <p className="text-white capitalize">{artist.genres.join(", ")}</p>
          <h1 className="text-white sm:text-7xl text-5xl font-bold truncate">{artist.name}</h1>
          <p className="text-gray-400 capitalize">{artist.type}</p>
        </div>
      </div>

      <h2 className="text-white text-2xl p-4 font-bold">Popular</h2>

      <div className="flex flex-col gap-1 md:px-7 w-full h-20">
        {artist.topTracks?.map((track, index) => (
          <div
            className={`flex justify-between items-center ${
              hoveredTrackIndex === index ||
              (isPlaying && playingTrackIndex === index)
                ? "bg-[#2E2E2E]"
                : ""
            } px-4 py-2 rounded-lg`}
            onMouseEnter={() => setHoveredTrackIndex(index)}
            onMouseLeave={() => setHoveredTrackIndex(null)}
          >
            <div className="flex gap-4 items-center">
              {hoveredTrackIndex === index ||
              (isPlaying && playingTrackIndex === index) ? (
                <div>
                  {isPlaying && playingTrackIndex === index ? (
                    <button
                      className="flex items-center justify-center cursor-pointer"
                      onClick={() => handlePlayPause(track.previewUrl, index)}
                    >
                      <svg
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="fill-white w-5 h-5"
                      >
                        <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center cursor-pointer"
                      onClick={() => handlePlayPause(track.previewUrl, index)}
                    >
                      <svg
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="fill-white w-5 h-5"
                      >
                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <h1 className="text-gray-400 w-5 h-full text-xl flex items-center justify-center">
                  {index + 1}
                </h1>
              )}
              <div
                className="w-10 h-10 bg-white rounded-lg"
                style={{
                  backgroundImage: `url(${track.albumImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h1 className="text-white truncate w-20 sm:w-auto sm:whitespace-normal sm:overflow-visible sm:truncate-none">
                {track.name}
              </h1>
            </div>
            <h1 className="text-gray-400 hidden sm:flex">
              {formatDuration(track.duration)}
            </h1>
          </div>
        ))}
      </div>
    </main>
  );
}
