"use client";
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import InsightPanel from '@/components/InsightPanel';
import StatePanel from '@/components/StatePanel';
import CollectionPanel from '@/components/CollectionPanel';
import StatsStrip from '@/components/StatsStrip';

interface PlanResult {
  summary: string;
  items: Array<{ day: number; title: string; description: string }>; // simplified
  score: number;
}

type Status = 'idle' | 'loading' | 'error' | 'success';

export default function HomePage() {
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGenerate = async (query: string, preferences?: string) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const result = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, preferences })
      }).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      });
      setPlan(result);
      setStatus('success');
    } catch (e: any) {
      setErrorMsg(e.message || 'Something went wrong');
      setStatus('error');
    }
  };

  return (
    <main className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto">
      <StatsStrip />
      <Hero onGenerate={handleGenerate} />
      <StatePanel status={status} errorMessage={errorMsg} />
      {plan && <InsightPanel plan={plan} />}
      <CollectionPanel />
    </main>
  );
}
