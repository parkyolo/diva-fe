import type { Metadata } from 'next';
import '@/styles/globals.css';
import AuthProvider from '@/containers/auth/AuthProvider';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'diva',
  description: '사용자 음역대 기반 노래 추천과 연습 서비스',
};

interface RootLayoutProps {
  landing: React.ReactNode;
  children: React.ReactNode;
}

export default async function RootLayout({
  landing,
  children,
}: RootLayoutProps) {
  return (
    <html>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <body>
        <div className="relative bg-bg-black basis-full max-w-[600px] min-w-[320px] h-full max-h-[1400px] min-h-[568px] flex flex-col">
          <AuthProvider landing={landing}>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
