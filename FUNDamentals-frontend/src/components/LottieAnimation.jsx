import React from 'react';
import Lottie from 'lottie-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = ({ 
  src, 
  width = 184, 
  height = 184, 
  speed = 1, 
  autoplay = true, 
  loop = true,
  className = '',
  fallbackIcon = 'trending_up'
}) => {
  const [animationData, setAnimationData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchAnimation = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Check if it's a .lottie file (ZIP format) or .json file
        if (src.endsWith('.lottie')) {
          // For .lottie files, we don't need to fetch JSON data
          // The DotLottieReact component will handle the file directly
          setLoading(false);
        } else {
          const response = await fetch(src);
          if (!response.ok) {
            throw new Error('Failed to fetch animation');
          }
          const data = await response.json();
          setAnimationData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
        setError(true);
        setLoading(false);
      }
    };

    if (src) {
      fetchAnimation();
    }
  }, [src]);

  if (loading) {
    return (
      <div 
        className={`lottie-loading ${className}`}
        style={{ width, height }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`lottie-fallback ${className}`}
        style={{ width, height }}
      >
        <span className="material-icons" style={{ fontSize: `${Math.min(width, height) * 0.6}px`, color: '#6236FF' }}>
          {fallbackIcon}
        </span>
      </div>
    );
  }

  // Handle .lottie files with DotLottieReact
  if (src.endsWith('.lottie')) {
    return (
      <div className={`lottie-container ${className}`} style={{ width, height }}>
        <DotLottieReact
          src={src}
          loop={loop}
          autoplay={autoplay}
          speed={speed}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  // Handle .json files with regular Lottie
  if (!animationData) {
    return (
      <div 
        className={`lottie-fallback ${className}`}
        style={{ width, height }}
      >
        <span className="material-icons" style={{ fontSize: `${Math.min(width, height) * 0.6}px`, color: '#6236FF' }}>
          {fallbackIcon}
        </span>
      </div>
    );
  }

  return (
    <div className={`lottie-container ${className}`} style={{ width, height }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;
