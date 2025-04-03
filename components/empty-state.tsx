import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center p-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm">
      <div className="mx-auto w-24 h-24 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-4">
        <Search className="h-12 w-12 text-sky-500 dark:text-sky-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">Search for a city</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Enter a city name in the search box above to see the current weather
        conditions and forecast.
      </p>
    </div>
  );
}
