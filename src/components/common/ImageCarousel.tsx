import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Define image types
interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  infiniteLoop?: boolean;
  showThumbs?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
  interval?: number;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  infiniteLoop = true,
  showThumbs = false,
  showStatus = false,
  showIndicators = true,
  interval = 5000,
  className = '',
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`image-carousel-container ${className}`}>
      <Carousel
        autoPlay={autoPlay}
        infiniteLoop={infiniteLoop}
        showThumbs={showThumbs}
        showStatus={showStatus}
        showIndicators={showIndicators}
        interval={interval}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
        className="carousel-container"
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide relative h-full">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="object-cover w-full"
              style={{ 
                width: '100%', 
                height: '100%',
                objectPosition: 'center center'
              }}
            />
            {(image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent text-left">
                {image.title && <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{image.title}</h3>}
                {image.description && <p className="text-white text-sm md:text-base">{image.description}</p>}
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
