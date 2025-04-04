"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("City page error:", error);

    // Show toast notification
    toast.error("Error fetching weather data", {
      description:
        error.message || "An unexpected error occurred. Please try again.",
    });

    // Update the document title
    document.title = "Error";
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold">Weather Data Error</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {error.message || "An error occurred while fetching weather data."}
          </p>
          <div className="flex gap-4 mt-4">
            <Button onClick={reset} variant="default">
              Try again
            </Button>
            <Button onClick={() => router.push("/")} variant="outline">
              Go home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
