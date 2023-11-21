
import Head from "next/head"

export const metadata = {
  title: 'IP Tracker',
  description: '"IP Tracker: Your gateway to precision in the online world. Uncover detailed geolocation information instantly with our user-friendly tool. From interactive mapping to historical tracking, empower your online experience for enhanced security, refined analytics, and streamlined network administration. Navigate confidently and understand the digital landscape with IP Tracker."',
  icons:{
    icon: "./icons/favicon.ico?v=4",
    apple: "./icons/apple-touch-icon.png?v=4",
    shortcut: "./icons/apple-touch-icon.png?v=4"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
