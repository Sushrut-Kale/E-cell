import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { JoinClient } from '@/components/JoinClient';

export const metadata: Metadata = {
  title: 'Join Us & Recruitment | E-Cell MITAOE',
  description:
    'Apply to join the student organizing committee of E-Cell MITAOE. Explore domains in Web Development, Design, Corporate Relations, PR, and Event Management.',
};

export default function JoinPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Student Recruitment"
        title="Build Your Leadership with E-Cell MITAOE"
        description="We are scouting passionate creators, coders, designers, organizers, and startup enthusiasts ready to make a tangible mark on campus entrepreneurship."
        breadcrumbs={[{ label: 'Join Us' }]}
        badge="Recruitment Intake Active"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <JoinClient />
      </div>
    </div>
  );
}
