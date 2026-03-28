export function generateStaticParams() {
  return [
    { slug: 'sales' },
    { slug: 'marketing' },
    { slug: 'operations' },
    { slug: 'finance' },
    { slug: 'procurement' },
    { slug: 'executive' },
  ];
}

export default function DepartmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
