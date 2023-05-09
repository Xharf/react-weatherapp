import "@/styles/Home.css";
import * as dotenv from "dotenv";
dotenv.config();

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
