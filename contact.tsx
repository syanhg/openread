'use client';

import { Contact as ContactType } from '@/types/cv';

interface ContactProps {
  contact: ContactType;
}

const contactLabels: Record<keyof ContactType, string> = {
  threads: 'Threads',
  figma: 'Figma',
  instagram: 'Instagram',
  bluesky: 'Bluesky',
  mastodon: 'Mastodon',
  x: 'X',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  email: 'Email',
};

export default function Contact({ contact }: ContactProps) {
  const entries = Object.entries(contact).filter(([_, value]) => value);
  
  if (entries.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Contact</h2>
      <div className="space-y-2">
        {entries.map(([key, value]) => {
          const label = contactLabels[key as keyof ContactType] || key;
          const url = key === 'email' 
            ? `mailto:${value}`
            : key === 'x'
            ? `https://x.com/${value}`
            : key === 'linkedin'
            ? `https://linkedin.com/in/${value}`
            : key === 'github'
            ? `https://github.com/${value}`
            : key === 'instagram'
            ? `https://instagram.com/${value}`
            : key === 'threads'
            ? `https://threads.net/@${value}`
            : key === 'bluesky'
            ? `https://bsky.app/profile/${value}`
            : key === 'mastodon'
            ? value.startsWith('http') ? value : `https://${value}`
            : value;
          
          return (
            <div key={key} className="flex gap-2">
              <span className="text-foreground/60 w-24 flex-shrink-0">{label}:</span>
              <a
                href={url}
                target={key === 'email' ? undefined : '_blank'}
                rel={key === 'email' ? undefined : 'noopener noreferrer'}
                className="text-foreground/70 hover:text-foreground hover:underline"
              >
                {value}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
