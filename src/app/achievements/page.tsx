import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { AchievementsClient } from '@/components/AchievementsClient';
import { getAchievements } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Achievements & Milestones | E-Cell MITAOE',
  description:
    'Documented accomplishments, competition victories, and institutional milestones achieved by E-Cell MITAOE and campus student ventures.',
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Milestones & Accolades"
        title="Impact, Competition Wins & Ecosystem Recognition"
        description="A chronicle of verified student breakthroughs, regional hackathon victories, and entrepreneurial development milestones fostered by E-Cell MITAOE."
        breadcrumbs={[{ label: 'Achievements' }]}
        badge="Documented Chronicle"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <AchievementsClient initialAchievements={achievements} />
      </div>
    </div>
  );
}
