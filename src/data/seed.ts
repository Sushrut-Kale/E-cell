import { 
  EventItem, 
  AchievementItem, 
  GalleryAlbum, 
  TeamMember, 
  HomepageStats 
} from '@/types';

/**
 * NOTICE:
 * All records with `isPlaceholder: true` or `[REPLACE_WITH_CLUB_DATA]` tag 
 * are sample data structures designed for development and demonstration.
 * They will be replaced by verified records once official club records are imported.
 */

export const SEED_HOMEPAGE_STATS: HomepageStats = {
  eventsOrganized: { value: '24+', label: 'Events & Summits Organized', isPlaceholder: true },
  studentsReached: { value: '4,500+', label: 'Students Engaged Across Campus', isPlaceholder: true },
  venturesMentored: { value: '18+', label: 'Student Ideas & Ventures Nurtured', isPlaceholder: true },
  yearsActive: { value: '7+', label: 'Years of Entrepreneurial Culture', isPlaceholder: true },
  lastUpdated: 'Academic Year 2024-25 [Sample Metric]',
};

export const SEED_EVENTS: EventItem[] = [
  {
    id: 'ev-01',
    slug: 'e-summit-2025',
    title: 'MITAOE E-Summit 2025: Genesis',
    tagline: 'Annual flagship entrepreneurship and startup conclave',
    category: 'Flagship',
    academicYear: '2024-25',
    status: 'upcoming',
    date: 'April 18-19, 2025',
    venue: 'MITAOE Main Auditorium & Innovation Hub, Pune',
    shortDescription: 'The biggest entrepreneurship festival at MITAOE featuring keynote speaker sessions, startup pitch battles, networking arenas, and venture exhibits.',
    fullDescription: 'MITAOE E-Summit is the premier annual entrepreneurship gathering organized by E-Cell MITAOE. Spanning two intensive days, the summit brings together visionary founders, seed-stage investors, technical innovators, and ambitious student creators. Participants engage in hands-on workshops, competitive business modeling hackathons, and high-stakes pitch sessions before established venture capitalists from Pune and Mumbai startup circuits.',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    ],
    attendeesCount: 650,
    speakers: [
      {
        name: 'Guest Speaker [To Be Announced]',
        role: 'Founder & CEO',
        organization: 'Seed Stage Tech Venture, Pune',
      },
      {
        name: 'Angel Investor [To Be Announced]',
        role: 'Partner',
        organization: 'Early Stage Fund',
      }
    ],
    highlights: [
      'Keynote addresses from leading Maharashtra startup founders',
      'Live Venture Pitch arena with pre-seed grant considerations',
      'Interactive masterclasses on Product-Market Fit & Pitch Decks',
      'Networking lounge connecting students with alumni builders'
    ],
    outcomes: [
      'Empowering student founders with actionable launch blueprints',
      'Connecting student projects to EDF and regional incubation pipelines'
    ],
    registrationUrl: 'https://ecellmitaoe.org/register/esummit2025',
    isFeatured: true,
  },
  {
    id: 'ev-02',
    slug: 'ideathon-ignite-2024',
    title: 'Ignite Ideathon 2024',
    tagline: '36-hour cross-disciplinary problem solving & venture ideation',
    category: 'Hackathon',
    academicYear: '2024-25',
    status: 'completed',
    date: 'October 12-13, 2024',
    venue: 'Civil & Mech Complex & Computing Labs, MITAOE',
    shortDescription: 'A 36-hour sprint where student teams tackled challenges in sustainability, deep tech, smart mobility, and healthcare innovation.',
    fullDescription: 'Ignite Ideathon challenged over 45 multidisciplinary teams from across all engineering branches of MITAOE. Mentored by industry professionals and senior student innovators, teams refined their value proposition, built rapid wireframes and hardware prototypes, and defended their unit economics before an evaluation jury.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    ],
    attendeesCount: 220,
    highlights: [
      '45+ student teams presented prototype concepts',
      'Dedicated mentoring sessions on financial modeling and customer discovery',
      'Top 3 teams received direct incubation support entry at MITAOE ecosystem'
    ],
    outcomes: [
      '3 student projects progressed into working prototypes',
      'Over 180 hours of collective prototyping and team building'
    ],
    isFeatured: true,
  },
  {
    id: 'ev-03',
    slug: 'founders-unfiltered-series-2',
    title: 'Founders Unfiltered: Episode 02',
    tagline: 'Raw insights into bootstrapping from college dorm to market',
    category: 'Speaker Session',
    academicYear: '2024-25',
    status: 'completed',
    date: 'August 24, 2024',
    venue: 'Seminar Hall 3, MITAOE Campus',
    shortDescription: 'An intimate fireside chat with successful alumni entrepreneurs breaking down the messy realities of early-stage venture creation.',
    fullDescription: 'Moving past textbook success stories, Founders Unfiltered brings relatable founders who started their entrepreneurial journey while still in college. Attendees learned about hiring early teammates, navigating founder conflicts, talking to the first 50 customers, and balancing academics with high-velocity execution.',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    attendeesCount: 180,
    highlights: [
      'Candid AMA on overcoming early customer rejection',
      'Framework for validating B2B vs B2C student products',
      'Live critique of 3 volunteer student pitch decks'
    ],
    isFeatured: true,
  },
  {
    id: 'ev-04',
    slug: 'startup-bootcamp-2024',
    title: 'Zero to One: 3-Day Startup Bootcamp',
    tagline: 'Comprehensive fundamentals of venture building for engineers',
    category: 'Bootcamp',
    academicYear: '2023-24',
    status: 'completed',
    date: 'March 15-17, 2024',
    venue: 'MITAOE Design Thinking Studio',
    shortDescription: 'Hands-on sprint covering design thinking, rapid MVP scoping, no-code prototyping, and pitch mechanics.',
    fullDescription: 'Engineered specifically for engineering students with technical inclinations but minimal business background, Zero to One stripped away corporate jargon and walked students through customer interviews, value proposition canvas creation, and prototype deployment.',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    attendeesCount: 140,
    highlights: [
      'Customer discovery interview simulations',
      'No-code landing page creation sprint in under 3 hours',
      'Mock angel investor panel evaluation'
    ],
    isFeatured: false,
  },
  {
    id: 'ev-05',
    slug: 'pitch-craft-masterclass',
    title: 'PitchCraft: The Art of the 3-Minute Deck',
    tagline: 'Mastering investor storytelling and presentation delivery',
    category: 'Workshop',
    academicYear: '2023-24',
    status: 'completed',
    date: 'January 20, 2024',
    venue: 'Conference Hall, MITAOE',
    shortDescription: 'Masterclass on structuring pitch decks, articulating market size, and building credible financial milestones.',
    fullDescription: 'A practical, template-driven workshop dissecting world-class pitch decks from Airbnb, Uber, and Zerodha. Students learned how to structure traction metrics, defend TAM/SAM/SOM estimates, and tell memorable narrative arcs.',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    attendeesCount: 160,
    isFeatured: false,
  }
];

