// fetchTopVideos.js
export async function fetchTopYouTubeVideos(course) {
  const API_KEY = "YOUR_YOUTUBE_API_KEY";  // 🔑 Replace with your API key
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(course + " course")}&key=${API_KEY}`
  );
  const data = await response.json();

  return data.items.map((item) => ({
    title: item.snippet.title,
    link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    source: "YouTube (Top Video)"
  }));
}
