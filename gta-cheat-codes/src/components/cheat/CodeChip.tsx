import React from 'react';

interface CodeChipProps {
  code: string;
}

export default function CodeChip({ code }: CodeChipProps) {
  const isNA = code === 'N/A';
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-mono truncate max-w-[140px] inline-block ${
        isNA
          ? 'bg-white/5 text-text3'
          : 'bg-white/10 text-text1'
      }`}
    >
      {code}
    </span>
  );
}
