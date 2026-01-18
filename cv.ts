export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  images?: string[];
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  collaborators?: string[];
  content?: string;
  image?: string;
  slug?: string;
  published?: boolean;
  link?: string;
}

export interface Speaking {
  id: string;
  title: string;
  date: string;
  location: string;
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  date: string;
  description?: string;
  link?: string;
  image?: string;
}

export interface Volunteer {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  image?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Contact {
  threads?: string;
  figma?: string;
  instagram?: string;
  bluesky?: string;
  mastodon?: string;
  x?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface CVData {
  id: string;
  name: string;
  title: string;
  location: string;
  website?: string;
  avatar?: string;
  about: string;
  workExperience: WorkExperience[];
  blog: BlogPost[];
  speaking: Speaking[];
  projects: Project[];
  volunteer: Volunteer[];
  certificates: Certificate[];
  education: Education[];
  contact: Contact;
}
