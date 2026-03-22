'use client';
import { DocProvider, useDocViewer } from './doc-context';
import { DocumentViewer } from './document-viewer';

function GlobalDocViewer() {
  const { currentDoc, closeDoc } = useDocViewer();
  if (!currentDoc) return null;
  return <DocumentViewer doc={currentDoc} onClose={closeDoc} />;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <DocProvider>
      {children}
      <GlobalDocViewer />
    </DocProvider>
  );
}
