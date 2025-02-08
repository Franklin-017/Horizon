import CurrentWeather from "@/components/CurrentWeather";
import FavouriteButton from "@/components/favorite-btn";
import { HourlyTemperature } from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import { WeatherForecast } from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    const coordinates = { lat, lon };

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Fail to load weather data. Please try again.</p>
                </AlertDescription>
            </Alert>
        );
    }

    if (weatherQuery.isLoading || forecastQuery.isLoading || !params.cityname) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {params.cityname}, {weatherQuery.data?.sys.country}
                </h1>
                <div>
                    <FavouriteButton data={{...weatherQuery.data, name: params.cityname}} />
                </div>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <CurrentWeather data={weatherQuery.data} />

                    <HourlyTemperature data={forecastQuery.data} />
                </div>
                <div className="grid gap-6 grid-cols-1 items-start">
                    <WeatherForecast data={forecastQuery.data} />
                    <WeatherDetails data={weatherQuery.data} />
                </div>
            </div>
        </div>
    );
};

export default CityPage;
