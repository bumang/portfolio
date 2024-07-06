import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface MyContextProps {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  routeFromMenu: boolean;
  setRouteFromMenu: Dispatch<SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [routeFromMenu, setRouteFromMenu] = useState(false);

  const contextValue = useMemo(
    () => ({ menuIsOpen, setMenuIsOpen, routeFromMenu, setRouteFromMenu }),
    [menuIsOpen, setMenuIsOpen, routeFromMenu, setRouteFromMenu]
  );

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
