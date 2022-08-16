import 'bootstrap/dist/css/bootstrap.css'
import "@/public/assets/css/animate.min.css"
import "@/public/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0"
import "@/public/assets/css/demo.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import '../styles/style.css'
import { useEffect } from 'react';
import HomeLayout from 'layouts/Home'
import AdminLayout from 'layouts/Admin'
import LoginLayout from 'layouts/Login'
import { SWRConfig } from 'swr'
import fetchJson from 'lib/fetchJson'
import { Provider } from 'react-redux';
import { store } from 'store/store'
import Axios from 'axios'

const layouts = {
  homeLayout: HomeLayout,
  adminLayout: AdminLayout,
  loginLayout: LoginLayout
}

Axios.defaults.baseURL = process.env.API_BASE_URL
Axios.defaults.withCredentials = true

function MyApp({ Component, pageProps, ...appProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])
  const Layout = layouts[Component.layout] || layouts.homeLayout
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  )
}

export default MyApp
