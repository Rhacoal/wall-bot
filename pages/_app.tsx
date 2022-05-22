import '../styles/globals.css'

function MyApp(props: { Component: any, pageProps: any }) {
    return <props.Component {...props.pageProps} />
}

export default MyApp
