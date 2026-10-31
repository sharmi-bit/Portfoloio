/**
 * Central portfolio data — generated from Sharmisri N S's resume (Sharmisri_NS.pdf).
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Nothing here should be added unless it appears on the resume.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Sharmisri N S',
  displayName: 'Sharmisri N S',
  firstName: 'SHARMISRI',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A SHARMISRI ORIGINAL',
  role: 'Full-Stack Developer',
  tagline: ['Full-Stack Developer', 'AI / ML', 'Java'],
  intro:
    'A B.Tech Information Technology student (CGPA 9.2) with hands-on experience in Java and full-stack web development, building AI-powered platforms with React.js, Node.js, Express.js, MongoDB and Python.',
  location: 'Madurai, Tamil Nadu',
  email: 'sharmipriya.2004@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/sharmi-sri-504a092b7/',
    github: 'https://github.com/sharmi-bit',
    leetcode: 'https://leetcode.com/u/sharmi-sri/',
  },
  resumePdf: '/assets/Sharmisri_NS_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Sharmisri N S',
  },
  /** Photo used in the About card (4:5 crop). */
  aboutPortrait: {
    src: '/assets/about-720.webp',
    srcSet: '/assets/about-420.webp 420w, /assets/about-720.webp 720w, /assets/about-1100.webp 1100w',
  },
  /** Self-introduction video (public/assets/intro.mp4 + intro.webm fallback) shown from the About card. */
  introVideo: { src: '/assets/intro.mp4', webm: '/assets/intro.webm', poster: '/assets/intro-poster.jpg' },
  interests: ['Web Development', 'Artificial Intelligence', 'Vibe Coding'],
};

export const education = [
  {
    school: 'Velammal College of Engineering and Technology',
    place: 'Madurai',
    degree: 'Bachelor of Technology — Information Technology',
    period: '2023 – 2027',
    score: 'CGPA 9.2',
  },
  {
    school: 'St. Joseph Matriculation Higher Secondary School',
    place: '',
    degree: 'Higher Secondary Certificate (Class XII)',
    period: '2021 – 2022',
    score: 'Score 88%',
  },
  {
    school: 'Amali Matriculation Higher Secondary School',
    place: '',
    degree: 'Secondary School Leaving Certificate (Class X)',
    period: '2019 – 2020',
    score: 'Score 90%',
  },
];

