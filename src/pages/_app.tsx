import Head from 'next/head'
import Script from 'next/script'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'

function App({ Component, pageProps: { ...pageProps } }: any) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  )

  // đăng kí service worker.
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/service-worker.js')
  //       .then((registration) => console.log('scope is: ', registration.scope));
  //   }
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Yumy shop của vợ yêu</title>
          <link rel='icon' href='/favicon.ico' />
          <meta charSet='utf-8' />
        </Head>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
          <Analytics />
        </SessionProvider>
        <Script src='https://widget.cloudinary.com/v2.0/global/all.js'></Script>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)

// QueryClient that allows the queries to interact with the cache.
// And for your QueryClient to be globally available for your application,
// you need to wrap your application with the QueryClientProvider.
