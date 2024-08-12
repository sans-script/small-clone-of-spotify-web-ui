import { Artist, Track } from "@/lib/types";

async function getAccessToken(): Promise<string> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token;
}

export async function fetchArtist(id: string): Promise<Artist> {
    const token = await getAccessToken();

    // Busca os detalhes do artista
    const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    const artistData = await artistRes.json();

    // Busca as top tracks do artista
    const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    const tracksData = await tracksRes.json();
    console.log(tracksData)

    // Verifica se data.images existe e tem a propriedade length
    const imageUrl = artistData.images && artistData.images.length > 0 ? artistData.images[0].url : '';

    // Mapeia as top tracks
    const topTracks: Track[] = tracksData.tracks.map((track: any) => ({
        name: track.name,
        albumName: track.album.name,
        previewUrl: track.preview_url,
        albumImageUrl: track.album.images.length > 0 ? track.album.images[0].url : '',
        id: track.id,
        duration: track.duration_ms,
    }));
    console.log(topTracks)
    



    
    

    return {
        name: artistData.name,
        imageUrl: imageUrl,
        followers: artistData.followers.total,
        type: artistData.type,
        genres: artistData.genres,
        topTracks: topTracks,
    };
    
}


