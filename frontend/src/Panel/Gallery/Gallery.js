import React, { useState, useEffect, useMemo } from "react";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import Lightbox styles
import "./Gallery.css";

export default function Gallery() {
  const images = useMemo(() => [
    { src: "./ESPArtboard 1.jpg", caption: "Smart projects ahead!" },
    { src: "./SnakeArtboard 1.jpg", caption: "Save snakes, save nature!" },
    { src: "./BugArtboard 1.jpg", caption: "Find, fix, repeat!" },
    { src: "./projectArtboard 1.jpg", caption: "Finally, it’s live!" },
    { src: "./MEArtboard 1.jpg", caption: "Passion meets logic!" },
  ], []);

  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [fade, setFade] = useState(false);

  // Function to open lightbox
  const openLightbox = () => setIsLightboxOpen(true);

  // Function to close lightbox
  const closeLightbox = () => setIsLightboxOpen(false);

  // Auto-slide effect every 4 seconds with smooth caption change
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]); // Use images.length instead of images to avoid dependency issues

  return (
    <div className="gallery-container">
      <div>
        <h6 className="gallery-title">My Gallery</h6>
        <div className="gallery-image-container" onClick={openLightbox}>
          <img
            src={images[currentImage].src}
            alt={`Gallery item ${currentImage + 1}`}
            className="gallery-image"
          />
        </div>
        {isLightboxOpen && (
          <ReactImageLightbox
            mainSrc={images[currentImage].src}
            nextSrc={images[(currentImage + 1) % images.length].src}
            prevSrc={images[(currentImage - 1 + images.length) % images.length].src}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setCurrentImage((currentImage - 1 + images.length) % images.length)
            }
            onMoveNextRequest={() =>
              setCurrentImage((currentImage + 1) % images.length)
            }
          />
        )}

        <div className={`caption-box ${fade ? "fade-out" : "fade-in"}`}>
          <h4 className="caption-text">{images[currentImage].caption}</h4>
        </div>
      </div>
    </div>
  );
}
