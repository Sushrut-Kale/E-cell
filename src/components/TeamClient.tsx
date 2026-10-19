'use client';

import React, { useState, useMemo } from 'react';
import { TeamMember, AcademicYear, TeamDepartment } from '@/types';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { Users, Calendar, Shield, Info } from 'lucide-react';

interface TeamClientProps {
  initialMembers: TeamMember[];
}

const DEPARTMENTS: TeamDepartment[] = [
  'Core Leadership',
  'Operations & Logistics',
  'Technical & Web Development',
  'Design & Media',
  'Public Relations & Marketing',
  'Corporate Relations & Sponsorship',
  'Startups & Incubation Support',
];

export const TeamClient: React.FC<TeamClientProps> = ({ initialMembers }) => {
  const [selectedYear, setSelectedYear] = useState<AcademicYear>('2024-25');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const membersForYear = useMemo(() => {
    return initialMembers.filter((m) => m.academicYear === selectedYear);
  }, [initialMembers, selectedYear]);

  const filteredMembers = useMemo(() => {
    if (selectedDept === 'all') return membersForYear;
    return membersForYear.filter((m) => m.department === selectedDept);
  }, [membersForYear, selectedDept]);

  // Group by department if 'all' is selected
  const groupedByDepartment = useMemo(() => {
    if (selectedDept !== 'all') {
      return [{ department: selectedDept, members: filteredMembers }];
    }

    const groups: { department: string; members: TeamMember[] }[] = [];
    DEPARTMENTS.forEach((dept) => {
      const deptMembers = membersForYear.filter((m) => m.department === dept);
      if (deptMembers.length > 0) {
        groups.push({ department: dept, members: deptMembers });
      }
    });

    return groups;
  }, [membersForYear, filteredMembers, selectedDept]);

  return (
    <div className="space-y-10">
      
      {/* Notice regarding sample placeholder names */}
      <div className="p-4 rounded-xl bg-ecell-beige/50 border border-ecell-border flex items-center justify-between text-xs text-ecell-navy">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-ecell-blue shrink-0" />
          <span>
            <strong>Committee Data Notice:</strong> Member roles and profile placeholders are ready to receive verified student names and official portraits from the club secretariat.
          </span>
        </div>
      </div>

      {/* Selector Controls: Academic Year Tabs & Department Filter */}
      <div className="bg-white rounded-2xl border border-ecell-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        
        {/* Year Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ecell-navy mr-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Session:</span>
          </span>
          <div className="flex items-center p-1 rounded-xl bg-ecell-offwhite border border-ecell-border">
            <button
              type="button"
              onClick={() => setSelectedYear('2024-25')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedYear === '2024-25'
                  ? 'bg-ecell-navy text-white shadow-xs'
                  : 'text-ecell-muted hover:text-ecell-navy'
              }`}
            >
              2024-25 (Current Committee)
            </button>
            <button
              type="button"
              onClick={() => setSelectedYear('2023-24')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedYear === '2023-24'
                  ? 'bg-ecell-navy text-white shadow-xs'
                  : 'text-ecell-muted hover:text-ecell-navy'
              }`}
            >
              2023-24 (Previous Committee)
            </button>
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ecell-navy">Domain:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-ecell-border bg-ecell-offwhite text-ecell-navy text-xs font-medium focus:border-ecell-blue"
          >
            <option value="all">All Domains</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Render Departments */}
      <div className="space-y-14">
        {groupedByDepartment.map((group) => (
          <section key={group.department} className="space-y-6">
            
            {/* Department Heading */}
            <div className="flex items-center gap-3 border-b border-ecell-border pb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-ecell-blue" />
              <h2 className="text-xl sm:text-2xl font-bold text-ecell-navy">
                {group.department}
              </h2>
              <span className="text-xs text-ecell-muted font-mono ml-auto">
                {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
              </span>
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

          </section>
        ))}

        {groupedByDepartment.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-ecell-border">
            <p className="text-sm text-ecell-muted">No members listed under this domain for the selected session.</p>
          </div>
        )}
      </div>

    </div>
  );
};
