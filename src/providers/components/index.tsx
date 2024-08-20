"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface IAuthData {
  setSidebar: Dispatch<SetStateAction<boolean>>;
  sidebar: boolean;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ComponentsContext = createContext<IAuthData>({} as IAuthData);

export const ComponentsProvider = ({ children }: ICihldrenReact) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <ComponentsContext.Provider
      value={{
        setSidebar,
        sidebar,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};
