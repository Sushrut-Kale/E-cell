import React from 'react';
import Image from 'next/image';
import { AchievementItem } from '@/types';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface AchievementCardProps {
  achievement: AchievementItem;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <div className="group bg-white rounded-xl border border-ecell-border overflow-hidden transition-all duration-200 hover:border-ecell-blue/40 hover:shadow-xs flex flex-col md:flex-row">
      {/* Optional Side Image */}
      {achievement.image && (
        <div className="relative w-full md:w-56 shrink-0 aspect-16/9 md:aspect-auto bg-ecell-beige/40 overflow-hidden">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 md:hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-ecell-navy text-white">
              {achievement.year}
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Header row: category, year, metric pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-ecell-blue">
                <Award className="w-3.5 h-3.5 text-ecell-blue" />
                <span>{achievement.category}</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-xs text-ecell-muted">
                <Calendar className="w-3 h-3" />
                <span>{achievement.year}</span>
              </span>
            </div>

            {achievement.metric && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-ecell-beige text-ecell-navy border border-ecell-border">
                <span>{achievement.metric}</span>
                {achievement.metricLabel && (
                  <span className="text-[10px] font-normal text-ecell-muted">
                    • {achievement.metricLabel}
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-ecell-navy group-hover:text-ecell-blue transition-colors">
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-ecell-muted leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* Footer: Attribution and optional external link */}
        <div className="mt-4 pt-3 border-t border-ecell-border/80 flex items-center justify-between text-xs text-ecell-muted">
          {achievement.attribution && (
            <div className="flex items-center gap-1.5 italic text-ecell-navy/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-ecell-blue shrink-0" />
              <span>{achievement.attribution}</span>
            </div>
          )}

          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-ecell-blue hover:underline"
            >
              <span>Reference</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
