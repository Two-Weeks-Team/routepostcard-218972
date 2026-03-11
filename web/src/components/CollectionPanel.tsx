"use client";
import React, { useEffect, useState } from 'react';
import { BookOpen, Save } from 'lucide-react';

type Itinerary = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export default function CollectionPanel() {
  const [saved, setSaved] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder fetch – in a real app this would hit /api/itineraries
  useEffect(() => {
    // Simulate async load
    setTimeout(() => {
      setSaved([
        { id: '1', title: 'Seoul Food & Culture', thumbnailUrl: '' },
        { id: '2', title: 'Busan Beach Escape', thumbnailUrl: '' }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-primary">
        <BookOpen className="animate-pulse w-5 h-5" />
        <span>Loading saved itineraries…</span>
      </div>
    );
  }

  if (saved.length === 0) {
    return (
      <div className="text-muted">You have no saved itineraries yet. Generate one above and save it!</div>
    );
  }

  return (
    <section className="card">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
        <Save className="w-5 h-5" /> Saved Itineraries
      </h2>
      <div className="flex overflow-x-auto gap-4 py-2">
        {saved.map(it => (
          <div key={it.id} className="min-w-[150px] h-[200px] bg-card rounded shadow-sm flex flex-col items-center justify-center p-2">
            {/* Thumbnail placeholder */}
            <div className="w-full h-32 bg-muted rounded mb-2" />
            <span className="text-center text-sm font-medium text-foreground">{it.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