export const SEED_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-01',
    title: 'Excellence in Campus Entrepreneurship Promotion',
    year: '2024',
    category: 'Institutional Milestone',
    description: 'Recognized for sustaining structured entrepreneurial literacy initiatives, ideathons, and mentorship sessions for undergraduate students at MIT Academy of Engineering.',
    metric: 'Top 10%',
    metricLabel: 'State E-Cell Engagement Index [Sample Marker]',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    attribution: 'E-Cell MITAOE Annual Review',
    isFeatured: true,
  },
  {
    id: 'ach-02',
    title: 'Student Startup Semi-Finalist at National E-Summit',
    year: '2024',
    category: 'Student Venture',
    description: 'A student-founded IoT agriculture monitoring startup incubated via club initiatives advanced to the semi-finals at a leading national engineering summit in Maharashtra.',
    metric: 'Top 25',
    metricLabel: 'Out of 300+ Collegiate Teams [Sample Marker]',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    attribution: 'Inter-College Innovation Challenge',
    isFeatured: true,
  },
  {
    id: 'ach-03',
    title: 'Cross-Domain Innovation Mentorship Series',
    year: '2023',
    category: 'Ecosystem Impact',
    description: 'Bridged engineering departments with local Pune startup practitioners, conducting 12+ mentorship clinics covering product feasibility and patent basics.',
    metric: '12+',
    metricLabel: 'Specialized Mentorship Clinics Hosted',
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80',
    attribution: 'E-Cell Ecosystem Report 2023-24',
    isFeatured: true,
  },
  {
    id: 'ach-04',
    title: 'Successful Execution of 36h Regional Ideathon',
    year: '2023',
    category: 'Competition Win',
    description: 'Brought together multi-college student teams with industry problem statements, yielding 8 working proof-of-concepts in civic tech and sustainability.',
    metric: '45+ Teams',
    metricLabel: 'Collaborating Continuously across 36 Hours',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    attribution: 'MITAOE Innovation Records',
    isFeatured: false,
  }
];

