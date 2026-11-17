import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';

export default async function Home() {
  const markdown = await readFile(join(process.cwd(), 'src/content/home.md'), 'utf8');
  const content = marked.parse(markdown, { async: false });
  const hosted = process.env.NEXT_PUBLIC_CMS_API_URL && process.env.NEXT_PUBLIC_CMS_SITE_ID;

  return (
    <main>
      {(hosted || process.env.NODE_ENV === 'production') && (
        <p className="demo-nav">
          {hosted ? <a href="?admin">Open Admin</a> : 'Hosted editing is available on a configured deployment.'}
        </p>
      )}
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
