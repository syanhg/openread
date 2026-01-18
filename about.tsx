'use client';

interface AboutProps {
  about: string;
}

export default function About({ about }: AboutProps) {
  if (!about) return null;
  
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p className="text-foreground/80 leading-relaxed">{about}</p>
    </section>
  );
}
