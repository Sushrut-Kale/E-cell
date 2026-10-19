import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { EventsListingClient } from '@/components/EventsListingClient';
import { getEvents } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Events & Initiatives | E-Cell MITAOE',
  description:
    'Explore upcoming flagship summits, hackathons, speaker masterclasses, and entrepreneurial workshops hosted by E-Cell MITAOE.',
};

export default async function EventsPage() {
  const allEvents = await getEvents();

  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Campus Summits & Initiatives"
        title="Events, Conclaves & Startup Accelerators"
        description="Browse our comprehensive directory of hackathons, investor conclaves, founder AMAs, and ideation clinics across academic sessions."
        breadcrumbs={[{ label: 'Events' }]}
        badge="Academic Year 2024-25"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <EventsListingClient initialEvents={allEvents} />
      </div>
    </div>
  );
}
