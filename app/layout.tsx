"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./store/RecoilProvider";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    return () => {
      document.removeEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
    };
  }, []);
  // useEffect(() => {
  //   const fetchBackground = async () => {
  //     try {
  //       const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKGROUND}`,{
  //         headers:{
  //           Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  //         }
  //       });
  //       // console.log(result.data.data[0].attributes.Image.data.attributes.url);
  //       const imageUrl = `${process.env.NEXT_PUBLIC_CMS_URL}${result.data.data[0].attributes.Image.data.attributes.url}`;

  //       if (imageUrl) {
  //         document.documentElement.style.setProperty(
  //           "--background-image-url",
  //           `url(${imageUrl})`
  //         );
  //       }
  //     } catch (error) {
  //       console.error('Error fetching Background:', error);
  //     }
      
  //   };

  //   fetchBackground();
  // }, []);
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/lovethyself.jpeg" /> 
      </head>
      <RecoilProvider>
        <body className={`${inter.className} flex`}>
          <div className="hgJtvv"></div>
          <div className="topright"></div>
          <div className="bottomleft"></div>
          <div className="bottomright"></div>
          {children}
        </body>
      </RecoilProvider>
    </html>
  );
}
