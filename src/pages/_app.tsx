import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { gsap } from 'gsap';

import Transition from '@/components/ui/Transition';
import { MyContextProvider, TransitionProvider } from '@/context';
import { drukTrail } from '@/styles/fonts/DrukTrial';

import '@/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const globalTimeline = gsap.timeline({
  paused: true,
});

const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <main className={`${drukTrail.variable} relative h-screen w-screen overflow-y-hidden`}>
      <MyContextProvider>
        <TransitionProvider>
          <Transition>{getLayout(<Component key={router.route} {...pageProps} />)}</Transition>
        </TransitionProvider>
      </MyContextProvider>
    </main>
  );
};

export default App;
