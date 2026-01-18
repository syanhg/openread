'use client';

import { BlogPost } from '@/types/cv';
import Image from 'next/image';

interface WritingProps {
  posts: BlogPost[];
}

export default function Writing({ posts }: WritingProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Writing</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="flex gap-6">
            <div className="w-24 flex-shrink-0 text-sm text-foreground/60">
              {post.date}
            </div>
            <div className="flex-1">
              <a
                href={post.link || `#post-${post.id}`}
                className="text-lg font-medium hover:underline block mb-1"
              >
                {post.title}
              </a>
              {post.collaborators && post.collaborators.length > 0 && (
                <p className="text-sm text-foreground/60 mb-2">
                  {post.collaborators.length === 1 
                    ? `Worked alongside ${post.collaborators[0]}`
                    : `Collaboration with ${post.collaborators.join(', ')}`
                  }
                </p>
              )}
              {post.image && (
                <div className="mt-3 flex gap-4">
                  <div className="relative w-32 h-32 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/70 mb-1">
                      This is a site title that can go...
                    </p>
                    <p className="text-xs text-foreground/60">{post.readTime || '1 min read'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
