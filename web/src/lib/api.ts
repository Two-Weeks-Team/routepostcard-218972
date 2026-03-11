export interface PlanPayload {
  query: string;
  preferences?: string;
}

export interface PlanResponse {
  summary: string;
  items: Array<{ day: number; title: string; description: string }>;
  score: number;
}

export async function fetchPlan(payload: PlanPayload): Promise<PlanResponse> {
  const resp = await fetch('/api/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(err || 'Failed to fetch plan');
  }
  return resp.json();
}

export interface InsightsPayload {
  selection: string;
  context?: string;
}

export interface InsightsResponse {
  insights: string[];
  next_actions: string[];
  highlights: string[];
}

export async function fetchInsights(payload: InsightsPayload): Promise<InsightsResponse> {
  const resp = await fetch('/api/insights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(err || 'Failed to fetch insights');
  }
  return resp.json();
}
