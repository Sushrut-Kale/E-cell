import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EventItem } from '@/types';
import { Calendar, MapPin, ArrowRight, Users, Sparkles } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isUpcoming = event.status === 'upcoming';

  return (
    <article className="group flex flex-col h-full bg-white rounded-xl border border-ecell-border overflow-hidden transition-all duration-300 hover:border-ecell-blue/50 hover:shadow-md">
      {/* Cover Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-ecell-beige/30">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-ecell-navy/90 text-white backdrop-blur-xs">
            {event.category}
          </span>

          <div className="flex items-center gap-1.5">
            {event.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-ecell-beige text-ecell-navy border border-ecell-border">
                <Sparkles className="w-3 h-3 text-ecell-blue" />
                <span>Featured</span>
              </span>
            )}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                isUpcoming
                  ? 'bg-ecell-blue text-white'
                  : 'bg-white/90 text-ecell-navy backdrop-blur-xs'
              }`}
            >
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </span>
          </div>
        </div>

        {/* Academic Year watermark */}
        <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono tracking-wider backdrop-blur-xs">
          {event.academicYear}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-ecell-muted mb-2.5">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-ecell-blue shrink-0" />
            <span>{event.date}</span>
          </div>
          {event.attendeesCount && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-ecell-blue shrink-0" />
              <span>{event.attendeesCount}+ Attendees</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-ecell-navy group-hover:text-ecell-blue transition-colors line-clamp-2">
          <Link href={`/events/${event.slug}`} className="focus:outline-none">
            {event.title}
          </Link>
        </h3>

        {/* Tagline / Subtitle */}
        {event.tagline && (
          <p className="text-xs font-medium text-ecell-blue mt-1 line-clamp-1">
            {event.tagline}
          </p>
        )}

        {/* Description */}
        <p className="mt-2.5 text-sm text-ecell-muted leading-relaxed line-clamp-2 flex-1">
          {event.shortDescription}
        </p>

        {/* Venue Footnote */}
        <div className="mt-4 pt-3 border-t border-ecell-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-ecell-muted truncate pr-2 max-w-[70%]">
            <MapPin className="w-3.5 h-3.5 text-ecell-blue shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-ecell-blue hover:text-ecell-blue-hover shrink-0 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
