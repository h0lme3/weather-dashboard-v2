import { SearchForm } from "@/components/search-form";
import { EmptyState } from "@/components/empty-state";
import { WeatherBackground } from "@/components/weather-background";
import PageHeader from "@/components/page-header";

export default function Home() {
  return (
    <WeatherBackground condition="Default">
      <div className="max-w-3xl mx-auto space-y-8">
        <PageHeader />

        <SearchForm />

        <EmptyState />
      </div>
    </WeatherBackground>
  );
}
