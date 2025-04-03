"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

interface ErrorDisplayProps {
  error: Error;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  useEffect(() => {
    // Show toast notification when error occurs
    toast.error("Error fetching weather data", {
      description:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }, [error]);

  let errorMessage =
    error.message ||
    "An unexpected error occurred while fetching weather data.";

  // Check for common API errors
  if (errorMessage.includes("Too many requests")) {
    errorMessage =
      "API rate limit exceeded. Please try again in a few minutes.";
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-medium">Error fetching weather data</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          {errorMessage}
        </p>
        <div className="mt-2">
          <Button
            variant="outline"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
