import type { Metadata } from 'next';
import '@/styles/globals.css';
import AuthProvider from '@/containers/auth/AuthProvider';

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
  console.log('root layout');

  return (
    <html>
      <body>
        <div className="relative bg-bg-black basis-full max-w-[600px] min-w-[320px] h-full max-h-[1400px] min-h-[568px] flex flex-col">
          <AuthProvider landing={landing}>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
