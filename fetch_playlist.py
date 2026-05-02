import urllib.request
import re
try:
    rss_url = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PL2k6tNcT7AEk4oWXkzD5qm6AxOTP1MWfc'
    rss = urllib.request.urlopen(rss_url).read().decode('utf-8')
    
    videos = re.findall(r'<title>(.*?)</title>.*?<yt:videoId>(.*?)</yt:videoId>', rss, re.DOTALL)
    with open('playlist_output.txt', 'w', encoding='utf-8') as f:
        for title, vid in videos:
            # Strip some xml artifacts if needed, but simple regex should be fine
            f.write(f'{{"title": "{title}", "id": "{vid}"}},\n')
except Exception as e:
    with open('playlist_output.txt', 'w') as f:
        f.write("Error: " + str(e))
