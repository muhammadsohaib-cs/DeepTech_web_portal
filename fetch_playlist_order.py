import urllib.request
import re
try:
    url = 'https://www.youtube.com/playlist?list=PL2k6tNcT7AEk4oWXkzD5qm6AxOTP1MWfc'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract video data from ytInitialData
    data_match = re.search(r'var ytInitialData = ({.*?});</script>', html)
    if data_match:
        import json
        data = json.loads(data_match.group(1))
        tabs = data['contents']['twoColumnBrowseResultsRenderer']['tabs']
        playlist_video_list = tabs[0]['tabRenderer']['content']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['playlistVideoListRenderer']['contents']
        
        with open('playlist_order.txt', 'w', encoding='utf-8') as f:
            for item in playlist_video_list:
                if 'playlistVideoRenderer' in item:
                    vid = item['playlistVideoRenderer']['videoId']
                    title = item['playlistVideoRenderer']['title']['runs'][0]['text']
                    f.write(f'{{"title": "{title}", "id": "{vid}"}},\n')
except Exception as e:
    with open('playlist_order.txt', 'w') as f:
        f.write("Error: " + str(e))
