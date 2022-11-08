import { NextUIProvider, globalCss } from '@nextui-org/react';
import { SocketContext, socket } from '../context';

const globalStyles = globalCss({
  body: { margin: 0, background: 'red', height: '100vh' },
});

function MyApp({ Component, pageProps }) {
  return (
    <SocketContext.Provider value={socket}>
      <NextUIProvider>
        {globalStyles()}
        <Component {...pageProps} />
      </NextUIProvider>
    </SocketContext.Provider>
  );
}

export default MyApp;
