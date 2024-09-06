"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FiltersContextProps {
  query: string;
  setQuery: (query: string) => void;
  searchButton: boolean;
  setSearchButton: Dispatch<SetStateAction<boolean>>;
  datesFilter: boolean;
  setDatesFilter: Dispatch<SetStateAction<boolean>>;
  start_date: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  end_date: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  submitDates: boolean;
  setSubmitDates: Dispatch<SetStateAction<boolean>>;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [searchButton, setSearchButton] = useState(false);
  const [datesFilter, setDatesFilter] = useState(false);
  const [start_date, setStartDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [submitDates, setSubmitDates] = useState(false);

  return (
    <FiltersContext.Provider
      value={{
        query,
        setQuery,
        searchButton,
        setSearchButton,
        datesFilter,
        setDatesFilter,
        start_date,
        setStartDate,
        end_date,
        setEndDate,
        submitDates,
        setSubmitDates,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
