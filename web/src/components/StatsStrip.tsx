"use client";
import React from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

export default function StatsStrip() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-2 px-4 bg-muted rounded">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>Partnered with Korea Tourism Organization</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Star className="w-4 h-4 text-warning" />
        <span>4.8★ rating from 10,000+ travelers</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Users className="w-4 h-4 text-accent" />
        <span>Curated by award‑winning Korean travel editors</span>
      </div>
    </div>
  );
}
