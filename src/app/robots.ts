import type { MetadataRoute } from 'next';
import { isIndexable, publicUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return isIndexable
    ? {
        rules: { userAgent: '*', allow: '/' },
        sitemap: publicUrl('/sitemap.xml'),
      }
    : { rules: { userAgent: '*', disallow: '/' } };
}
