import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Editor } from './editor';
import './style.css';

export const metadata: Metadata = { title: 'Next.js editor demo' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body data-bitbrainz-entry="demos/nextjs/src/content/home.md">
        {children}
        <Editor />
      </body>
    </html>
  );
}
