// Mock data for NextStepEdu

export interface University {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  coverImageUrl: string;
  shortDescription: string;
  description: string;
  tuitionRank: number;
  region: string;
  city: string;
  country: string;
  officialWebsite: string;
  faculties: Faculty[];
  programs: Program[];
  contacts: Contact[];
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  degreeLevel: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  examRequired: boolean;
  tuitionFee: number;
  currency: string;
  studyPeriodMonths: number;
  facultyId?: string;
}

export interface Contact {
  id: string;
  label: string;
  email: string;
  phone: string;
  websiteUrl?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  coverImageUrl: string;
  description: string;
  level: 'Bachelor' | 'Master' | 'PhD' | 'All Levels';
  benefits: string[];
  requirements: string[];
  howToApply: string;
  applyLink: string;
  university?: string;
  major?: string;
  location: string;
  deadline?: string;
  contacts: Contact[];
}

export const universities: University[] = [
  {
    id: '1',
    name: 'Royal University of Phnom Penh',
    slug: 'royal-university-phnom-penh',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop',
    shortDescription: 'Cambodia\'s oldest and most prestigious public university, offering diverse programs in sciences, humanities, and technology.',
    description: 'The Royal University of Phnom Penh (RUPP) is Cambodia\'s oldest and largest public university. Established in 1960, it has grown to become the leading institution for higher education in Cambodia, offering programs across multiple disciplines including sciences, social sciences, humanities, and technology.',
    tuitionRank: 2,
    region: 'Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    officialWebsite: 'https://www.rupp.edu.kh',
    faculties: [
      { id: 'f1', name: 'Faculty of Science', description: 'Mathematics, Physics, Chemistry, Biology' },
      { id: 'f2', name: 'Faculty of Social Sciences & Humanities', description: 'Sociology, History, Philosophy' },
      { id: 'f3', name: 'Faculty of Engineering', description: 'Computer Science, IT, Electronics' },
    ],
    programs: [
      { id: 'p1', name: 'Computer Science', description: 'Learn programming, algorithms, and software development', degreeLevel: 'Bachelor', examRequired: true, tuitionFee: 800, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f3' },
      { id: 'p2', name: 'Business Administration', description: 'Study management, marketing, and entrepreneurship', degreeLevel: 'Bachelor', examRequired: false, tuitionFee: 750, currency: 'USD', studyPeriodMonths: 48 },
      { id: 'p3', name: 'Information Technology', description: 'Master IT systems, networks, and cybersecurity', degreeLevel: 'Master', examRequired: true, tuitionFee: 1200, currency: 'USD', studyPeriodMonths: 24, facultyId: 'f3' },
    ],
    contacts: [
      { id: 'c1', label: 'Admissions Office', email: 'admissions@rupp.edu.kh', phone: '+855 23 883 640' },
      { id: 'c2', label: 'General Inquiries', email: 'info@rupp.edu.kh', phone: '+855 23 884 320' },
    ],
  },
  {
    id: '2',
    name: 'Institute of Technology of Cambodia',
    slug: 'institute-technology-cambodia',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop',
    shortDescription: 'Premier engineering and technology institution offering cutting-edge programs in STEM fields.',
    description: 'The Institute of Technology of Cambodia (ITC) is the leading public institution for engineering and technology education in Cambodia. Known for its rigorous academic programs and strong industry connections.',
    tuitionRank: 3,
    region: 'Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    officialWebsite: 'https://www.itc.edu.kh',
    faculties: [
      { id: 'f4', name: 'Faculty of Civil Engineering', description: 'Construction, Architecture, Urban Planning' },
      { id: 'f5', name: 'Faculty of Chemical Engineering', description: 'Chemical processes, Materials Science' },
    ],
    programs: [
      { id: 'p4', name: 'Civil Engineering', description: 'Design and construct buildings, bridges, and infrastructure', degreeLevel: 'Bachelor', examRequired: true, tuitionFee: 900, currency: 'USD', studyPeriodMonths: 60, facultyId: 'f4' },
      { id: 'p5', name: 'Electrical Engineering', description: 'Power systems, electronics, and telecommunications', degreeLevel: 'Bachelor', examRequired: true, tuitionFee: 900, currency: 'USD', studyPeriodMonths: 60 },
    ],
    contacts: [
      { id: 'c3', label: 'Student Services', email: 'student@itc.edu.kh', phone: '+855 23 880 370' },
    ],
  },
  {
    id: '3',
    name: 'University of Cambodia',
    slug: 'university-cambodia',
    logoUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&h=400&fit=crop',
    shortDescription: 'Modern private university focused on international standards and global opportunities.',
    description: 'The University of Cambodia is a leading private university committed to providing quality education with international standards. It offers diverse programs designed to prepare students for the global workforce.',
    tuitionRank: 4,
    region: 'Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    officialWebsite: 'https://www.uc.edu.kh',
    faculties: [
      { id: 'f6', name: 'Faculty of Business', description: 'Business, Finance, Marketing' },
      { id: 'f7', name: 'Faculty of Law', description: 'Legal Studies, International Law' },
    ],
    programs: [
      { id: 'p6', name: 'International Business', description: 'Global trade, international management', degreeLevel: 'Bachelor', examRequired: false, tuitionFee: 1500, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f6' },
      { id: 'p7', name: 'Law', description: 'Legal principles, court procedures, advocacy', degreeLevel: 'Bachelor', examRequired: true, tuitionFee: 1400, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f7' },
    ],
    contacts: [
      { id: 'c4', label: 'Admissions', email: 'admissions@uc.edu.kh', phone: '+855 23 993 274' },
    ],
  },
  {
    id: '4',
    name: 'National University of Management',
    slug: 'national-university-management',
    logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop',
    shortDescription: 'Specialized in business, economics, and management education with strong industry partnerships.',
    description: 'The National University of Management (NUM) specializes in business and management education. With strong partnerships with local and international organizations, NUM prepares students for successful careers in the business world.',
    tuitionRank: 2,
    region: 'Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    officialWebsite: 'https://www.num.edu.kh',
    faculties: [
      { id: 'f8', name: 'Faculty of Management', description: 'Management, Leadership, Strategy' },
      { id: 'f9', name: 'Faculty of Accounting', description: 'Accounting, Auditing, Finance' },
    ],
    programs: [
      { id: 'p8', name: 'Accounting', description: 'Financial accounting, auditing, taxation', degreeLevel: 'Bachelor', examRequired: false, tuitionFee: 700, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f9' },
      { id: 'p9', name: 'Management', description: 'Organizational management and leadership', degreeLevel: 'Master', examRequired: true, tuitionFee: 1000, currency: 'USD', studyPeriodMonths: 24, facultyId: 'f8' },
    ],
    contacts: [
      { id: 'c5', label: 'General', email: 'info@num.edu.kh', phone: '+855 23 428 120' },
    ],
  },
  {
    id: '5',
    name: 'Paragon International University',
    slug: 'paragon-international-university',
    logoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=400&fit=crop',
    shortDescription: 'Innovative private university with modern facilities and international curriculum.',
    description: 'Paragon International University offers world-class education with a focus on practical skills and global perspectives. Modern campus facilities and internationally trained faculty.',
    tuitionRank: 5,
    region: 'Phnom Penh',
    city: 'Phnom Penh',
    country: 'Cambodia',
    officialWebsite: 'https://www.paragoniu.edu.kh',
    faculties: [
      { id: 'f10', name: 'Faculty of Architecture', description: 'Architecture, Interior Design' },
      { id: 'f11', name: 'Faculty of Communication', description: 'Media, Journalism, Public Relations' },
    ],
    programs: [
      { id: 'p10', name: 'Architecture', description: 'Building design, urban planning, sustainability', degreeLevel: 'Bachelor', examRequired: true, tuitionFee: 2000, currency: 'USD', studyPeriodMonths: 60, facultyId: 'f10' },
      { id: 'p11', name: 'Communications', description: 'Media production, journalism, PR', degreeLevel: 'Bachelor', examRequired: false, tuitionFee: 1800, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f11' },
    ],
    contacts: [
      { id: 'c6', label: 'Admissions', email: 'admissions@paragoniu.edu.kh', phone: '+855 23 989 989' },
    ],
  },
  {
    id: '6',
    name: 'University of Battambang',
    slug: 'university-battambang',
    logoUrl: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&h=400&fit=crop',
    shortDescription: 'Leading regional university serving northwestern Cambodia with quality programs.',
    description: 'The University of Battambang is the premier higher education institution in northwestern Cambodia, serving students from Battambang and surrounding provinces with diverse academic programs.',
    tuitionRank: 1,
    region: 'Battambang',
    city: 'Battambang',
    country: 'Cambodia',
    officialWebsite: 'https://www.ubb.edu.kh',
    faculties: [
      { id: 'f12', name: 'Faculty of Agriculture', description: 'Agricultural Science, Agribusiness' },
      { id: 'f13', name: 'Faculty of Education', description: 'Teacher Training, Pedagogy' },
    ],
    programs: [
      { id: 'p12', name: 'Agricultural Science', description: 'Crop production, animal husbandry', degreeLevel: 'Bachelor', examRequired: false, tuitionFee: 500, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f12' },
      { id: 'p13', name: 'Education', description: 'Teaching methods, curriculum development', degreeLevel: 'Bachelor', examRequired: false, tuitionFee: 450, currency: 'USD', studyPeriodMonths: 48, facultyId: 'f13' },
    ],
    contacts: [
      { id: 'c7', label: 'General', email: 'info@ubb.edu.kh', phone: '+855 53 952 901' },
    ],
  },
];

export const scholarships: Scholarship[] = [
  {
    id: 's1',
    name: 'ASEAN Scholarship Program',
    slug: 'asean-scholarship-program',
    logoUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop',
    description: 'Full scholarship for outstanding ASEAN students to study at top universities in the region. Covers tuition, accommodation, and living expenses.',
    level: 'Bachelor',
    benefits: [
      'Full tuition fee coverage',
      'Monthly living allowance of $500',
      'Free accommodation',
      'Health insurance',
      'Annual return flight tickets',
    ],
    requirements: [
      'ASEAN citizenship',
      'High school GPA of 3.5 or above',
      'IELTS 6.5 or TOEFL 80',
      'Age under 25',
      'Leadership experience',
    ],
    howToApply: 'Submit online application through the ASEAN Scholarship Portal with all required documents including transcripts, recommendation letters, and personal statement.',
    applyLink: 'https://scholarship.asean.org/apply',
    university: 'Multiple Universities',
    major: 'All Fields',
    location: 'Southeast Asia',
    deadline: '2024-03-31',
    contacts: [
      { id: 'sc1', label: 'Scholarship Office', email: 'scholarship@asean.org', phone: '+65 6838 2338' },
    ],
  },
  {
    id: 's2',
    name: 'Cambodia Excellence Award',
    slug: 'cambodia-excellence-award',
    logoUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop',
    description: 'Merit-based scholarship for Cambodian students demonstrating academic excellence and community involvement. Partial tuition coverage at partner universities.',
    level: 'Bachelor',
    benefits: [
      '50% tuition fee waiver',
      'Mentorship program',
      'Networking events',
      'Career guidance',
    ],
    requirements: [
      'Cambodian citizenship',
      'High school GPA of 3.0 or above',
      'Community service record',
      'Financial need documentation',
    ],
    howToApply: 'Apply directly through partner university admissions office with scholarship application form and supporting documents.',
    applyLink: 'https://moeys.gov.kh/scholarship',
    university: 'Royal University of Phnom Penh',
    major: 'Science & Engineering',
    location: 'Cambodia',
    deadline: '2024-05-15',
    contacts: [
      { id: 'sc2', label: 'MoEYS', email: 'scholarship@moeys.gov.kh', phone: '+855 23 217 205' },
    ],
  },
  {
    id: 's3',
    name: 'Japan-Cambodia Friendship Grant',
    slug: 'japan-cambodia-friendship-grant',
    logoUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=400&fit=crop',
    description: 'Scholarship for Cambodian students to pursue graduate studies in Japan. Fully funded program including Japanese language training.',
    level: 'Master',
    benefits: [
      'Full tuition coverage',
      'Monthly stipend of ¥143,000',
      'Round-trip airfare',
      '6-month Japanese language course',
      'Research funding',
    ],
    requirements: [
      'Cambodian citizenship',
      'Bachelor\'s degree with excellent grades',
      'Research proposal',
      'Age under 35',
      'Good health',
    ],
    howToApply: 'Apply through the Embassy of Japan in Cambodia. Includes written exam and interview process.',
    applyLink: 'https://www.kh.emb-japan.go.jp/scholarship',
    university: 'Japanese Universities',
    major: 'All Fields',
    location: 'Japan',
    deadline: '2024-04-20',
    contacts: [
      { id: 'sc3', label: 'Embassy of Japan', email: 'scholarship@pp.mofa.go.jp', phone: '+855 23 217 161' },
    ],
  },
  {
    id: 's4',
    name: 'Women in STEM Scholarship',
    slug: 'women-in-stem-scholarship',
    logoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop',
    description: 'Empowering women in Cambodia to pursue careers in Science, Technology, Engineering, and Mathematics through full scholarship support.',
    level: 'Bachelor',
    benefits: [
      'Full tuition and fees',
      'Laptop provided',
      'Monthly stipend',
      'Internship opportunities',
      'Mentorship from industry professionals',
    ],
    requirements: [
      'Female Cambodian citizen',
      'Interest in STEM fields',
      'High school diploma with good grades in math/science',
      'Demonstration of leadership potential',
    ],
    howToApply: 'Submit application online with essay on why you want to pursue STEM and how you will give back to your community.',
    applyLink: 'https://womeninstem.org.kh/apply',
    university: 'Institute of Technology of Cambodia',
    major: 'Engineering & Technology',
    location: 'Cambodia',
    deadline: '2024-06-30',
    contacts: [
      { id: 'sc4', label: 'Program Office', email: 'apply@womeninstem.org.kh', phone: '+855 23 880 380' },
    ],
  },
  {
    id: 's5',
    name: 'Australia Awards Cambodia',
    slug: 'australia-awards-cambodia',
    logoUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
    description: 'Prestigious scholarship for Cambodian professionals to study at Australian universities. Full funding for Master\'s degree programs.',
    level: 'Master',
    benefits: [
      'Full tuition fees',
      'Return air travel',
      'Contribution to living expenses',
      'Overseas health cover',
      'Introductory academic program',
    ],
    requirements: [
      'Cambodian citizenship',
      '2+ years work experience',
      'Bachelor\'s degree',
      'IELTS 6.5 overall',
      'Not currently studying in Australia',
    ],
    howToApply: 'Apply online through the Australia Awards website during the annual application period.',
    applyLink: 'https://australiaawardscambodia.org/apply',
    university: 'Australian Universities',
    major: 'Priority Development Areas',
    location: 'Australia',
    deadline: '2024-04-30',
    contacts: [
      { id: 'sc5', label: 'Australia Awards', email: 'info@australiaawardscambodia.org', phone: '+855 23 213 470' },
    ],
  },
  {
    id: 's6',
    name: 'Rural Student Support Fund',
    slug: 'rural-student-support-fund',
    logoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&h=200&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=400&fit=crop',
    description: 'Supporting students from rural areas of Cambodia to access quality higher education in the capital and provincial universities.',
    level: 'Bachelor',
    benefits: [
      '70% tuition fee coverage',
      'Accommodation support',
      'Transportation allowance',
      'Book and supplies stipend',
    ],
    requirements: [
      'From rural province',
      'Family income below poverty line',
      'High school completion',
      'Commitment to return and serve community',
    ],
    howToApply: 'Apply through provincial education office with required documentation.',
    applyLink: 'https://moeys.gov.kh/rural-fund',
    university: 'Public Universities',
    major: 'All Fields',
    location: 'Cambodia',
    deadline: '2024-07-31',
    contacts: [
      { id: 'sc6', label: 'Provincial Office', email: 'rural.fund@moeys.gov.kh', phone: '+855 23 217 200' },
    ],
  },
];

export const regions = [
  'Phnom Penh',
  'Battambang',
  'Siem Reap',
  'Kampong Cham',
  'Sihanoukville',
  'Kampot',
];

export const degreeLevels = ['Bachelor', 'Master', 'PhD', 'Diploma', 'All Levels'];
