import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                <script src="http://pro-1816608956215787878.frontendapi.corbado.io/auth.js"></script>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
