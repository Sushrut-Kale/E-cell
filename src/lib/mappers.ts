import { 
  EventItem, 
  AchievementItem, 
  GalleryAlbum, 
  GalleryImage, 
  TeamMember,
  ContactEnquiry,
  JoinApplication 
} from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbEventToEvent(row: any): EventItem {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    tagline: row.tagline || '',
    category: row.category,
    academicYear: row.academic_year || row.academicYear || '2024-25',
    status: row.status || 'upcoming',
    date: row.date,
    endDate: row.end_date || row.endDate || undefined,
    venue: row.venue,
    shortDescription: row.short_description || row.shortDescription || '',
    fullDescription: row.full_description || row.fullDescription || row.short_description || '',
    coverImage: row.cover_image || row.coverImage,
    galleryImages: row.gallery_images || row.galleryImages || [],
    attendeesCount: row.attendees_count ?? row.attendeesCount,
    highlights: row.highlights || [],
    outcomes: row.outcomes || [],
    registrationUrl: row.registration_url || row.registrationUrl || undefined,
    isFeatured: Boolean(row.is_featured ?? row.isFeatured),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbAchievementToAchievement(row: any): AchievementItem {
  return {
    id: String(row.id),
    title: row.title,
    year: String(row.year),
    category: row.category,
    description: row.description,
    metric: row.metric || undefined,
    metricLabel: row.metric_label || row.metricLabel || undefined,
    image: row.image || undefined,
    attribution: row.attribution || undefined,
    link: row.link || undefined,
    isFeatured: Boolean(row.is_featured ?? row.isFeatured),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbAlbumToAlbum(row: any): GalleryAlbum {
  const images: GalleryImage[] = Array.isArray(row.gallery_images)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? row.gallery_images.map((img: any) => ({
        id: String(img.id),
        url: img.url,
        caption: img.caption || '',
        eventName: img.event_name || img.eventName || row.title,
        academicYear: img.academic_year || img.academicYear || row.academic_year || '2024-25',
        category: img.category || row.category,
      }))
    : [];

  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    academicYear: row.academic_year || row.academicYear || '2024-25',
    category: row.category,
    coverImage: row.cover_image || row.coverImage,
    imageCount: images.length > 0 ? images.length : (row.image_count ?? row.imageCount ?? 0),
    date: row.date || `Academic Session ${row.academic_year || '2024-25'}`,
    description: row.description || '',
    images,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbTeamMemberToMember(row: any): TeamMember {
  return {
    id: String(row.id),
    name: row.name,
    role: row.role,
    department: row.department,
    academicYear: row.academic_year || row.academicYear || '2024-25',
    photoUrl: row.photo_url || row.photoUrl,
    bio: row.bio || undefined,
    linkedinUrl: row.linkedin_url || row.linkedinUrl || undefined,
    githubUrl: row.github_url || row.githubUrl || undefined,
    twitterUrl: row.twitter_url || row.twitterUrl || undefined,
    isCore: Boolean(row.is_core ?? row.isCore),
    order: row.sort_order ?? row.order ?? 100,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbEnquiryToEnquiry(row: any): ContactEnquiry {
  return {
    id: String(row.id),
    fullName: row.full_name || row.fullName,
    email: row.email,
    subject: row.subject,
    category: row.category,
    message: row.message,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    status: row.status || 'new',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbApplicationToApplication(row: any): JoinApplication {
  return {
    id: String(row.id),
    fullName: row.full_name || row.fullName,
    email: row.email,
    phone: row.phone,
    prn: row.prn,
    branch: row.branch,
    yearOfStudy: row.year_of_study || row.yearOfStudy,
    primaryDomain: row.primary_domain || row.primaryDomain,
    secondaryDomain: row.secondary_domain || row.secondaryDomain,
    portfolioUrl: row.portfolio_url || row.portfolioUrl || undefined,
    statementOfPurpose: row.statement_of_purpose || row.statementOfPurpose,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    status: row.status || 'pending',
  };
}
