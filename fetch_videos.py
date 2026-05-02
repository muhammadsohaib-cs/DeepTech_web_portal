import urllib.request
import re
try:
    html = urllib.request.urlopen('https://www.youtube.com/watch?v=kNwtu95df3I').read().decode('utf-8')
    match = re.search(r'"channelId":"([^"]+)"', html)
    if match:
        channel_id = match.group(1)
        print("Channel ID:", channel_id)
        
        # Get rss feed
        rss_url = f'https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}'
        rss = urllib.request.urlopen(rss_url).read().decode('utf-8')
        
        # Find all videos in RSS
        videos = re.findall(r'<title>(.*?)</title>.*?<yt:videoId>(.*?)</yt:videoId>', rss, re.DOTALL)
        for title, vid in videos:
            print(f"Video: {vid} - {title}")
except Exception as e:
    print(e)
