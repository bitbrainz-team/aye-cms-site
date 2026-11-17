'use client';

import { useEffect } from 'react';

export function Editor() {
  useEffect(() => {
    const admin = new URLSearchParams(location.search).has('admin');
    const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
    const siteId = process.env.NEXT_PUBLIC_CMS_SITE_ID;
    let disposed = false;
    let unmount: (() => void) | undefined;
    if (apiUrl && siteId && admin) {
      void import('@bitbrainz-team/aye-cms/hosted-editor').then(({ mountHostedEditor }) => {
        if (!disposed) unmount = mountHostedEditor({ apiUrl, siteId });
      });
    } else if ((!apiUrl || !siteId) && process.env.NODE_ENV === 'development') {
      void import('@bitbrainz-team/aye-cms/visual-editor').then(({ mountVisualEditor }) => {
        if (!disposed) unmount = mountVisualEditor({ open: admin, editorUrl: 'http://127.0.0.1:8789' });
      });
    }
    return () => {
      disposed = true;
      unmount?.();
    };
  }, []);

  return null;
}
