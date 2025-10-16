import { createContext, useState, useEffect } from "react";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  // Get saved preferences from localStorage or use defaults
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  };

  const getInitialItemsPerPage = () => {
    const saved = localStorage.getItem("itemsPerPage");
    return saved ? Number(saved) : 10;
  };

  const getInitialFavorites = () => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  };

  const [theme, setThemeState] = useState(getInitialTheme);
  const [itemsPerPage, setItemsPerPageState] = useState(getInitialItemsPerPage);
  const [favorites, setFavoritesState] = useState(getInitialFavorites);

  // Persist theme and apply to HTML element
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Persist items per page
  const setItemsPerPage = (count) => {
    setItemsPerPageState(count);
    localStorage.setItem("itemsPerPage", count);
  };

  // Persist favorites
  const setFavorites = (newFavorites) => {
    setFavoritesState(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Toggle favorite
  const toggleFavorite = (user) => {
    const isFavorite = favorites.some(fav => fav.id === user.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== user.id);
    } else {
      newFavorites = [...favorites, user];
    }
    
    setFavorites(newFavorites);
  };

  // Check if user is favorite
  const isFavorite = (userId) => {
    return favorites.some(fav => fav.id === userId);
  };

  // Reset all preferences
  const resetPreferences = () => {
    setTheme("light");
    setItemsPerPage(10);
    setFavorites([]);
    localStorage.removeItem("theme");
    localStorage.removeItem("itemsPerPage");
    localStorage.removeItem("favorites");
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        setTheme,
        itemsPerPage,
        setItemsPerPage,
        favorites,
        toggleFavorite,
        isFavorite,
        resetPreferences
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};