export const experience = [
  {
    company: 'Phoenix SofTech',
    role: 'AI & ML Intern',
    place: '',
    period: 'Internship',
    points: [
      'Completed a project on Strawberry Plant Disease Detection using AI, utilizing U-Net and XGBoost algorithms for accurate disease identification.',
      'Gained practical experience in image preprocessing, model training, and integrating AI models into a real-time web application.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  /** Live demo URL — adds a "Live Demo" button to the card and the project page. */
  live?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'strawberry-disease-detection',
    title: 'Strawberry Plant Disease Detection',
    year: 'Internship',
    genre: 'AI • Segmentation • Classification',
    logline: 'U-Net semantic segmentation and XGBoost classification to detect strawberry plant diseases.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'OpenCV', 'HTML', 'CSS', 'JS'],
    build: [
      'Applied U-Net for semantic segmentation and XGBoost for supervised classification to detect strawberry plant diseases.',
      'Performed image preprocessing including normalization, resizing, and feature extraction.',
    ],
    features: [
      'U-Net semantic segmentation',
      'XGBoost supervised classification',
      'Image preprocessing: normalization, resizing, feature extraction',
      'AI models integrated into a real-time web application',
    ],
    metrics: [
      { value: 'U-Net', label: 'semantic segmentation' },
      { value: 'XGBoost', label: 'supervised classification' },
      { value: '7', label: 'technologies in the stack' },
      { value: 'ICCCSS', label: 'conference presentation' },
    ],
    github: 'https://github.com/sharmi-bit/Strawberry-Leaf-Detection',
    live: 'https://strawberry-leaf-frontend.onrender.com/',
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'flow',
  },
  {
    id: 'smart-placement-interview-system',
    title: 'AI-Powered Smart Placement Interview System',
    year: 'SMART 2026',
    genre: 'Full-Stack • Machine Learning • Generative AI',
    logline: 'An AI-powered placement assessment platform for resume screening, aptitude tests, technical interviews and placement prediction.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'FastAPI', 'Scikit-learn', 'Groq API', 'Judge0 API'],
    build: [
      'Developed an AI-powered placement assessment platform using Machine Learning and Generative AI to automate resume screening, aptitude tests, technical interviews, and placement prediction.',
      'Implemented ATS-based resume analysis and AI-driven candidate evaluation to provide personalized feedback and recruitment insights.',
    ],
    features: [
      'Automated resume screening',
      'Aptitude tests and technical interviews',
      'Placement prediction',
      'ATS-based resume analysis',
      'AI-driven candidate evaluation with personalized feedback',
    ],
    metrics: [
      { value: 'ATS', label: 'based resume analysis' },
      { value: '4', label: 'stages automated: screening, aptitude, interview, prediction' },
      { value: '9', label: 'technologies in the stack' },
      { value: 'SMART 2026', label: 'conference presentation' },
    ],
    live: 'https://placement-frontend-pcz1.onrender.com',
    // TODO: add `github: 'https://github.com/sharmi-bit/<repo>',` here — the GitHub button appears as soon as it is set.
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'shield',
  },
  {
    id: 'habitforge-ai',
    title: 'HabitForge AI',
    year: 'Live',
    genre: 'AI • Full-Stack • Productivity',
    logline: 'An AI-powered habit-building and productivity platform that helps users create, track and optimize daily habits with personalized guidance.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Shadcn UI', 'Recharts', 'Claude / Groq API', 'n8n'],
    build: [
      'Built a full-stack platform where users get AI-generated habit plans, track streaks, follow a progress dashboard and receive smart reminders, with user authentication.',
      'Migrated from a local Ollama/phi3 model to a cloud-ready AI abstraction layer, and fixed the progress calculation (division-by-zero guard) and UTC-based streak logic.',
    ],
    features: [
      'AI-generated habit plans',
      'Habit tracking with streaks',
      'Progress dashboard',
      'Smart reminders and automation',
      'User authentication',
    ],
    metrics: [
      { value: '5', label: 'core features' },
      { value: '8', label: 'technologies in the stack' },
      { value: 'AI', label: 'generated habit plans' },
      { value: 'Live', label: 'deployed web app' },
    ],
    github: 'https://github.com/sharmi-bit/HabitforgeAI',
    live: 'https://habitforgeai.onrender.com/',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'placement-tracker',
    title: 'Placement Tracker',
    year: 'Live',
    genre: 'Full-Stack • MERN • Student Tools',
    logline: 'A placement tracker that helps students organize job applications, follow interview progress and prepare for campus placements in one place.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind CSS'],
    build: [
      'Built a MERN application with secure JWT authentication for tracking job applications, company and role details, and interview progress.',
      'Added a dashboard that gives an overall placement overview.',
    ],
    features: [
      'Track job applications and statuses',
      'Manage company and role details',
      'Monitor interview progress',
      'Dashboard for overall placement overview',
      'Secure authentication',
    ],
    metrics: [
      { value: 'MERN', label: 'full-stack architecture' },
      { value: 'JWT', label: 'secure authentication' },
      { value: '5', label: 'core features' },
      { value: 'Live', label: 'deployed web app' },
    ],
    github: 'https://github.com/sharmi-bit/Placement-tracker',
    live: 'https://sharmisri-portfolio.onrender.com/',
    palette: { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' },
    motif: 'tenants',
  },
  {
    id: 'smart-healthcare-monitoring',
    title: 'A Smart Healthcare Monitoring System',
    year: 'Basic project',
    genre: 'IoT • Healthcare',
    logline: 'A basic IoT project for smart healthcare monitoring.',
    stack: ['IoT'],
    build: ['A basic IoT-based healthcare monitoring system.'],
    features: ['Smart healthcare monitoring', 'IoT-based'],
    metrics: [
      { value: 'IoT', label: 'Internet of Things project' },
      { value: 'Basic', label: 'project level' },
    ],
    github: 'https://github.com/sharmi-bit/A-Smart-healthCare-Monitoring-System',
    palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
    motif: 'shield',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'department-first',
    title: 'Department First Rank',
    org: 'Information Technology',
    detail: 'Ranked first in the Information Technology department.',
    laurel: 'First Rank',
  },
  {
    id: 'icccss',
    title: 'Conference Presentation',
    org: 'ICCCSS Conference',
    detail: 'Presented “Strawberry Plant Disease Detection Using U-Net & XGBoost”.',
    laurel: 'Presented',
    link: '/certificates/icccss-2025.jpg',
  },
  {
    id: 'smart-2026',
    title: 'Conference Presentation',
    org: 'SMART 2026 Conference',
    detail: 'Presented “AI-Powered Smart Placement Interview System”.',
    laurel: 'Presented',
  },
];

