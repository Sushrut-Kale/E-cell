import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { GalleryClient } from '@/components/GalleryClient';
import { getGalleryAlbums } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Photo Archive & Gallery | E-Cell MITAOE',
  description:
    'Visual chronicle of entrepreneurship summits, hackathons, speaker fireside chats, and workshop sessions at MIT Academy of Engineering, Pune.',
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Visual Chronicle"
        title="Event Albums & Campus Moments"
        description="Explore photographic records of student ideation sprints, pitch competitions, keynote addresses, and mentorship circles across academic sessions."
        breadcrumbs={[{ label: 'Gallery' }]}
        badge="Curated Albums"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <GalleryClient albums={albums} />
      </div>
    </div>
  );
}
