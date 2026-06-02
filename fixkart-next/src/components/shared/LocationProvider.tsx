"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LOCATIONS } from "@/lib/types";

interface LocationContextType {
  location: string;
  setLocation: (loc: string) => void;
  locations: string[];
}

const LocationContext = createContext<LocationContextType>({
  location: "All Locations",
  setLocation: () => {},
  locations: LOCATIONS,
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState("All Locations");

  useEffect(() => {
    const saved = localStorage.getItem("fk_location");
    if (saved && LOCATIONS.includes(saved)) setLocationState(saved);
  }, []);

  const setLocation = (loc: string) => {
    setLocationState(loc);
    localStorage.setItem("fk_location", loc);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, locations: LOCATIONS }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
