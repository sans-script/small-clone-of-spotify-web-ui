import { Artist, Track } from "@/lib/types";
import getAccessToken from "./getAccessToken";

export async function fetchArtist(id: string): Promise<Artist> {
    const token = await getAccessToken();
    
    // Verifica se o token é válido
    if (!token || typeof token !== 'string') {
        throw new Error('Invalid access token');
    }
    
    // Busca os detalhes do artista
    const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    
    // Verifica se a resposta foi bem-sucedida
    if (!artistRes.ok) {
        const errorData = await artistRes.json();
        throw new Error(`Failed to fetch artist: ${errorData.error.message}`);
    }
    
    const artistData = await artistRes.json();

    // Busca as top tracks do artista
    const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    
    // Verifica se a resposta foi bem-sucedida
    if (!tracksRes.ok) {
        const errorData = await tracksRes.json();
        throw new Error(`Failed to fetch top tracks: ${errorData.error.message}`);
    }
    
    const tracksData = await tracksRes.json();

    // Verifica se artistData e tracksData têm os dados necessários
    const imageUrl = artistData.images && artistData.images.length > 0 ? artistData.images[0].url : '';
    
    const topTracks: Track[] = tracksData.tracks.map((track: any) => ({
        name: track.name,
        albumName: track.album.name,
        previewUrl: track.preview_url,
        albumImageUrl: track.album.images.length > 0 ? track.album.images[0].url : '',
        id: track.id,
        duration: track.duration_ms,
    }));

    return {
        name: artistData.name,
        imageUrl: imageUrl,
        followers: artistData.followers.total,
        type: artistData.type,
        genres: artistData.genres,
        topTracks: topTracks,
    };
}
