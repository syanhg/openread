'use client';

import { Project } from '@/types/cv';

interface SideProjectsProps {
  projects: Project[];
}

export default function SideProjects({ projects }: SideProjectsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Side Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex gap-6">
            <div className="w-24 flex-shrink-0 text-sm text-foreground/60">
              {project.date}
            </div>
            <div className="flex-1">
              <a
                href={project.link || `#project-${project.id}`}
                className="text-lg font-medium hover:underline"
              >
                {project.title}
              </a>
              {project.description && (
                <p className="text-sm text-foreground/60 mt-1">{project.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
