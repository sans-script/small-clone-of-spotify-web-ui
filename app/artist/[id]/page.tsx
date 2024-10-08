"use client";

import { fetchArtist } from "@/lib/fetchArtist";
import { useEffect, useState } from "react";
import Image from "next/image";
import formatFollowers from "@/utils/formatFollowers";
import { Artist, Track } from "@/lib/types";
import formatDuration from "@/utils/formatDuration";
import { useAudio } from "@/context/AudioContext";

interface ArtistPageProps {
  params: {
    id: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  // const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTrackIndex, setHoveredTrackIndex] = useState<number | null>(
    null
  );
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const {
    audio,
    setAudio,
    playingTrackIndex,
    setPlayingTrackIndex,
    isPlaying,
    setIsPlaying,
    artist,
    setArtist,
    setCurrentTrack,
  } = useAudio();
  const { id } = params;

  useEffect(() => {
    const loadArtist = async () => {
      try {
        const artistData = await fetchArtist(id);
        setArtist(artistData);
        setLoading(false);
        setPlayingTrackIndex(null);
        // setIsPlaying(false);
        // setCurrentTrack(null);
      } catch (error) {
        console.error("Failed to fetch artist", error);
        setLoading(false);
      }
    };

    loadArtist();
  }, [id, setArtist, setPlayingTrackIndex, setIsPlaying, setCurrentTrack]);

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
      if (artist?.topTracks && artist.topTracks.length > 0) {
        setCurrentTrack(artist.topTracks[index]);
      } else {
        setCurrentTrack(null);
      }
    }

    console.log(artist);
  };

  if (loading) {
    return (
      <main
        className="w-full h-[80%] sm:h-[88%] z-50 rounded-lg ml-2 flex flex-col p-2 overflow-auto"
        style={{
          background:
            "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
        }}
      >
        <div className="relative w-full h-64">
          {/* Fallback para a imagem do artista */}
          <div className="absolute inset-0 flex flex-col justify-center items-start gap-2 p-4 z-10 bg-[#212121] rounded-lg">
            <div className="w-full h-full rounded-lg"></div>{" "}
            {/* Imagem de fundo */}
          </div>
          {/* Sobreposição */}
          <div className="absolute inset-0 flex flex-col justify-center items-start gap-2 p-4 z-10">
            <div className="w-full h-8 bg-[#434343] rounded"></div>{" "}
            {/* Fallback para seguidores */}
            <div className="w-full h-6 bg-[#434343] rounded mt-2"></div>{" "}
            {/* Fallback para gêneros */}
            <div className="w-1/2 h-12 bg-[#434343] rounded mt-2"></div>{" "}
            {/* Fallback para nome do artista */}
            <div className="w-1/3 h-4 bg-[#434343] rounded mt-2"></div>{" "}
            {/* Fallback para tipo */}
          </div>
        </div>

        <h2 className="text-white text-2xl p-4 font-bold">Popular</h2>

        <div className="flex flex-col gap-1 md:px-7 w-full h-20">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className={`flex justify-between items-center px-4 py-2 rounded-lg`}
              onMouseEnter={() => setHoveredTrackIndex(index)}
              onMouseLeave={() => setHoveredTrackIndex(null)}
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#212121] rounded-lg"></div>{" "}
                {/* Fallback para imagem do álbum */}
                <div className="w-32 h-6 bg-[#212121] rounded"></div>{" "}
                {/* Fallback para nome da faixa */}
              </div>
              <div className="w-16 h-4 bg-[#212121] rounded hidden sm:flex"></div>{" "}
              {/* Fallback para duração */}
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (!artist) {
    return (
      <main
        className="w-full h-[80%] sm:h-[88%] z-50 rounded-lg ml-2 flex flex-col items-center justify-center"
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
      className="w-full h-[80%] sm:h-[88%] z-50 rounded-lg ml-2 flex flex-col p-2 overflow-auto"
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
        <div className="absolute inset-0 flex flex-col justify-center items-start gap-2 p-4 z-10">
          <p className="text-white">
            {formatFollowers(artist.followers)} followers
          </p>
          <p className="text-white capitalize">{artist.genres.join(", ")}</p>
          <h1 className="text-white sm:text-6xl text-3xl font-bold">
            {artist.name}
          </h1>
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
