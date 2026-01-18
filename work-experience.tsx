'use client';

import { useState } from 'react';
import { WorkExperience as WorkExperienceType } from '@/types/cv';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface WorkExperienceProps {
  experiences: WorkExperienceType[];
}

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex gap-6">
            <div className="w-24 flex-shrink-0 text-sm text-foreground/60">
              {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : '– Now'}
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  <h3 className="text-lg font-medium">
                    {exp.role} at {exp.company}
                  </h3>
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform ${expanded.has(exp.id) ? 'rotate-90' : ''}`}
                  />
                </button>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-sm text-foreground/60 mb-2">{exp.location}</p>
              
              {expanded.has(exp.id) && (
                <div className="mt-4 space-y-4">
                  {exp.description && (
                    <p className="text-foreground/80">{exp.description}</p>
                  )}
                  {exp.images && exp.images.length > 0 && (
                    <div className="flex gap-4 flex-wrap">
                      {exp.images.map((img, idx) => (
                        <div key={idx} className="relative w-32 h-32 rounded overflow-hidden">
                          <Image
                            src={img}
                            alt={`${exp.company} work ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
