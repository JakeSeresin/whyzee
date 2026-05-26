'use client';
import React from 'react';
import CheatListView from '@/components/cheat/CheatListView';

export default function CheatsPage() {
  return (
    <div className="flex flex-col h-full">
      <CheatListView
        headerContent={
          <div className="px-6 pt-6 pb-2">
            <h1 className="font-display text-4xl text-text1">ALL CHEATS</h1>
          </div>
        }
      />
    </div>
  );
}
