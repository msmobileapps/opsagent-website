'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface DocInfo {
  id: string;
  name: string;
  format: string;
  agent: string;
  department: string;
  date: string;
  status: string;
}

interface DocContextType {
  openDoc: (doc: DocInfo) => void;
  closeDoc: () => void;
  currentDoc: DocInfo | null;
}

const DocContext = createContext<DocContextType>({
  openDoc: () => {},
  closeDoc: () => {},
  currentDoc: null,
});

export function useDocViewer() {
  return useContext(DocContext);
}

export function DocProvider({ children }: { children: ReactNode }) {
  const [currentDoc, setCurrentDoc] = useState<DocInfo | null>(null);
  return (
    <DocContext.Provider value={{
      openDoc: setCurrentDoc,
      closeDoc: () => setCurrentDoc(null),
      currentDoc,
    }}>
      {children}
    </DocContext.Provider>
  );
}
