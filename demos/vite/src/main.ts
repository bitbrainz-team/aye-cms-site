import { marked } from 'marked';
import markdown from './content/home.md?raw';
import './style.css';

document.querySelector('#content')!.innerHTML = marked.parse(markdown, { async: false });

const admin = new URLSearchParams(location.search).has('admin');
const apiUrl = import.meta.env.VITE_CMS_API_URL;
const siteId = import.meta.env.VITE_CMS_SITE_ID;
if (apiUrl && siteId) {
  document.querySelector('#open-admin')?.removeAttribute('hidden');
  if (admin) {
    const { mountHostedEditor } = await import('@bitbrainz-team/aye-cms/hosted-editor');
    const unmount = mountHostedEditor({ apiUrl, siteId });
    import.meta.hot?.dispose(unmount);
  }
} else if (import.meta.env.DEV) {
  const { mountVisualEditor } = await import('@bitbrainz-team/aye-cms/visual-editor');
  const unmount = mountVisualEditor({ open: admin });
  import.meta.hot?.dispose(unmount);
} else {
  document.querySelector('#editor-status')?.removeAttribute('hidden');
}
