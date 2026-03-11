"use client";
import React from 'react';
import { MapPin, CloudRain, Image } from 'lucide-react';

type Plan = {
  summary: string;
  items: Array<{ day: number; title: string; description: string }>;
  score: number;
};

type Props = {
  plan: Plan;
};

export default function InsightPanel({ plan }: Props) {
  return (
    <section className="card">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Your 7‑Day Cinematic Itinerary</h2>
      <p className="mb-4 text-foreground">{plan.summary}</p>
      <div className="space-y-6">
        {plan.items.map(item => (
          <article key={item.day} className="relative p-4 border border-muted rounded-lg bg-card shadow-sm">
            {/* Day header with map pin */}
            <header className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-medium text-foreground">Day {item.day}: {item.title}</h3>
            </header>
            <p className="text-sm text-foreground mb-2">{item.description}</p>
            {/* Weather pivot badge mock */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1 text-xs text-foreground">
              <CloudRain className="w-4 h-4" />
              <span>Rain Forecast</span>
            </div>
            {/* Moodboard collage placeholder */}
            <div className="mt-3 grid grid-cols-3 gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded" />
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 text-sm text-success">
        AI Confidence: {Math.round(plan.score * 100)}%
      </div>
    </section>
  );
}
