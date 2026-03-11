"use client";
import React, { useState } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import { Loader2 } from 'lucide-react';

const titleFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-title'
});
const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body'
});

type Props = {
  onGenerate: (query: string, preferences?: string) => Promise<void>;
};

export default function Hero({ onGenerate }: Props) {
  const [query, setQuery] = useState('');
  const [preferences, setPreferences] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmitting(true);
    try {
      await onGenerate(query, preferences);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`card ${titleFont.variable} ${bodyFont.variable} flex flex-col gap-6`}>
      <h1 className="text-4xl md:text-5xl font-bold text-primary">Turn a city brief into a cinematic travel postcard</h1>
      <p className="text-lg text-foreground">
        Enter your travel vibe and let our AI craft a neighborhood‑by‑neighborhood storyboard with weather‑aware pivots.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="City Brief (e.g., “7‑day food & culture tour in Seoul”)"
          className="border border-border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          required
        />
        <input
          type="text"
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
          placeholder="Style & Weather Preferences (optional)"
          className="border border-border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={submitting}
          className="self-start bg-primary text-card font-medium py-2 px-4 rounded hover:bg-primary/90 transition flex items-center gap-2"
        >
          {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : null}
          {submitting ? 'Generating...' : 'Generate Storyboard'}
        </button>
      </form>
    </section>
  );
}
