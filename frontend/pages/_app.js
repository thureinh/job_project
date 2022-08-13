import 'bootstrap/dist/css/bootstrap.css'
import "@/public/assets/css/animate.min.css";
import "@/public/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "@/public/assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import '../styles/style.css'
import { useEffect } from 'react';
import HomeLayout from 'layouts/Home'

function MyApp({ Component, pageProps, ...appProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])
  if ([`/dashboard`].includes(appProps.router.pathname))
    return <Component {...pageProps} />
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  )
}

export default MyApp
