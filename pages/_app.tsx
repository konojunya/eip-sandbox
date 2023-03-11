import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import {breakpoints, styles, textStyles} from '../styles/theme';
import {ThirdwebProvider} from '@thirdweb-dev/react';

const theme = extendTheme({styles, breakpoints, textStyles});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThirdwebProvider activeChain="ethereum">
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
