'use client';

import { CVData } from '@/types/cv';
import Header from './sections/header';
import About from './sections/about';
import WorkExperience from './sections/work-experience';
import Writing from './sections/writing';
import Speaking from './sections/speaking';
import SideProjects from './sections/side-projects';
import Education from './sections/education';
import Contact from './sections/contact';
import Volunteer from './sections/volunteer';
import Certificates from './sections/certificates';

export default function CVView({ cvData }: { cvData: CVData }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Header 
        name={cvData.name}
        title={cvData.title}
        location={cvData.location}
        website={cvData.website}
        avatar={cvData.avatar}
      />
      
      <About about={cvData.about} />
      
      {cvData.workExperience.length > 0 && (
        <WorkExperience experiences={cvData.workExperience} />
      )}
      
      {cvData.blog.length > 0 && (
        <Writing posts={cvData.blog} />
      )}
      
      {cvData.speaking.length > 0 && (
        <Speaking items={cvData.speaking} />
      )}
      
      {cvData.projects.length > 0 && (
        <SideProjects projects={cvData.projects} />
      )}
      
      {cvData.volunteer.length > 0 && (
        <Volunteer items={cvData.volunteer} />
      )}
      
      {cvData.certificates.length > 0 && (
        <Certificates items={cvData.certificates} />
      )}
      
      {cvData.education.length > 0 && (
        <Education items={cvData.education} />
      )}
      
      <Contact contact={cvData.contact} />
    </div>
  );
}
