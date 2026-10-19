import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ContactClient } from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Collaboration | E-Cell MITAOE',
  description:
    'Contact the student leadership of E-Cell MITAOE for startup partnerships, sponsorships, speaker sessions, and campus ecosystem collaborations.',
};

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Connect & Collaborate"
        title="Get in Touch with E-Cell MITAOE"
        description="Whether you are an investor, founder, prospective speaker, industry sponsor, or student builder — connect with our committee secretariat."
        breadcrumbs={[{ label: 'Contact' }]}
        badge="Direct Inquiries"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ContactClient />
      </div>
    </div>
  );
}
