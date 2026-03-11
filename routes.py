from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Any
from models import SessionLocal
from ai_service import call_inference

router = APIRouter()

# ---------- Pydantic Schemas ----------
class PlanRequest(BaseModel):
    query: str = Field(..., description="City brief, e.g., '7‑day food & culture tour in Seoul'")
    preferences: Optional[str] = Field(None, description="Optional style or weather preferences")

class PlanResponse(BaseModel):
    summary: str
    items: List[Any]
    score: float

class InsightsRequest(BaseModel):
    selection: str = Field(..., description="User's selected day‑card or attraction identifier")
    context: Optional[str] = Field(None, description="Additional context for generating insights")

class InsightsResponse(BaseModel):
    insights: List[str]
    next_actions: List[str]
    highlights: List[str]

# ---------- Helper ----------
def _get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- Endpoints ----------
@router.post("/plan", response_model=PlanResponse)
async def generate_plan(req: PlanRequest) -> PlanResponse:
    system_prompt = (
        "You are an expert travel storyboard generator for South Korean cities. "
        "Create a concise summary, a list of day‑card items, and a confidence score (0‑100). "
        "Return JSON only."
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Brief: {req.query}\nPreferences: {req.preferences or ''}"}
    ]
    raw = await call_inference(messages)
    # Expected keys: summary, items, score
    try:
        summary = raw.get("summary", "")
        items = raw.get("items", [])
        score = float(raw.get("score", 0))
    except Exception:
        raise HTTPException(status_code=502, detail="Invalid AI response format")
    return PlanResponse(summary=summary, items=items, score=score)

@router.post("/insights", response_model=InsightsResponse)
async def generate_insights(req: InsightsRequest) -> InsightsResponse:
    system_prompt = (
        "You are a travel insights specialist. Given a user selection and optional context, "
        "provide three insightful bullet points, three suggested next actions, and highlight key attractions. "
        "Return JSON only."
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Selection: {req.selection}\nContext: {req.context or ''}"}
    ]
    raw = await call_inference(messages)
    try:
        insights = raw.get("insights", [])
        next_actions = raw.get("next_actions", [])
        highlights = raw.get("highlights", [])
    except Exception:
        raise HTTPException(status_code=502, detail="Invalid AI response format")
    return InsightsResponse(insights=insights, next_actions=next_actions, highlights=highlights)
