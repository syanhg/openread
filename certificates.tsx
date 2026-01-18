'use client';

import { Certificate } from '@/types/cv';
import Image from 'next/image';

interface CertificatesProps {
  items: Certificate[];
}

export default function Certificates({ items }: CertificatesProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Certificates</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6">
            <div className="w-24 flex-shrink-0 text-sm text-foreground/60">
              {item.date}
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-4">
                {item.image && (
                  <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-foreground/60">{item.issuer}</p>
                  {item.credentialId && (
                    <p className="text-xs text-foreground/50 mt-1">Credential ID: {item.credentialId}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/70 hover:underline mt-1 inline-block"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
