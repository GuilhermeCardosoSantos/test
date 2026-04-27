// favorite.store.ts

import { create } from "zustand"
import { persist } from "zustand/middleware"

type FavoritesState = {
    favorites: string[]
    toggleFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],

            toggleFavorite: (id) => {
                set((state) => {
                    const exists = state.favorites.includes(id)

                    return {
                        favorites: exists
                            ? state.favorites.filter((item) => item !== id)
                            : [...state.favorites, id],
                    }
                })
            },

            isFavorite: (id) => {
                return get().favorites.includes(id)
            },
        }),
        {
            name: "favorites-storage",
        }
    )
)