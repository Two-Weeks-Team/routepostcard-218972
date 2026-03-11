import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import declarative_base, sessionmaker

# Resolve DATABASE_URL with fallback and scheme fixes
raw_url = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL") or "sqlite:///./app.db"
if raw_url.startswith("postgresql+asyncpg://"):
    raw_url = raw_url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
elif raw_url.startswith("postgres://"):
    raw_url = raw_url.replace("postgres://", "postgresql+psycopg://")

# Determine if SSL is needed (non‑localhost and not SQLite)
connect_args = {}
if not raw_url.startswith("sqlite") and "localhost" not in raw_url and "127.0.0.1" not in raw_url:
    connect_args["sslmode"] = "require"

engine = create_engine(raw_url, connect_args=connect_args, future=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

class SavedPlan(Base):
    __tablename__ = "rp_saved_plan"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=True)
    city = Column(String, nullable=False)
    brief = Column(Text, nullable=False)
    storyboard_json = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
