import Image from 'next/image';
import AuthLayout from '@/app/components/Templates/AuthLayout';

export default function Home() {
  return (
    <AuthLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Test</h1>
      </main>
    </AuthLayout>
  );
}
