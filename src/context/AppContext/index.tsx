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
  mousePosition: { x: number; y: number };
  setMousePosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  fromProjectsPage: boolean;
  setFromProjectsPage: Dispatch<SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [routeFromMenu, setRouteFromMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [fromProjectsPage, setFromProjectsPage] = useState(false);

  const contextValue = useMemo(
    () => ({
      menuIsOpen,
      setMenuIsOpen,
      routeFromMenu,
      setRouteFromMenu,
      mousePosition,
      setMousePosition,
      fromProjectsPage,
      setFromProjectsPage,
    }),
    [
      menuIsOpen,
      setMenuIsOpen,
      routeFromMenu,
      setRouteFromMenu,
      mousePosition,
      setMousePosition,
      fromProjectsPage,
      setFromProjectsPage,
    ]
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
