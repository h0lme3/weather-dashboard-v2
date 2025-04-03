"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error);
      setError(error.error);
      toast.error("An error occurred", {
        description: error.error?.message || "Something went wrong",
      });
    };

    window.addEventListener("error", handleError);

    // Also handle unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error(
        "Unhandled promise rejection caught by error boundary:",
        event
      );
      setError(
        new Error(event.reason?.message || "An unexpected error occurred")
      );
    };

    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  if (error) {
    let errorMessage =
      error.message ||
      "An unexpected error occurred while fetching weather data.";

    // Check for common API errors
    if (errorMessage.includes("Too many requests")) {
      errorMessage =
        "API rate limit exceeded. Please try again in a few minutes.";
    }

    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p className="mb-4">{errorMessage}</p>
          <p className="text-sm mb-4">
            This could be due to an invalid city name, network issues, API rate
            limits, or other API limitations.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setError(null);
              window.history.pushState({}, "", "/");
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
