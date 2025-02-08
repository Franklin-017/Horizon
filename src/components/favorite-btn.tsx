import { WeatherData } from "@/api/types";
import useFavourite from "@/hooks/use-favourite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavouriteButtonProps {
    data: WeatherData;
}

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
    const { addFavorite, isFavorite, removeFavorite } = useFavourite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavourites = () => {
        if (isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error((`Removed ${data.name} from favorites`))
        } else {
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            })
            toast.success((`Added ${data.name} from favorites`))
        }
    };
    return (
        <Button
            variant={isCurrentlyFavorite ? "default" : "outline"}
            size={"icon"}
            className={
                isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
            }
            onClick={handleToggleFavourites}
        >
            <Star
                className={`h-4 w-4 ${
                    isCurrentlyFavorite ? "fill-current" : ""
                }`}
            />
        </Button>
    );
};

export default FavouriteButton;
