"use client";

import { fetchArtist } from "@/lib/fetchArtist";
import formatFollowers from "@/utils/formatFollowers";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import artistIds from "@/data/ArtistIds";
import { Artist } from "@/lib/types";

function SideBar() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  async function fetchArtists(artistIds: string[]): Promise<any[]> {
    const artistPromises = artistIds.map((id) => fetchArtist(id)); // Passa o ID para fetchArtist
    return Promise.all(artistPromises);
  }

  useEffect(() => {
    const loadArtist = async () => {
      const artistData = await fetchArtists(artistIds);
      setLoading(false);
      setArtists(artistData);
    };

    loadArtist();
  }, [artistIds]);

  return (
    <aside className="flex flex-col w-[90px] h-[88%] z-50 gap-2">
      <div
        className="w-full h-32 gap-2 rounded-lg"
        style={{
          background: "rgba(18, 18, 18, 1)",
        }}
      >
        <ul className="px-2 py-3 w-full h-full flex flex-col items-center justify-center gap-2">
          <li className="p-2 cursor-pointer">
          <Link href={"/"}>
            <svg
              className="fill-gray-400 hover:fill-white w-7 h-7"
              viewBox="0 0 24 24"
            >
              <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
            </svg>
            </Link>
          </li>
          <li className="p-2 cursor-pointer">
            <svg
              className="fill-gray-400 hover:fill-white w-7 h-7"
              viewBox="0 0 24 24"
            >
              <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
            </svg>
          </li>
        </ul>
      </div>

      <div
        className="w-full h-full gap-2 rounded-lg overflow-auto"
        style={{
          background: "rgba(18, 18, 18, 1)",
        }}
      >
        <ul className="w-full h-full flex flex-col items-center justify-start p-2 overflow-auto">
          {loading
            ? Array.from({ length: artistIds.length }, (_, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-md"
                >
                  <Tooltip
                    content={
                      <div className="px-2 py-3 bg-[hsl(0,0%,10%)] rounded-lg">
                        Carregando...
                      </div>
                    }
                    placement="left"
                    className="text-white"
                    offset={14}
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-md">
                      <div className="w-12 h-12 bg-[#1D1D1D] rounded-md"></div>
                    </div>
                  </Tooltip>
                </li>
              ))
            : artists.map((artist, index) => (
                <li key={artist.name} className="cursor-pointer">
                  <Tooltip
                    content={
                      <div className="px-2 py-3 bg-[hsl(0,0%,10%)] rounded-lg cursor-pointer">
                        <div className="flex gap-2">
                          <span className="text-small font-bold">
                            {artist.name} • {formatFollowers(artist.followers)}{" "}
                            Followers on Spotify
                          </span>
                        </div>
                        <div className="capitalize text-tiny text-[#5A5A5A] font-[500]">
                          {artist.type}
                        </div>
                      </div>
                    }
                    placement="left"
                    className="text-white"
                    offset={14}
                  >
                    <Link href={`/artist/${artistIds[index]}`}>
                      <div className="flex items-center justify-center w-16 h-16 rounded-md">
                        {!artist.imageUrl ? (
                          <div className="w-12 h-12 bg-[#1D1D1D] rounded-md"></div>
                        ) : (
                          <div className="flex items-center justify-center w-16 h-16 text-white rounded-md hover:bg-[#1D1D1D]">
                            <Image
                              src={artist.imageUrl}
                              alt={artist.name}
                              width={1000}
                              height={1000}
                              className="w-12 h-12 rounded-md"
                            />
                          </div>

                        )}
                      </div>
                    </Link>
                  </Tooltip>
                </li>
              ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
