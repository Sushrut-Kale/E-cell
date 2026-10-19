export type AcademicYear = '2024-25' | '2023-24' | '2022-23' | '2021-22';

export type EventCategory = 
  | 'Flagship'
  | 'Hackathon'
  | 'Speaker Session'
  | 'Workshop'
  | 'Pitch Competition'
  | 'Bootcamp'
  | 'Networking';

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  academicYear: AcademicYear;
  status: 'upcoming' | 'completed' | 'ongoing';
  date: string; // ISO or human readable
  endDate?: string;
  venue: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  galleryImages?: string[];
  attendeesCount?: number;
  speakers?: {
    name: string;
    role: string;
    organization: string;
    image?: string;
  }[];
  highlights?: string[];
  outcomes?: string[];
  registrationUrl?: string;
  isFeatured?: boolean;
}

export type AchievementCategory = 
  | 'National Recognition'
  | 'Student Venture'
  | 'Competition Win'
  | 'Ecosystem Impact'
  | 'Institutional Milestone';

export interface AchievementItem {
  id: string;
  title: string;
  year: string;
  category: AchievementCategory;
  description: string;
  metric?: string;
  metricLabel?: string;
  image?: string;
  attribution?: string;
  link?: string;
  isFeatured?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  eventSlug?: string;
  eventName: string;
  academicYear: AcademicYear;
  category: EventCategory;
  width?: number;
  height?: number;
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  academicYear: AcademicYear;
  category: EventCategory;
  coverImage: string;
  imageCount: number;
  date: string;
  description: string;
  images: GalleryImage[];
}

export type TeamDepartment = 
  | 'Core Leadership'
  | 'Operations & Logistics'
  | 'Technical & Web Development'
  | 'Design & Media'
  | 'Public Relations & Marketing'
  | 'Corporate Relations & Sponsorship'
  | 'Startups & Incubation Support';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: TeamDepartment;
  academicYear: AcademicYear;
  photoUrl: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  isCore?: boolean;
  order: number;
}

export interface HomepageStats {
  eventsOrganized: { value: string; label: string; isPlaceholder: boolean };
  studentsReached: { value: string; label: string; isPlaceholder: boolean };
  venturesMentored: { value: string; label: string; isPlaceholder: boolean };
  yearsActive: { value: string; label: string; isPlaceholder: boolean };
  lastUpdated: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  category: 'collaboration' | 'speaker' | 'sponsorship' | 'general' | 'student';
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface JoinApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  prn: string; // MITAOE student PRN
  branch: string;
  yearOfStudy: 'First Year' | 'Second Year' | 'Third Year' | 'Final Year';
  primaryDomain: TeamDepartment;
  secondaryDomain: TeamDepartment;
  portfolioUrl?: string;
  statementOfPurpose: string;
  createdAt: string;
  status: 'pending' | 'shortlisted' | 'contacted' | 'rejected';
}
