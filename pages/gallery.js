import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/gallery.module.css";

import { VintageTV } from "../components/tv/VintageTV";
import { galleryImagesManifest } from "../components/Gallery/galleryImagesManifest";

export default function GalleryPage() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFadeOut(scrollPosition > window.innerHeight / 9);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Convert manifest into objects expected by VintageTV
  const tvImages = galleryImagesManifest.map((url, i) => ({
    name: `Image ${i + 1}`,
    url,
  }));

  // ✅ Put your youtube links here
  const youtubeLinks = [
    "https://www.youtube.com/watch?v=S-ukmg7hPnk",
    "https://www.youtube.com/watch?v=FSBZHSo1zVw",
  ];

  return (
    <>
      <Head>
        <title>Anwesha 2024 Glimpse</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.psyBackground}>
           <div className={styles.psyAurora}></div>
        </div>
        {/* Fullscreen Text with Fading Effect */}
        <div
          className={`${styles.fullscreenText} ${fadeOut ? styles.fadeOut : ""}`}
        >
          <div className={styles.glimpse}>GLIMPSE</div>
          <div className={styles.anwesha}>
            <span className={styles.anweshaA}>A</span>
            NWESHA
            <span className={styles.anwesha24}>&apos;24</span>
          </div>
        </div>

        {/* ✅ TV Section */}
        <div className={styles.tvWrapper}>
          {/* ✅ Debug line (open console) */}
          {console.log("✅ Images passed to TV:", tvImages.length, tvImages[0])}

          <VintageTV images={tvImages} youtubeLinks={youtubeLinks} />
        </div>
      </div>
    </>
  );
}
