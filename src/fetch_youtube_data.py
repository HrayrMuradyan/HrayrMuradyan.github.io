import os
import json
import requests

API_KEY = os.environ.get("YOUTUBE_API_KEY")
CHANNEL_ID = os.environ.get("CHANNEL_ID")

def fetch_channel_data():
    # Get channel statistics
    url = f"https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id={CHANNEL_ID}&key={API_KEY}"
    res = requests.get(url)
    data = res.json()

    # Channel details
    info = {
        "title": data["items"][0]["snippet"]["title"],
        "description": data["items"][0]["snippet"]["description"],
        "thumbnail": data["items"][0]["snippet"]["thumbnails"]["high"]["url"],
        "subscribers": data["items"][0]["statistics"]["subscriberCount"],
        "views": data["items"][0]["statistics"]["viewCount"],
        "videos": data["items"][0]["statistics"]["videoCount"],
        "total_likes": 0  
    }
    return info

def fetch_video_stats(video_id):
    """Fetch individual video statistics (likes, views)."""
    stats_url = f"https://www.googleapis.com/youtube/v3/videos?part=statistics&id={video_id}&key={API_KEY}"
    stats_res = requests.get(stats_url).json()
    if "items" in stats_res and len(stats_res["items"]) > 0:
        stats = stats_res["items"][0]["statistics"]
        return {
            "likes": int(stats.get("likeCount", 0)),
            "views": int(stats.get("viewCount", 0))
        }
    return {"likes": 0, "views": 0}

def fetch_video_data():
    # Get uploads playlist ID
    playlist_url = f"https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id={CHANNEL_ID}&key={API_KEY}"
    playlist_res = requests.get(playlist_url)
    uploads_playlist = playlist_res.json()["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    videos = []
    nextPageToken = ""
    while True:
        video_url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={uploads_playlist}&maxResults=10&pageToken={nextPageToken}&key={API_KEY}"
        r = requests.get(video_url).json()
        for item in r["items"]:
            snippet = item["snippet"]
            video_id = snippet["resourceId"]["videoId"]
            
            # Fetch video stats (likes, views)
            stats = fetch_video_stats(video_id)
            
            videos.append({
                "title": snippet["title"],
                "description": snippet["description"],
                "thumbnail": snippet["thumbnails"]["medium"]["url"],
                "videoId": video_id,
                "publishedAt": snippet["publishedAt"],
                "likes": stats["likes"],
                "views": stats["views"]
            })
        nextPageToken = r.get("nextPageToken")
        if not nextPageToken:
            break
    return videos

def save_data():
    output_dir = "./youtube_data"
    os.makedirs(output_dir, exist_ok=True)

    # Fetch channel data and video data
    channel_data = fetch_channel_data()
    videos_data = fetch_video_data()

    # Calculate the total number of likes
    total_likes = sum(video["likes"] for video in videos_data)
    
    # Update the channel data with the total likes
    channel_data["total_likes"] = total_likes

    # Save the data to a file
    data = {
        "channel": channel_data,
        "videos": videos_data
    }

    with open(f"{output_dir}/channel_data.json", "w") as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    save_data()