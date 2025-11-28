import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import json
from collections import deque

class UniversityCrawler:
    def __init__(self, start_url, output_file="data.jsonl", max_pages=100):
        self.start_url = start_url
        self.output_file = output_file
        self.max_pages = max_pages
        self.visited = set()
        self.queue = deque([start_url])
        self.domain = urlparse(start_url).netloc
        
        # Identity - crucial so they know who to contact if you break something
        self.headers = {
            'User-Agent': 'StudentBot/1.0 (Research Project; contact@student.uni-hildesheim.de)'
        }

    def is_valid_url(self, url):
        """Check if URL is internal and not a file download."""
        parsed = urlparse(url)
        is_internal = parsed.netloc == self.domain or parsed.netloc.endswith("uni-hildesheim.de")
        
        # Skip binary files that crash text parsers
        is_safe_file = not any(url.lower().endswith(ext) for ext in 
                             ['.pdf', '.jpg', '.png', '.zip', '.docx', '.mp4'])
        
        return is_internal and is_safe_file and url not in self.visited

    def clean_text(self, soup):
        """Extract readable text, removing scripts and styles."""
        for script in soup(["script", "style", "nav", "footer"]):
            script.extract()
        return " ".join(soup.get_text(separator=" ").split())

    def save_data(self, url, title, text):
        """Append data to the single file."""
        entry = {
            "url": url,
            "title": title,
            "content": text
        }
        with open(self.output_file, 'a', encoding='utf-8') as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    def crawl(self):
        print(f"Starting crawl. Saving to {self.output_file}...")
        count = 0

        while self.queue and count < self.max_pages:
            url = self.queue.popleft()
            
            if url in self.visited:
                continue

            try:
                print(f"[{count+1}/{self.max_pages}] Scraping: {url}")
                response = requests.get(url, headers=self.headers, timeout=10)
                
                if response.status_code == 200 and 'text/html' in response.headers.get('Content-Type', ''):
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # 1. Extract Data
                    title = soup.title.string if soup.title else "No Title"
                    text = self.clean_text(soup)
                    
                    # 2. Save to File
                    self.save_data(url, title, text)
                    
                    # 3. Find new links
                    for link in soup.find_all('a', href=True):
                        absolute_link = urljoin(url, link['href'])
                        # Remove fragments (#section) to avoid duplicates
                        absolute_link = absolute_link.split('#')[0]
                        
                        if self.is_valid_url(absolute_link):
                            self.queue.append(absolute_link)
                    
                    count += 1
                
                self.visited.add(url)
                # Polite delay to avoid IP ban
                time.sleep(1) 

            except Exception as e:
                print(f"Error scraping {url}: {e}")

        print(f"\nDone! Scraped {count} pages. Data saved to '{self.output_file}'.")

if __name__ == "__main__":
    # You can change the start URL to specific sections (e.g., the Course Catalogue)
    crawler = UniversityCrawler(
        start_url="https://www.uni-hildesheim.de/",
        output_file="data.jsonl",
        max_pages=500  # Increase this if you really want "everything"
    )
    crawler.crawl()