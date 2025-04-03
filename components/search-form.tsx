"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SearchFormProps {
  initialCity?: string;
}

export function SearchForm({ initialCity = "" }: SearchFormProps) {
  const [city, setCity] = useState(initialCity || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setIsLoading(true);

    try {
      // Update the URL with the search query
      router.push(`/?city=${encodeURIComponent(city.trim())}`);

      // Add a small delay to ensure the URL is updated before refreshing
      setTimeout(() => {
        router.refresh();
        setIsLoading(false);
      }, 100);
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 bg-white dark:bg-slate-800"
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
