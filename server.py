from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os
PORT = int(os.environ.get("PORT", "8000"))
host = "0.0.0.0"
print(f"Server running on http://localhost:{PORT}")
ThreadingHTTPServer((host, PORT), SimpleHTTPRequestHandler).serve_forever()
