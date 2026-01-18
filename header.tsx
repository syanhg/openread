'use client';

import Image from 'next/image';

interface HeaderProps {
  name: string;
  title: string;
  location: string;
  website?: string;
  avatar?: string;
}

export default function Header({ name, title, location, website, avatar }: HeaderProps) {
  return (
    <div className="flex items-start gap-6 mb-12">
      {avatar ? (
        <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl text-gray-500">{name.charAt(0).toUpperCase()}</span>
        </div>
      )}
      
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-1">{name}</h1>
        <p className="text-foreground/70 mb-1">{title} in {location}</p>
        {website && (
          <a 
            href={website.startsWith('http') ? website : `https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground underline"
          >
            {website}
          </a>
        )}
      </div>
    </div>
  );
}
