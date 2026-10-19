import React from 'react';
import { HomepageStats } from '@/types';
import { Calendar, Users, Rocket, History, Info } from 'lucide-react';

interface ImpactStatsProps {
  stats: HomepageStats;
  compact?: boolean;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({ stats, compact = false }) => {
  const statItems = [
    {
      id: 'events',
      value: stats.eventsOrganized.value,
      label: stats.eventsOrganized.label,
      isPlaceholder: stats.eventsOrganized.isPlaceholder,
      icon: Calendar,
    },
    {
      id: 'students',
      value: stats.studentsReached.value,
      label: stats.studentsReached.label,
      isPlaceholder: stats.studentsReached.isPlaceholder,
      icon: Users,
    },
    {
      id: 'ventures',
      value: stats.venturesMentored.value,
      label: stats.venturesMentored.label,
      isPlaceholder: stats.venturesMentored.isPlaceholder,
      icon: Rocket,
    },
    {
      id: 'years',
      value: stats.yearsActive.value,
      label: stats.yearsActive.label,
      isPlaceholder: stats.yearsActive.isPlaceholder,
      icon: History,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-xl border border-ecell-border bg-white p-5 sm:p-6 transition-all duration-200 hover:border-ecell-blue/40 hover:shadow-xs group ${
                compact ? 'py-4' : ''
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ecell-navy to-ecell-blue opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-ecell-offwhite border border-ecell-border flex items-center justify-center text-ecell-navy group-hover:text-ecell-blue group-hover:border-ecell-blue/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                {item.isPlaceholder && (
                  <span 
                    className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-ecell-beige text-ecell-navy border border-ecell-border"
                    title="Representative marker until certified club audit data is attached"
                  >
                    <span>Sample Marker</span>
                  </span>
                )}
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-ecell-navy tracking-tight">
                {item.value}
              </div>

              <div className="mt-1 text-xs sm:text-sm font-medium text-ecell-muted leading-snug">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-ecell-muted">
        <Info className="w-3.5 h-3.5 text-ecell-blue" />
        <span>Metrics reflect representative milestones pending final 2024-25 club secretariat audit.</span>
      </div>
    </div>
  );
};
