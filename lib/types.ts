export interface Track {
    id: string;
    name: string;
    albumName: string;
    previewUrl: string;
    albumImageUrl: string;
    duration: number;
  }
  
  export interface Artist {
    name: string;
    imageUrl: string;
    followers: number;
    type: string;
    genres: string[];
    topTracks?: Track[]; 
  }
  