export type Certification = { issuer: string; name: string; link: string };

/**
 * `link` opens the certificate image in a new tab. Images live in public/certificates/ (use '/certificates/<file name>'),
 * or paste any public image URL.
 * A card with an empty link stays non-clickable (no hover effect, no arrow).
 */
export const certifications: Certification[] = [
  { issuer: 'NPTEL', name: 'Privacy & Security in Online Social Media (Elite)', link: '/certificates/nptel-elite.jpg' },
  { issuer: 'NASSCOM', name: 'Certificate Program in Artificial Intelligence & Machine Learning', link: '/certificates/nasscom-ai-ml.jpg' },
  { issuer: 'Microsoft', name: 'Microsoft Certified: Power BI Data Analyst Associate', link: '/certificates/microsoft-power-bi.jpg' },
  { issuer: 'Board Infinity', name: 'Data Science for Beginners', link: '/certificates/board-infinity-data-science.jpg' },
  { issuer: 'Scaler Topics', name: 'AWS Free Course', link: '/certificates/scaler-aws.jpg' },
  { issuer: 'ICCCSS’25', name: 'Paper presentation — Strawberry Plant Disease Detection', link: '/certificates/icccss-2025.jpg' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'technical',
    title: 'Technical Skills',
    subtitle: 'Languages & fundamentals',
    skills: [
      { name: 'Java', mono: 'Jv' },
      { name: 'C', mono: 'C' },
      { name: 'OOP', mono: 'Oo' },
      { name: 'SDLC', mono: 'Sd' },
      { name: 'Data Structure', mono: 'Ds' },
      { name: 'Python', mono: 'Py' },
    ],
  },
  {
    id: 'web',
    title: 'Web Technologies',
    subtitle: 'Interfaces, servers & APIs',
    skills: [
      { name: 'HTML', mono: 'Ht' },
      { name: 'CSS', mono: 'Cs' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'React.js', mono: 'Re' },
      { name: 'Node.js', mono: 'No' },
      { name: 'Express.js', mono: 'Ex' },
      { name: 'REST API', mono: 'Ap' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Data & queries',
    skills: [
      { name: 'DBMS', mono: 'Db' },
      { name: 'SQL', mono: 'Sq' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    subtitle: 'Working with people',
    skills: [
      { name: 'Adaptability', mono: 'Ad' },
      { name: 'Team Collaboration', mono: 'Tc' },
      { name: 'Continuous Learning', mono: 'Cl' },
      { name: 'Communication', mono: 'Cm' },
    ],
  },
  {
    id: 'spoken',
    title: 'Languages',
    subtitle: 'Spoken languages',
    skills: [
      { name: 'English', mono: 'En' },
      { name: 'Tamil', mono: 'Ta' },
      { name: 'Sourashtra', mono: 'So' },
    ],
  },
  {
    id: 'interests',
    title: 'Interests',
    subtitle: 'Coming soon to the series',
    skills: [
      { name: 'Web Development', mono: 'Wd' },
      { name: 'Artificial Intelligence', mono: 'Ai' },
      { name: 'Vibe Coding', mono: 'Vc' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects, certifications or internship on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  Python: ['Strawberry Plant Disease Detection', 'AI-Powered Smart Placement Interview System'],
  HTML: ['Strawberry Plant Disease Detection'],
  CSS: ['Strawberry Plant Disease Detection'],
  JavaScript: ['Strawberry Plant Disease Detection'],
  'React.js': ['AI-Powered Smart Placement Interview System'],
  'Node.js': ['AI-Powered Smart Placement Interview System'],
  'Express.js': ['AI-Powered Smart Placement Interview System'],
  'Artificial Intelligence': ['AI & ML Intern at Phoenix SofTech', 'NASSCOM Certificate Program in AI & ML'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: '2019 – 2022',
    synopsis: 'School years at Amali and St. Joseph Matriculation Higher Secondary Schools — Class X and Class XII.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Foundation',
        description: 'Secondary School Leaving Certificate (Class X) at Amali Matriculation Higher Secondary School — finishing with 90%.',
        tags: ['Class X', 'SSLC'],
        runtime: '2019 – 2020',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'The Next Level',
        description: 'Higher Secondary Certificate (Class XII) at St. Joseph Matriculation Higher Secondary School — finishing with 88%.',
        tags: ['Class XII', 'HSC'],
        runtime: '2021 – 2022',
        palette: crimson,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: IT',
    period: '2023 – 2027',
    synopsis: 'B.Tech in Information Technology at Velammal College of Engineering and Technology, Madurai.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Engineer',
        description: 'Bachelor of Technology in Information Technology — CGPA 9.2 (till Semester VI).',
        tags: ['B.Tech', 'IT', 'CGPA 9.2'],
        runtime: '2023 – 2027',
        palette: violet,
      },
      {
        code: 'S02 E02',
        title: 'The Certified',
        description: 'Six certificates — NPTEL (Elite), NASSCOM AI & ML, Microsoft Power BI Data Analyst Associate, Board Infinity Data Science, Scaler AWS and the ICCCSS’25 paper presentation.',
        tags: ['NPTEL', 'NASSCOM', 'Power BI'],
        runtime: '6 certificates',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'Learning to Build',
    period: 'Internship',
    synopsis: 'AI & ML Intern at Phoenix SofTech — a hands-on project from image preprocessing to a real-time web application.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Intern',
        description: 'AI & ML Intern at Phoenix SofTech, completing a project on Strawberry Plant Disease Detection using AI.',
        tags: ['AI & ML', 'Phoenix SofTech'],
        runtime: 'AI & ML Intern',
        palette: ocean,
      },
      {
        code: 'S03 E02',
        title: 'The Data Wrangler',
        description: 'Practical experience in image preprocessing and model training, using U-Net and XGBoost for accurate disease identification.',
        tags: ['Preprocessing', 'Model training'],
        runtime: 'Phoenix SofTech',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'The Integrator',
        description: 'Integrated AI models into a real-time web application.',
        tags: ['AI models', 'Real-time web app'],
        runtime: 'Phoenix SofTech',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: 'Projects',
    synopsis: 'Five Originals — from plant disease detection to an AI habit tracker — with two of them presented at conferences.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The AI Builder',
        description: 'Strawberry Plant Disease Detection — U-Net segmentation and XGBoost classification.',
        tags: ['Python', 'PyTorch', 'FastAPI'],
        runtime: 'Project',
        palette: crimson,
      },
      {
        code: 'S04 E02',
        title: 'The Interviewer',
        description: 'AI-Powered Smart Placement Interview System — resume screening, aptitude tests, technical interviews and placement prediction.',
        tags: ['React.js', 'Node.js', 'MongoDB'],
        runtime: 'Project',
        palette: amber,
      },
      {
        code: 'S04 E03',
        title: 'The Product Builder',
        description: 'HabitForge AI and Placement Tracker — full-stack web apps with live demos.',
        tags: ['Next.js', 'MERN', 'Live demos'],
        runtime: 'Projects',
        palette: jade,
      },
      {
        code: 'S04 E04',
        title: 'The Tinkerer',
        description: 'A Smart Healthcare Monitoring System — a basic IoT project.',
        tags: ['IoT', 'Healthcare'],
        runtime: 'Project',
        palette: violet,
      },
      {
        code: 'S04 E05',
        title: 'The Presenter',
        description: 'Presented at the ICCCSS Conference and the SMART 2026 Conference.',
        tags: ['ICCCSS', 'SMART 2026'],
        runtime: 'Conferences',
        palette: ocean,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'The interests on the resume point to the next arc of the story.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Next Chapter',
        description: 'Exploring Web Development, Artificial Intelligence and Vibe Coding.',
        tags: ['Web Development', 'AI', 'Vibe Coding'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Core language', title: 'Java', detail: 'Hands-on experience • listed first in skills', palette: amber },
  { label: 'The AI Original', title: 'Strawberry Disease Detection', detail: 'U-Net + XGBoost', palette: crimson },
  { label: 'The Interview Original', title: 'Smart Placement System', detail: 'React.js • Node.js • FastAPI • Groq API', palette: ocean },
  { label: 'On stage', title: 'ICCCSS', detail: 'Conference presentation', palette: violet },
  { label: 'On stage', title: 'SMART 2026', detail: 'Conference presentation', palette: jade },
  { label: 'Academic high', title: '9.2 CGPA', detail: 'B.Tech IT • till Semester VI', palette: amber },
  { label: 'The internship arc', title: 'AI & ML Intern', detail: 'Phoenix SofTech', palette: crimson },
  { label: 'Elite credential', title: 'NPTEL Elite', detail: 'Privacy & Security in Online Social Media', palette: ocean },
  { label: 'AI credential', title: 'NASSCOM', detail: 'Certificate Program in AI & ML', palette: jade },
  { label: 'Analytics credential', title: 'Power BI', detail: 'Data Analyst Associate', palette: violet },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · IT',
    lines: ['Velammal College of Engineering and Technology, Madurai', '2023 – 2027'],
    chips: ['CGPA 9.2'],
  },
  {
    kicker: 'Skills',
    title: 'Java first.',
    lines: ['Java, C, Python · OOP, Data Structure, SDLC', 'React.js, Node.js, Express.js · REST API · DBMS, SQL'],
    chips: ['Java', 'Python', 'React.js', 'Node.js', 'Express.js', 'SQL'],
  },
  {
    kicker: 'Internship',
    title: 'The Internship Arc',
    lines: ['AI & ML Intern · Phoenix SofTech', 'Image preprocessing · Model training · Real-time web integration'],
  },
  {
    kicker: 'Projects',
    title: 'Five Originals',
    lines: [
      'Strawberry Plant Disease Detection — U-Net + XGBoost',
      'AI-Powered Smart Placement Interview System',
      'HabitForge AI · Placement Tracker · Smart Healthcare Monitoring',
    ],
  },
  {
    kicker: 'Achievements',
    title: 'Top Moments',
    lines: ['Presented at the ICCCSS Conference', 'Presented at the SMART 2026 Conference'],
  },
  {
    kicker: 'Certified',
    title: '6 Certificates',
    lines: ['NPTEL (Elite) · NASSCOM · Microsoft', 'Board Infinity · Scaler · ICCCSS’25'],
  },
  {
    kicker: 'Current mission',
    title: 'Now exploring',
    lines: ['Web Development · Artificial Intelligence · Vibe Coding'],
  },
];

export type ProfileId = 'sharmisri' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'sharmisri',
    name: 'Sharmisri',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & internship', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
