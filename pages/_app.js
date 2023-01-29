import '../styles/globals.css'
import { AuthContextProvider, useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Script from 'next/script'
import ProtectedRoute from '../components/ProtectedRoute'
import SystemNotification from '../components/SystemNotification'
import OfferOverlay from '../components/OfferOverlay'
import Router from 'next/router';
import LoadingOverlay from '../components/Painel/LoadingOverlay'
import { useEffect } from 'react'

Router.events.on("routeChangeError", (err, url, { shallow }) => {
    console.log("Navigating to: " + "url: " + url, {cancelled: err} )
});

const noAuthRequired = ['/', '/login', '/signup']

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const { loading } = useAuth()

  useEffect(()=>{
    console.log("LOADING: ", loading)
  }, [loading])

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
          {
            loading &&
            <LoadingOverlay/>
          }
        </ProtectedRoute>
      )}

      <SystemNotification/>


      <OfferOverlay/>

      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-P2W368DGW0" />

      <Script id="google-analytics" strategy="afterInteractive" >
        {
          `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-P2W368DGW0');

    `
        }
      </Script>
    </AuthContextProvider>
  )
}

export default MyApp
