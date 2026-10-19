import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ecellmitaoe.org'),
  title: {
    default: 'E-Cell MITAOE | Entrepreneurship Cell, MIT Academy of Engineering, Pune',
    template: '%s | E-Cell MITAOE',
  },
  description:
    'Official website of the Entrepreneurship Cell (E-Cell) at MIT Academy of Engineering, Pune. Fostering student startups, flagship conclaves, ideathons, and mentorship.',
  keywords: [
    'E-Cell MITAOE',
    'Entrepreneurship Cell MITAOE',
    'MIT Academy of Engineering Pune',
    'MITAOE Startups',
    'E-Summit Pune',
    'Student Entrepreneurship Club',
    'Ideathon Pune',
    'Innovation at MITAOE'
  ],
  authors: [{ name: 'E-Cell MITAOE Secretariat' }],
  creator: 'E-Cell MITAOE',
  publisher: 'E-Cell MITAOE',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ecellmitaoe.org',
    title: 'E-Cell MITAOE — Student Entrepreneurship Platform',
    description:
      'Empowering curious minds, bold ideas, and aspiring student founders turning possibilities into reality at MIT Academy of Engineering.',
    siteName: 'E-Cell MITAOE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Cell MITAOE — Official Club Website',
    description: 'Empowering student founders and innovation culture at MIT Academy of Engineering, Pune.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col bg-ecell-offwhite text-ecell-black font-sans antialiased selection:bg-ecell-blue selection:text-white">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
