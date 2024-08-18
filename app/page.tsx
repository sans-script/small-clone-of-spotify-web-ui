"use client";

import { fetchArtist } from "@/lib/fetchArtist";
import { useEffect, useState } from "react";
import Image from "next/image";
import formatFollowers from "@/utils/formatFollowers";
import { Artist } from "@/lib/types";
import formatDuration from "@/utils/formatDuration";

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

  const { id } = params;

  useEffect(() => {
    const loadArtist = async () => {
      const artistData = await fetchArtist("5XKFrudbV4IiuE5WuTPRmT");
      setArtist(artistData);
      setLoading(false);
    };

    loadArtist();
  }, []);

  if (loading) {
    return (
      <main
        className="w-full h-full rounded-lg ml-2 flex flex-col p-2"
        style={{
          background:
            "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
        }}
      >
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
      className="w-full h-full rounded-lg ml-2 flex flex-col p-2 overflow-auto items-center justify-center"
      style={{
        background:
          "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
      }}
    >
      <div className="flex bg-[#5b5657] w-60 rounded-md gap-2">
        
        <div className="relative w-14 h-14">
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            layout="fill"
            objectFit="cover"
            className="rounded-s-md"
          />
        </div>

        <div className="flex items-center justify-center">
          <h1 className="text-white text-[14px] font-bold w-24">{artist.name} Mix</h1>
        </div>

      </div>
    </main>
  );
}
