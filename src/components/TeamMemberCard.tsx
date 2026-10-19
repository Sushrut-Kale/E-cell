import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types';
import { Shield } from 'lucide-react';
import { LinkedinIcon, GithubIcon, TwitterIcon } from './SocialIcons';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const isPlaceholderName = member.name.startsWith('[');

  return (
    <div className="group bg-white rounded-xl border border-ecell-border overflow-hidden transition-all duration-200 hover:border-ecell-blue/50 hover:shadow-md flex flex-col">
      {/* Profile Photo Container */}
      <div className="relative aspect-4/5 w-full bg-ecell-beige/30 overflow-hidden">
        <Image
          src={member.photoUrl}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Core tag / Academic Year tag */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {member.isCore && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ecell-navy text-white shadow-xs">
              <Shield className="w-2.5 h-2.5 text-ecell-blue" />
              <span>Core</span>
            </span>
          )}
        </div>

        {/* Department pill at bottom of image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <span className="inline-block px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium truncate max-w-full">
            {member.department}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-ecell-navy group-hover:text-ecell-blue transition-colors">
              {member.name}
            </h3>
            {isPlaceholderName && (
              <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-ecell-beige text-ecell-muted">
                Placeholder
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-semibold text-ecell-blue mt-0.5">
            {member.role}
          </p>

          {member.bio && (
            <p className="text-xs text-ecell-muted mt-2 line-clamp-2 leading-relaxed">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-4 pt-3 border-t border-ecell-border flex items-center justify-between">
          <span className="text-[11px] text-ecell-muted font-mono">
            {member.academicYear}
          </span>

          <div className="flex items-center gap-2">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded bg-ecell-offwhite border border-ecell-border flex items-center justify-center text-ecell-navy hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-colors"
                aria-label={`${member.name} LinkedIn Profile`}
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {member.githubUrl && (
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded bg-ecell-offwhite border border-ecell-border flex items-center justify-center text-ecell-navy hover:text-white hover:bg-black hover:border-black transition-colors"
                aria-label={`${member.name} GitHub Profile`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {member.twitterUrl && (
              <a
                href={member.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded bg-ecell-offwhite border border-ecell-border flex items-center justify-center text-ecell-navy hover:text-white hover:bg-black hover:border-black transition-colors"
                aria-label={`${member.name} X Profile`}
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
