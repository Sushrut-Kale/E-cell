'use client';

import React, { useState, useMemo } from 'react';
import { EventItem, EventCategory, AcademicYear } from '@/types';
import { EventCard } from '@/components/EventCard';
import { Search, Filter, X, Calendar, Sparkles } from 'lucide-react';

interface EventsListingClientProps {
  initialEvents: EventItem[];
}

const CATEGORIES: ('all' | EventCategory)[] = [
  'all',
  'Flagship',
  'Hackathon',
  'Speaker Session',
  'Workshop',
  'Bootcamp',
];

const ACADEMIC_YEARS: ('all' | AcademicYear)[] = [
  'all',
  '2024-25',
  '2023-24',
];

const STATUS_FILTERS = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past Editions', value: 'completed' },
];

export const EventsListingClient: React.FC<EventsListingClientProps> = ({ initialEvents }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [selectedYear, setSelectedYear] = useState<'all' | AcademicYear>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((item) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches = 
          item.title.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.venue.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Status
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Academic Year
      if (selectedYear !== 'all' && item.academicYear !== selectedYear) {
        return false;
      }

      return true;
    });
  }, [initialEvents, search, selectedStatus, selectedCategory, selectedYear]);

  const hasActiveFilters = search || selectedCategory !== 'all' || selectedYear !== 'all' || selectedStatus !== 'all';

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedStatus('all');
  };

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Status Pills */}
      <div className="bg-white rounded-2xl border border-ecell-border p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Top row: Search input & Status tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ecell-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event title, keyword, or venue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ecell-border bg-ecell-offwhite text-sm text-ecell-navy placeholder:text-ecell-muted focus:bg-white focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ecell-muted hover:text-ecell-navy"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-ecell-offwhite border border-ecell-border self-start md:self-auto">
            {STATUS_FILTERS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedStatus(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedStatus === tab.value
                    ? 'bg-ecell-navy text-white shadow-xs'
                    : 'text-ecell-muted hover:text-ecell-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom row: Category filters & Academic year selector */}
        <div className="pt-3 border-t border-ecell-border/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-ecell-navy mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-ecell-blue" />
              <span>Category:</span>
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors font-medium ${
                  selectedCategory === cat
                    ? 'bg-ecell-blue text-white font-bold'
                    : 'bg-ecell-offwhite hover:bg-ecell-beige text-ecell-navy border border-ecell-border'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Academic Year Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ecell-navy">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as 'all' | AcademicYear)}
              className="px-3 py-1.5 rounded-lg border border-ecell-border bg-ecell-offwhite text-ecell-navy font-medium text-xs focus:border-ecell-blue focus:ring-1 focus:ring-ecell-blue"
            >
              <option value="all">All Academic Years</option>
              {ACADEMIC_YEARS.filter(y => y !== 'all').map((yr) => (
                <option key={yr} value={yr}>
                  Academic Year {yr}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-ecell-muted">
        <div>
          Showing <span className="font-bold text-ecell-navy">{filteredEvents.length}</span> {filteredEvents.length === 1 ? 'event' : 'events'}
          {hasActiveFilters && <span> (filtered)</span>}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 font-semibold text-ecell-blue hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Grid of Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ecell-border p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-ecell-beige/60 border border-ecell-border flex items-center justify-center text-ecell-navy mx-auto">
            <Calendar className="w-6 h-6 text-ecell-muted" />
          </div>
          <h3 className="text-lg font-bold text-ecell-navy">No Matching Events Found</h3>
          <p className="text-sm text-ecell-muted">
            We couldn&apos;t find any events matching your selected criteria. Try adjusting your search keywords or resetting your category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-ecell-blue text-white text-xs font-semibold hover:bg-ecell-blue-hover transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
