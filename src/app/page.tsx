import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/HeroSection';
import { ImpactStats } from '@/components/ImpactStats';
import { SectionHeading } from '@/components/SectionHeading';
import { EventCard } from '@/components/EventCard';
import { AchievementCard } from '@/components/AchievementCard';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { 
  getHomepageStats, 
  getFeaturedEvents, 
  getAchievements, 
  getGalleryAlbums, 
  getTeamMembers 
} from '@/lib/data-service';
import { 
  Compass, 
  Lightbulb, 
  Target, 
  Users, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Calendar 
} from 'lucide-react';

export default async function HomePage() {
  const stats = await getHomepageStats();
  const featuredEvents = await getFeaturedEvents();
  const achievements = await getAchievements();
  const galleryAlbums = await getGalleryAlbums();
  const teamMembers = await getTeamMembers({ academicYear: '2024-25' });

  // Curate 4 featured gallery images for the asymmetric preview
  const previewImages = galleryAlbums.flatMap(a => a.images).slice(0, 4);

  // Take top 4 committee members for homepage spotlight
  const committeeSpotlight = teamMembers.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* B. Hero Section */}
      <HeroSection />

      {/* C. Impact Statistics Strip */}
      <section className="py-12 bg-ecell-offwhite border-b border-ecell-border" aria-label="Key Milestones">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactStats stats={stats} />
        </div>
      </section>

      {/* D. About E-Cell Editorial Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-ecell-border" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Visual Storytelling */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-ecell-border bg-ecell-beige/30 aspect-4/3 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                  alt="Students collaborating during an E-Cell workshop at MITAOE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-ecell-border text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-ecell-navy">
                    <Sparkles className="w-3.5 h-3.5 text-ecell-blue" />
                    <span>Campus Innovation Hub</span>
                  </div>
                  <p className="text-ecell-muted mt-0.5">
                    Bridging engineering curricula with real venture execution.
                  </p>
                </div>
              </div>

              {/* Editorial Pillar Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-ecell-beige/40 border border-ecell-border">
                  <div className="flex items-center gap-2 text-ecell-navy font-bold text-sm">
                    <Lightbulb className="w-4 h-4 text-ecell-blue" />
                    <span>Ideate</span>
                  </div>
                  <p className="text-xs text-ecell-muted mt-1 leading-relaxed">
                    Transforming academic project ideas into customer-tested solutions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ecell-beige/40 border border-ecell-border">
                  <div className="flex items-center gap-2 text-ecell-navy font-bold text-sm">
                    <Target className="w-4 h-4 text-ecell-blue" />
                    <span>Accelerate</span>
                  </div>
                  <p className="text-xs text-ecell-muted mt-1 leading-relaxed">
                    Connecting teams with mentors, pitch arenas, and angel networks.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Mission, Vision, and Context */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Compass className="w-4 h-4 text-ecell-blue" />
                <span className="text-xs font-bold tracking-widest uppercase text-ecell-blue">
                  About Our Mission
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-ecell-navy tracking-tight leading-tight">
                Cultivating the Next Wave of Problem Solvers at MITAOE.
              </h2>

              <div className="space-y-4 text-base text-ecell-muted leading-relaxed">
                <p>
                  The Entrepreneurship Cell at MIT Academy of Engineering (MITAOE), Pune is an independent student-driven platform established to foster an enduring entrepreneurial spirit across all engineering and design departments.
                </p>
                <p>
                  We believe that transformative products are born when student curiosity meets structured mentorship and high-velocity execution. Through flagship summits, hackathons, speaker clinics, and venture challenges, we create an environment where theoretical engineering meets the rigor of real-world problem-solving.
                </p>
              </div>

              {/* Three distinct focus pillars */}
              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-ecell-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-ecell-blue">01</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ecell-navy">Curiosity-Driven Learning</h3>
                    <p className="text-xs text-ecell-muted mt-0.5">
                      Demystifying finance, business models, and product architecture for undergraduate engineers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-ecell-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-ecell-blue">02</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ecell-navy">Founder Mentorship & Ecosystem Access</h3>
                    <p className="text-xs text-ecell-muted mt-0.5">
                      Bringing established founders, startup operators, and venture investors directly to our campus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-ecell-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-ecell-blue">03</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ecell-navy">Cross-Department Collaboration</h3>
                    <p className="text-xs text-ecell-muted mt-0.5">
                      Fostering multidisciplinary student teams combining computing, mechanical, chemical, and design talents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-ecell-blue hover:text-ecell-blue-hover transition-colors group"
                >
                  <span>Read Full Club Story & Structure</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* E. Featured Initiatives */}
      <section className="py-16 sm:py-24 bg-ecell-offwhite border-b border-ecell-border" id="initiatives">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Initiatives & Summits"
            title="Signature Programs Driving Campus Innovation"
            description="From high-stakes hackathons to state-level conclaves, explore our flagship events designed to unlock student leadership and venture creation."
            linkHref="/events"
            linkLabel="View All Events"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Recent Achievements */}
      <section className="py-16 sm:py-24 bg-white border-b border-ecell-border" id="achievements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Milestones & Impact"
            title="Documented Progress & Student Accolades"
            description="Authentic milestones achieved by student innovators, competitive venture teams, and our campus ecosystem."
            linkHref="/achievements"
            linkLabel="Explore All Achievements"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.slice(0, 2).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </section>

      {/* G. Event Gallery Preview (Editorial Asymmetric Grid) */}
      <section className="py-16 sm:py-24 bg-ecell-offwhite border-b border-ecell-border" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Visual Chronicle"
            title="Moments From the Ground"
            description="A glimpse into the energy, ideation sprints, and community connections across previous academic sessions."
            linkHref="/gallery"
            linkLabel="Browse Photo Archive"
          />

          {/* Asymmetric Gallery Preview Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            {previewImages[0] && (
              <div className="md:col-span-7 relative aspect-16/10 rounded-2xl overflow-hidden border border-ecell-border group shadow-xs">
                <Image
                  src={previewImages[0].url}
                  alt={previewImages[0].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ecell-blue text-white uppercase tracking-wider">
                    {previewImages[0].eventName}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white/95">
                    {previewImages[0].caption}
                  </p>
                </div>
              </div>
            )}

            {previewImages[1] && (
              <div className="md:col-span-5 relative aspect-4/3 md:aspect-auto rounded-2xl overflow-hidden border border-ecell-border group shadow-xs">
                <Image
                  src={previewImages[1].url}
                  alt={previewImages[1].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ecell-navy text-white uppercase tracking-wider">
                    {previewImages[1].academicYear}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white/95">
                    {previewImages[1].caption}
                  </p>
                </div>
              </div>
            )}

            {previewImages[2] && (
              <div className="md:col-span-5 relative aspect-4/3 md:aspect-auto rounded-2xl overflow-hidden border border-ecell-border group shadow-xs">
                <Image
                  src={previewImages[2].url}
                  alt={previewImages[2].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ecell-navy text-white uppercase tracking-wider">
                    {previewImages[2].category}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white/95">
                    {previewImages[2].caption}
                  </p>
                </div>
              </div>
            )}

            {previewImages[3] && (
              <div className="md:col-span-7 relative aspect-16/10 rounded-2xl overflow-hidden border border-ecell-border group shadow-xs">
                <Image
                  src={previewImages[3].url}
                  alt={previewImages[3].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ecell-blue text-white uppercase tracking-wider">
                    {previewImages[3].eventName}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white/95">
                    {previewImages[3].caption}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* H. Meet the Team (Committee Spotlight) */}
      <section className="py-16 sm:py-24 bg-white border-b border-ecell-border" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="The Committee Behind the Mission"
            description="Meet the student coordinators spearheading operations, technical systems, design, and industry relations for the 2024-25 academic term."
            linkHref="/team"
            linkLabel="View All Committees & Alumni"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {committeeSpotlight.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* I. Community CTA (Navy Dark Editorial Anchor) */}
      <section className="py-16 sm:py-24 bg-ecell-navy text-white relative overflow-hidden" aria-label="Join our community">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#315ce8_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-ecell-beige text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Join the Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Build Your Venture or Join the Team?
          </h2>

          <p className="text-base sm:text-lg text-ecell-beige/85 max-w-2xl mx-auto leading-relaxed">
            Whether you have a breakthrough idea looking for a team, want to lead campus initiatives, or want to collaborate with MITAOE student talent — there is a place for you here.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ecell-blue text-white font-bold text-sm sm:text-base hover:bg-ecell-blue-hover active:scale-[0.98] transition-all shadow-md"
            >
              <span>Apply for Recruitment</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm sm:text-base border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 text-ecell-beige" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
