import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./use-local-storage";

interface FavoriteCity {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number;
}

function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
        "favorites",
        []
    );

    const queryClient = useQueryClient();

    const favouriteQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites
    });

    const addFavorite = useMutation({
        mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
            const newFavorite: FavoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}}`,
                addedAt: Date.now(),
            };

            const exists = favorites.some((fav) => fav.id === newFavorite.id);
            if (exists) return favorites;

            const newFavorites = [...favorites, newFavorite];

            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
    });

    return {
        favorites: favouriteQuery.data,
        addFavorite,
        removeFavorite,
        isFavorite: (lat: number, lon: number) =>
            favorites.some((city) => city.lat === lat && city.lon === lon),
    };
}

export default useFavorite;
