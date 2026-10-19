'use client';

import React, { useState, useMemo } from 'react';
import { AchievementItem } from '@/types';
import { AchievementCard } from '@/components/AchievementCard';
import { Award, Filter, Calendar, Sparkles, CheckCircle } from 'lucide-react';

interface AchievementsClientProps {
  initialAchievements: AchievementItem[];
}

export const AchievementsClient: React.FC<AchievementsClientProps> = ({ initialAchievements }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const years = useMemo(() => {
    const list = Array.from(new Set(initialAchievements.map(a => a.year))).sort().reverse();
    return ['all', ...list];
  }, [initialAchievements]);

  const categories = useMemo(() => {
    const list = Array.from(new Set(initialAchievements.map(a => a.category)));
    return ['all', ...list];
  }, [initialAchievements]);

  const filteredAchievements = useMemo(() => {
    return initialAchievements.filter((item) => {
      if (selectedYear !== 'all' && item.year !== selectedYear) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [initialAchievements, selectedYear, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Metric Highlight Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-ecell-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-ecell-blue/10 flex items-center justify-center text-ecell-blue shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-ecell-navy block">100%</span>
            <span className="text-xs text-ecell-muted">Student-Led Execution & Verified Citations</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-ecell-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-ecell-beige/70 flex items-center justify-center text-ecell-navy shrink-0">
            <Sparkles className="w-6 h-6 text-ecell-blue" />
          </div>
          <div>
            <span className="text-2xl font-black text-ecell-navy block">Top 25</span>
            <span className="text-xs text-ecell-muted">State Level Collegiate Pitch Standings</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-ecell-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-ecell-offwhite flex items-center justify-center text-ecell-navy shrink-0">
            <CheckCircle className="w-6 h-6 text-ecell-blue" />
          </div>
          <div>
            <span className="text-2xl font-black text-ecell-navy block">Multi-Domain</span>
            <span className="text-xs text-ecell-muted">Hardware, AI, Biotech & Civic Ventures</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-ecell-border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ecell-navy flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-ecell-navy text-white font-bold'
                  : 'bg-ecell-offwhite hover:bg-ecell-beige text-ecell-navy border border-ecell-border'
              }`}
            >
              {cat === 'all' ? 'All Accolades' : cat}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ecell-navy flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Year:</span>
          </span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-ecell-border bg-ecell-offwhite text-ecell-navy text-xs font-medium focus:border-ecell-blue"
          >
            <option value="all">All Years</option>
            {years.filter(y => y !== 'all').map((yr) => (
              <option key={yr} value={yr}>Year {yr}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-ecell-border">
          <p className="text-sm text-ecell-muted">No achievements found matching your selected filters.</p>
        </div>
      )}
    </div>
  );
};
