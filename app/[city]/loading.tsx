import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-sky-500" />
        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
          Loading weather data...
        </p>
      </div>
    </div>
  );
}
