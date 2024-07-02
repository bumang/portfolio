import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import gsap from 'gsap';

import { MyContextProvider } from '@/context';
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

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <MyContextProvider>
      <main className={`${drukTrail.variable} relative h-screen w-screen overflow-y-hidden`}>
        {getLayout(
          <div>
            <Component {...pageProps} />
            {/* <div className="preloader z-50 bg-transparent">
              <HomePreLoader onExitAnimation={() => setExitAnimation(true)} />
            </div> */}
          </div>
        )}
        {/* <div className="slide-out invisible absolute left-0 top-[100vh] z-[70] h-full w-full bg-primary-darkBlue" /> */}
        {/* <div className="slide-out-second invisible absolute left-0 top-[100vh] z-[70] h-full w-full bg-background-preLoader" /> */}
      </main>
    </MyContextProvider>
  );
};

export default App;
