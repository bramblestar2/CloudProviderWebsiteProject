# Setup with CADDY

caddy run --config /path/to/folder --adapter caddyfile



idk
```dockerfile
# from repo root
docker build -t yourdockerhubusername/static-site:latest .

# (optional) run locally for a quick smoke test
docker run -d --name static-site-test -p 8080:80 yourdockerhubusername/static-site:latest
curl -v http://127.0.0.1:8080/    # check it serves pages
docker rm -f static-site-test
```