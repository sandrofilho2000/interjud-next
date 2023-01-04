import '../styles/globals.css'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Script from 'next/script'
import ProtectedRoute from '../components/ProtectedRoute'

const noAuthRequired = ['/', '/login', '/signup']

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}

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