export const SEED_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'alb-01',
    slug: 'e-summit-memories',
    title: 'E-Summit Flagship Conclaves',
    academicYear: '2024-25',
    category: 'Flagship',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    imageCount: 6,
    date: 'Academic Sessions 2023-2025',
    description: 'High-energy keynotes, panel discussions, and pitch arenas from our annual flagship gathering at MITAOE.',
    images: [
      {
        id: 'gal-01',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        caption: 'Auditorium keynote session with aspiring student founders in attendance [Sample Photo]',
        eventName: 'MITAOE E-Summit',
        academicYear: '2024-25',
        category: 'Flagship',
      },
      {
        id: 'gal-02',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panel debate on early-stage startup hurdles and bootstrapping vs venture capital [Sample Photo]',
        eventName: 'MITAOE E-Summit',
        academicYear: '2024-25',
        category: 'Flagship',
      },
      {
        id: 'gal-03',
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Speaker Q&A interactive circle with engineering students [Sample Photo]',
        eventName: 'MITAOE E-Summit',
        academicYear: '2023-24',
        category: 'Flagship',
      },
      {
        id: 'gal-04',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        caption: 'Networking foyer connecting student builders with industry mentors [Sample Photo]',
        eventName: 'MITAOE E-Summit',
        academicYear: '2023-24',
        category: 'Flagship',
      }
    ]
  },
  {
    id: 'alb-02',
    slug: 'ideathon-hackathons',
    title: 'Ideathons & Innovation Sprints',
    academicYear: '2024-25',
    category: 'Hackathon',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    imageCount: 4,
    date: 'Autumn 2024',
    description: 'Late-night prototyping, whiteboard sessions, and team brainstorms during our 36-hour sprints.',
    images: [
      {
        id: 'gal-05',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cross-functional engineering team working on product architecture [Sample Photo]',
        eventName: 'Ignite Ideathon',
        academicYear: '2024-25',
        category: 'Hackathon',
      },
      {
        id: 'gal-06',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mentorship review of business model canvas during sprint [Sample Photo]',
        eventName: 'Ignite Ideathon',
        academicYear: '2024-25',
        category: 'Hackathon',
      },
      {
        id: 'gal-07',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Final prototype demonstration before jury panel [Sample Photo]',
        eventName: 'Ignite Ideathon',
        academicYear: '2023-24',
        category: 'Hackathon',
      }
    ]
  },
  {
    id: 'alb-03',
    slug: 'workshops-masterclasses',
    title: 'Workshops & Hands-on Clinics',
    academicYear: '2023-24',
    category: 'Workshop',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    imageCount: 4,
    date: 'Spring 2024',
    description: 'Skill-building sessions on pitch craft, financial modeling, design thinking, and tech validation.',
    images: [
      {
        id: 'gal-08',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Classroom workshop on MVP development and customer journey mapping [Sample Photo]',
        eventName: 'Zero to One Bootcamp',
        academicYear: '2023-24',
        category: 'Workshop',
      },
      {
        id: 'gal-09',
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pitch deck review workshop in the conference hall [Sample Photo]',
        eventName: 'PitchCraft Masterclass',
        academicYear: '2023-24',
        category: 'Workshop',
      }
    ]
  }
];

