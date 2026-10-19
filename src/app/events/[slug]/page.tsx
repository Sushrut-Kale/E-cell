import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEventBySlug, getEvents } from '@/lib/data-service';
import { PageHero } from '@/components/PageHero';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Share2 
} from 'lucide-react';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found | E-Cell MITAOE',
    };
  }

  return {
    title: `${event.title} | E-Cell MITAOE`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [event.coverImage],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const isUpcoming = event.status === 'upcoming';

  return (
    <div className="pb-24">
      {/* Header */}
      <PageHero
        eyebrow={event.category}
        title={event.title}
        description={event.tagline || event.shortDescription}
        breadcrumbs={[
          { label: 'Events', href: '/events' },
          { label: event.title }
        ]}
        badge={`Session ${event.academicYear}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ecell-muted hover:text-ecell-navy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Main Left Column: Media & Narrative */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Hero Cover Image */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-ecell-border shadow-sm bg-ecell-beige/30">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-ecell-navy text-white shadow-xs">
                  {event.status === 'upcoming' ? 'Registration Open' : 'Concluded Event'}
                </span>
              </div>
            </div>

            {/* Overview / Narrative Section */}
            <div className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-ecell-navy">
                Event Overview
              </h2>
              <p className="text-base text-ecell-muted leading-relaxed font-normal">
                {event.fullDescription}
              </p>
            </div>

            {/* Key Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-ecell-navy font-bold text-lg">
                  <Sparkles className="w-5 h-5 text-ecell-blue" />
                  <h3>Key Program Highlights</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-ecell-offwhite border border-ecell-border/80 text-xs sm:text-sm text-ecell-navy">
                      <CheckCircle2 className="w-4 h-4 text-ecell-blue shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes & Impact (for completed events) */}
            {event.outcomes && event.outcomes.length > 0 && (
              <div className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-ecell-navy font-bold text-lg">
                  <Award className="w-5 h-5 text-ecell-blue" />
                  <h3>Outcomes & Ecosystem Deliverables</h3>
                </div>
                <ul className="space-y-2.5 pt-1">
                  {event.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-ecell-muted leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-ecell-blue shrink-0 mt-2" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured Speakers (if any) */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-ecell-navy">
                  Distinguished Speakers & Jury
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-ecell-beige/30 border border-ecell-border flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-ecell-navy text-white flex items-center justify-center font-bold text-base shrink-0">
                        {spk.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-ecell-navy truncate">{spk.name}</h4>
                        <p className="text-xs text-ecell-blue font-medium truncate">{spk.role}</p>
                        <p className="text-[11px] text-ecell-muted truncate">{spk.organization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Photo Highlights */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="bg-white rounded-2xl border border-ecell-border p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-ecell-navy">
                  Event Photo Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {event.galleryImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-4/3 rounded-xl overflow-hidden border border-ecell-border">
                      <Image
                        src={imgUrl}
                        alt={`${event.title} moment ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Event Meta Card & Action */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-ecell-border p-6 shadow-xs space-y-6 sticky top-24">
              
              <div className="border-b border-ecell-border pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-ecell-blue block">
                  Event Schedule
                </span>
                <h3 className="text-xl font-black text-ecell-navy mt-1">
                  {event.date}
                </h3>
              </div>

              {/* Meta items */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ecell-beige/60 border border-ecell-border flex items-center justify-center text-ecell-navy shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-ecell-blue" />
                  </div>
                  <div>
                    <span className="font-bold text-ecell-navy block">Date & Academic Session</span>
                    <span className="text-ecell-muted">{event.date} ({event.academicYear})</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ecell-beige/60 border border-ecell-border flex items-center justify-center text-ecell-navy shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-ecell-blue" />
                  </div>
                  <div>
                    <span className="font-bold text-ecell-navy block">Confirmed Venue</span>
                    <span className="text-ecell-muted leading-relaxed">{event.venue}</span>
                  </div>
                </div>

                {event.attendeesCount && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-ecell-beige/60 border border-ecell-border flex items-center justify-center text-ecell-navy shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-ecell-blue" />
                    </div>
                    <div>
                      <span className="font-bold text-ecell-navy block">Attendance</span>
                      <span className="text-ecell-muted">{event.attendeesCount}+ Participants</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isUpcoming && event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-ecell-blue text-white font-bold text-sm shadow-xs hover:bg-ecell-blue-hover transition-colors"
                  >
                    <span>Register for Event</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="p-3.5 rounded-xl bg-ecell-offwhite border border-ecell-border text-center text-xs text-ecell-muted">
                    This edition has concluded. Watch this space or join our club to stay informed on the next cycle.
                  </div>
                )}
              </div>

              {/* Inquiry Notice */}
              <div className="pt-4 border-t border-ecell-border text-center">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-ecell-blue hover:underline"
                >
                  Questions regarding this event? Contact us →
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
