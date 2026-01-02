import React, { useState } from 'react';

// ImageGallery Component - Shows property images with navigation
function ImageGallery({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Jump to specific image
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const handleImageError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
  }

  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="gallery-main">
        <img
          src={`${process.env.PUBLIC_URL}${images[currentIndex]}`}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="gallery-image"
          onError={handleImageError}
        />
        
        {/* Previous Button */}
        <button onClick={prevImage} className="gallery-button prev">
          ‹
        </button>
        
        {/* Next Button */}
        <button onClick={nextImage} className="gallery-button next">
          ›
        </button>

        {/* Image Counter */}
        <div className="gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="gallery-thumbnails">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`${process.env.PUBLIC_URL}${img}`}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => goToImage(idx)}
            className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
            onError={handleImageError}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;