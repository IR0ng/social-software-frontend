import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '~/components/Navbar'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const AUTH_PAGE = ['/login', '/sign-up']

  const shouldShowNavbar = !AUTH_PAGE.includes(router.pathname)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-1 flex-row">
        {shouldShowNavbar && <Navbar />}
        <Component className="flex flex-1" {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
