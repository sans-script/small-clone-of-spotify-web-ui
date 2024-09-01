"use client";

import { fetchArtist } from "@/lib/fetchArtist";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Artist } from "@/lib/types";
import artistIds from "@/data/ArtistIds";
import Link from "next/link";


export default function HomePage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      const artistPromises = artistIds.map((id) => fetchArtist(id));
      const artistsData = await Promise.all(artistPromises);
      setArtists(artistsData);
      setLoading(false);
    };

    loadArtists();
  }, []);
  if (loading) {
    return (
      <main
        className="w-full h-[88%] z-50 rounded-lg ml-2 flex flex-col p-2"
        style={{
          background:
            "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
        }}
      >
        <div className="flex justify-center items-center h-full">
          <p className="text-lg text-white">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="w-full h-[88%] z-50 rounded-lg ml-2 flex flex-col  overflow-y-hidden"
      style={{
        background:
          "linear-gradient(349deg, rgba(18, 18, 18, 1) 0%, rgba(33, 33, 33, 1) 100%)",
      }}
    >
      <h1 className="text-white text-4xl font-bold pb-4 p-2">For You</h1>

      <div className="relative flex w-full overflow-auto gap-4">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="group relative flex rounded-md gap-2 items-end justify-end"
          >
            <div className="relative w-40 h-40 mx-2">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="absolute m-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={`/artist/${artistIds[index]}`}>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-xl shadow-black transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="fill-black w-6 h-6"
                  >
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
