import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Not Found",
  description:
    "We couldn't find the city you're looking for. Please check the spelling and try again.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400">
            We couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
