"use client";
import React from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

type Props = {
  status: 'idle' | 'loading' | 'error' | 'success';
  errorMessage?: string;
};

export default function StatePanel({ status, errorMessage }: Props) {
  if (status === 'idle') return null;
  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-primary">
        <Loader2 className="animate-spin w-5 h-5" />
        <span>Generating your storyboard…</span>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex items-center gap-2 text-warning">
        <AlertCircle className="w-5 h-5" />
        <span>{errorMessage || 'An error occurred.'}</span>
      </div>
    );
  }
  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-success">
        <CheckCircle className="w-5 h-5" />
        <span>Storyboard ready!</span>
      </div>
    );
  }
  return null;
}
