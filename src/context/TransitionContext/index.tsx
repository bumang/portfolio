import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import gsap from 'gsap';

interface TransitionContextProps {
  timeline: gsap.core.Timeline;
  setTimeline: Dispatch<SetStateAction<gsap.core.Timeline>>;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timeline, setTimeline] = useState(() => {
    return gsap.timeline({
      paused: true,
    });
  });

  const contextValue = useMemo(() => ({ timeline, setTimeline }), [timeline, setTimeline]);

  return <TransitionContext.Provider value={contextValue}>{children}</TransitionContext.Provider>;
};

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionContext must be used within a TransitionContext');
  }
  return context;
};
