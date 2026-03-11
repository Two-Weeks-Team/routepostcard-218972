from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from routes import router
from models import Base, engine

app = FastAPI()

@app.middleware("http")
async def normalize_api_prefix(request: Request, call_next):
    if request.scope.get("path", "").startswith("/api/"):
        request.scope["path"] = request.scope["path"][4:] or "/"
    return await call_next(request)

app.include_router(router)

# Create tables if they don't exist
Base.metadata.create_all(engine)

@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    return """<!DOCTYPE html>
<html>
<head>
<title>RoutePostcard</title>
</head>
<body style=\"background:#111;color:#eee;font-family:Arial;padding:2rem;\">
<h1>RoutePostcard</h1>
<p>Turn a city brief into a cinematic, neighborhood‑by‑neighborhood travel postcard.</p>
<h2>API Endpoints</h2>
<ul>
<li>GET /health</li>
<li>POST /plan</li>
<li>POST /insights</li>
</ul>
<h2>Tech Stack</h2>
<ul>
<li>FastAPI 0.115.0</li>
<li>PostgreSQL via SQLAlchemy 2.0.35</li>
<li>DigitalOcean Serverless Inference (openai-gpt-oss-120b)</li>
</ul>
<p><a href=\"/docs\" style=\"color:#4af;\">Docs</a> | <a href=\"/redoc\" style=\"color:#4af;\">Redoc</a></p>
</body>
</html>"""
