import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Bangla to Banglish Converter</h1>
      <Link
        href="/converter"
        className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-300"
      >
        Go to Converter
      </Link>
    </div>
  );
}