import React, { useState, useEffect } from 'react';
import './Image.css';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export type ImageProps = {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  fit?: ImageFit;
  radius?: number | string;
  /**
   * Optional low-quality placeholder (LQIP) or React node shown while loading.
   * If a string is provided it will be used as an inline background image.
   */
  placeholder?: React.ReactNode | string | null;
  /**
   * Optional fallback image URL to use when the primary src fails to load.
   */
  fallbackSrc?: string | null;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Decorative images should pass alt="" per accessibility best practices.
   */
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    srcSet,
    sizes,
    width,
    height,
    loading = 'lazy',
    fit = 'cover',
    radius = 4,
    placeholder = null,
    fallbackSrc = null,
    className = '',
    style = {},
    onError,
    onLoad,
    ...rest
  },
  ref
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      // attempt to load fallback; don't mark error until fallback errors too
      return;
    }
    setHasError(true);
    if (onError) onError(e);
  };

  const wrapperStyle: React.CSSProperties = {
    width: width ?? 'auto',
    height: height ?? 'auto',
    borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
    overflow: 'hidden',
    display: 'inline-block',
    lineHeight: 0,
    ...style
  };

  const imgStyle: React.CSSProperties = {
    width: width ? '100%' : undefined,
    height: height ? '100%' : undefined,
    objectFit: fit,
    display: isLoaded && !hasError ? 'block' : 'none'
  };

  const placeholderNode =
    typeof placeholder === 'string' ? (
      <div
        className="img__placeholder"
        style={{ backgroundImage: `url(${placeholder})`, borderRadius: wrapperStyle.borderRadius }}
        aria-hidden="true"
      />
    ) : placeholder ? (
      <div className="img__placeholder" style={{ borderRadius: wrapperStyle.borderRadius }} aria-hidden="true">
        {placeholder}
      </div>
    ) : (
      <div className="img__skeleton" aria-hidden="true" style={{ borderRadius: wrapperStyle.borderRadius }} />
    );

  return (
    <div className={`img__wrap ${className}`} style={wrapperStyle}>
      {!isLoaded && !hasError && placeholderNode}
      {hasError ? (
        <div className="img__error" role="img" aria-label="Image failed to load">
          {/* decorative fallback UI */}
          <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
            <path fill="#9CA3AF" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14h18zM8 11l2.5 3 2.5-3L16 15H8z" />
          </svg>
        </div>
      ) : (
        <img
          ref={ref}
          src={currentSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={loading}
          style={imgStyle}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      )}
    </div>
  );
});

Image.displayName = 'Image';