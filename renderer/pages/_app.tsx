import { NextUIProvider, globalCss } from '@nextui-org/react';
import { SocketContext } from '../context';
import { SocketStore } from '../store/SocketStore';

const globalStyles = globalCss({
  body: { margin: 0, background: 'red', height: '100vh' },
});

function MyApp({ Component, pageProps }) {
  return (
    <SocketContext.Provider value={new SocketStore()}>
      <NextUIProvider>
        {globalStyles()}
        <Component {...pageProps} />
      </NextUIProvider>
    </SocketContext.Provider>
  );
}

export default MyApp;
