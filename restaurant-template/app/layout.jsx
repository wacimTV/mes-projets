import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

// Bebas Neue font
const bebasNeue = localFont({
  src: './fonts/BebasNeue-Regular.ttf',
  variable: '--font-bebas-neue',
  weight: '400',
});

export const metadata = {
  title: 'Restaurant',
  description: 'Restaurant Web App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${bebasNeue.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
