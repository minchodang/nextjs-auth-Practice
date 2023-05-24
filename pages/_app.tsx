import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
