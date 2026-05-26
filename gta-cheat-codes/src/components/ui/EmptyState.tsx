import React from 'react';
import type { IconType } from 'react-icons';

interface EmptyStateProps {
  icon: IconType;
  title: string;
  subtitle: string;
}

export default function EmptyState({ icon: Icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <Icon size={48} className="text-text3 mb-4" />
      <h3 className="font-display text-xl text-text2">{title}</h3>
      <p className="text-sm text-text3 mt-1">{subtitle}</p>
    </div>
  );
}
