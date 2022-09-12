import Head from "next/head"

function Layout({ title, children }) {
    return (
        <>
            <div>
                <Head>
                    <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                    <meta name="description" content="Ecommerce Website" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    {children}
                </main>
                <footer>
                    footer
                </footer>
            </div>
        </>
    )
}

export default Layout