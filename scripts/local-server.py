"""Local review only: explicit HTTP cache policy, no dependencies or remote bind."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import functools

class ReviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Revalidate the entry/identity and avoid old metadata-only 304 responses.
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        for name in ('If-Modified-Since', 'If-None-Match'):
            if name in self.headers:
                del self.headers[name]
        return super().send_head()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Shadow Becomes Me local review server')
    parser.add_argument('--port', type=int, default=8080)
    parser.add_argument('--directory', type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()
    handler = functools.partial(ReviewHandler, directory=str(args.directory.resolve()))
    print(f'Local review: http://127.0.0.1:{args.port}/ (Ctrl+C to stop)', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), handler).serve_forever()
