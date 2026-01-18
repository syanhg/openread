'use client';

import { Volunteer as VolunteerType } from '@/types/cv';

interface VolunteerProps {
  items: VolunteerType[];
}

export default function Volunteer({ items }: VolunteerProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Volunteer</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6">
            <div className="w-24 flex-shrink-0 text-sm text-foreground/60">
              {item.startDate} {item.endDate ? `– ${item.endDate}` : '– Now'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">
                {item.role} at {item.organization}
              </h3>
              <p className="text-sm text-foreground/60">{item.location}</p>
              {item.description && (
                <p className="text-sm text-foreground/70 mt-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
