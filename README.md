## Spotify Music Player (Next.js)

This is a simple music player built with Next.js that showcases artist information and plays previews of popular tracks. It's a great example of how to build a music-oriented web app using Next.js and the Spotify API.

### Features

- **Artist Page:** Displays artist details like name, image, followers, genres, and a list of their popular tracks.
- **Track Previews:** Allows users to play short previews of tracks by clicking on them.
- **Side Navigation:** Provides a sidebar with a list of artists for quick navigation.

### Technologies

- **Next.js:**  A React framework for building server-rendered and statically generated websites and applications.
- **Spotify API:** Used to fetch artist and track information.
- **Context API:**  Used to manage the audio playback state.
- **Tailwind CSS:** For styling.

### Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/spotify-music-player.git
   ```
2. **Install Dependencies:**
   ```bash
   cd spotify-music-player
   npm install
   ```
3. **Create an Environment Variable File (.env):**
   ```bash
   touch .env
   ```
4. **Add Your Spotify API Credentials:**
   ```bash
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret
   ```
5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
6. **Access the Application:**
   Open `http://localhost:3000` in your web browser.

### Running the Application

Once the development server is running, you can explore the application. Navigate through the artists in the sidebar, and click on tracks to play their previews.

### Notes

- You'll need to create a Spotify Developer account and obtain API credentials to use this project.
- The application fetches a limited amount of data from the Spotify API to keep things simple. You can extend the project to include more features.