export const SEED_TEAM_MEMBERS: TeamMember[] = [
  // 2024-25 Committee
  {
    id: 'tm-01',
    name: '[Club President]',
    role: 'Overall Coordinator & President',
    department: 'Core Leadership',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Leading strategic vision, institutional alignment, and external partnerships for E-Cell MITAOE.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: true,
    order: 1,
  },
  {
    id: 'tm-02',
    name: '[Vice President]',
    role: 'Vice President & Head of Operations',
    department: 'Core Leadership',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Overseeing internal committee operations, resource allocation, and annual summit execution.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: true,
    order: 2,
  },
  {
    id: 'tm-03',
    name: '[Technical Head]',
    role: 'Head of Technical & Digital Systems',
    department: 'Technical & Web Development',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Architecting digital portals, hackathon platforms, and digital community infrastructure.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    githubUrl: 'https://github.com',
    isCore: true,
    order: 3,
  },
  {
    id: 'tm-04',
    name: '[Design & Media Lead]',
    role: 'Head of Design & Visual Identity',
    department: 'Design & Media',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    bio: 'Directing visual storytelling, branding assets, event creative collateral, and media presence.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: true,
    order: 4,
  },
  {
    id: 'tm-05',
    name: '[PR & Marketing Lead]',
    role: 'Head of Public Relations & Outreach',
    department: 'Public Relations & Marketing',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    bio: 'Managing campus campaigns, social media channels, and inter-college community alliances.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: false,
    order: 5,
  },
  {
    id: 'tm-06',
    name: '[Corporate Relations Lead]',
    role: 'Head of Sponsorship & Corporate Alliances',
    department: 'Corporate Relations & Sponsorship',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Fostering sponsorships, speaker outreach, and partnerships with Pune startup accelerators.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: false,
    order: 6,
  },
  {
    id: 'tm-07',
    name: '[Startup Support Lead]',
    role: 'Head of Incubation & Venture Mentorship',
    department: 'Startups & Incubation Support',
    academicYear: '2024-25',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    bio: 'Connecting student projects with early stage mentors, grant competitions, and campus incubation.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: false,
    order: 7,
  },

  // 2023-24 Previous Committee
  {
    id: 'tm-08',
    name: '[Past President]',
    role: 'Overall Coordinator (2023-24)',
    department: 'Core Leadership',
    academicYear: '2023-24',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneered the expansion of regional campus ideathons and student venture bootcamps.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: true,
    order: 1,
  },
  {
    id: 'tm-09',
    name: '[Past Vice President]',
    role: 'Vice President (2023-24)',
    department: 'Core Leadership',
    academicYear: '2023-24',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    bio: 'Streamlined annual club operations and multi-team collaboration pipelines.',
    linkedinUrl: 'https://linkedin.com/company/ecell-mitaoe',
    isCore: true,
    order: 2,
  }
];

export const MITAOE_OFFICIAL_INFO = {
  institutionName: 'MIT Academy of Engineering (MITAOE), Alandi Road, Pune',
  affiliation: 'Autonomous Institute Affiliated to Savitribai Phule Pune University (SPPU)',
  clubName: 'E-Cell MITAOE (Entrepreneurship Cell)',
  tagline: 'Empowering Student Innovators & Next-Gen Founders',
  establishedNote: 'Independent student-run body dedicated to entrepreneurial culture at MITAOE.',
  address: 'MIT Academy of Engineering, Dehu Phata, Alandi (D), Pune, Maharashtra 412105, India',
  email: 'ecell@mitaoe.ac.in', // Official institutional email convention
  socials: {
    linkedin: 'https://www.linkedin.com/company/ecell-mitaoe',
    instagram: 'https://www.instagram.com/ecell_mitaoe',
    twitter: 'https://twitter.com/ecell_mitaoe',
    youtube: 'https://youtube.com/@ecellmitaoe',
    github: 'https://github.com/ecell-mitaoe'
  }
};
