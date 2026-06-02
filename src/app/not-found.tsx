import Link from "next/link";
import { Anchor, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ocean-deep flex flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-ocean-teal/10 blur-2xl" />
        <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-ocean-teal to-lagoon flex items-center justify-center mx-auto mb-8">
          <Anchor className="h-12 w-12 text-white" />
        </div>
      </div>

      <h1 className="font-serif text-6xl font-bold text-pearl mb-2">404</h1>
      <h2 className="font-serif text-2xl font-semibold text-pearl/70 mb-4">
        Island Not Found
      </h2>
      <p className="text-pearl/40 max-w-md mb-8">
        Looks like you&apos;ve drifted into uncharted waters. The page you&apos;re
        looking for doesn&apos;t exist in our archipelago.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-teal to-ocean-turquoise text-white font-medium hover:shadow-ocean transition-shadow"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-ocean-teal/30 text-ocean-turquoise hover:bg-ocean-teal/10 transition-colors"
        >
          <Search className="h-4 w-4" />
          Explore Destinations
        </Link>
      </div>
    </div>
  );
}
