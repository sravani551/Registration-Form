import type { Metadata } from 'next';
import './globals.css';
import { personalInfo } from '@/data/resume-data';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title} Portfolio`,
  description: personalInfo.summary,
  keywords: ['Java', 'Spring Boot', 'React', 'Angular', 'Full Stack Developer', 'IntelliForge AI', 'Portfolio'],
  authors: [{ name: personalInfo.name, url: personalInfo.linkedin }],
  metadataBase: new URL('https://www.intelliforge.tech'),
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title} Portfolio`,
    description: personalInfo.summary,
    url: 'https://www.intelliforge.tech',
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | ${personalInfo.title} Portfolio`,
    description: personalInfo.summary,
    images: ['/api/og'],
  },
  alternates: {
    canonical: 'https://www.intelliforge.tech',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-neural-border mt-10">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
