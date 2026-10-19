import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { AdminDashboard } from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Committee Administration Portal | E-Cell MITAOE',
  description:
    'Administrative management console for E-Cell MITAOE committee members to manage events, photography albums, achievements, and recruitment applications.',
};

export default function AdminPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Internal Management"
        title="Club Content & Secretariat Console"
        description="Protected administration portal for managing events, photo albums, team rosters, and viewing incoming inquiries and applications."
        breadcrumbs={[{ label: 'Admin' }]}
        badge="Committee Only"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <AdminDashboard />
      </div>
    </div>
  );
}
