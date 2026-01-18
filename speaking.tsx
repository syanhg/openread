'use client';

import { Speaking as SpeakingType } from '@/types/cv';

interface SpeakingProps {
  items: SpeakingType[];
}

export default function Speaking({ items }: SpeakingProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Speaking</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6">
            <div className="w-24 flex-shrink-0 text-sm text-foreground/60">
              {item.date}
            </div>
            <div className="flex-1">
              <a
                href={item.link || `#speaking-${item.id}`}
                className="text-lg font-medium hover:underline"
              >
                {item.title}
              </a>
              <span className="text-sm text-foreground/60 ml-2">{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
