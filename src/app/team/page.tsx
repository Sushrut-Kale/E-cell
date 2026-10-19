import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { TeamClient } from '@/components/TeamClient';
import { getTeamMembers } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Executive Committee & Alumni | E-Cell MITAOE',
  description:
    'Meet the student leaders, coordinators, and domain heads steering E-Cell MITAOE across current and past academic sessions.',
};

export default async function TeamPage() {
  const allMembers = await getTeamMembers();

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Executive Committee"
        title="Student Leadership & Domain Coordinators"
        description="The dedicated teams orchestrating summits, curating founder mentorship, engineering digital tools, and building the entrepreneurial ecosystem at MITAOE."
        breadcrumbs={[{ label: 'Team' }]}
        badge="Club Secretariat"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <TeamClient initialMembers={allMembers} />
      </div>
    </div>
  );
}
