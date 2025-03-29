import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import getRatio from './getRatio';
import { ImageProps } from './types';

// ----------------------------------------------------------------------
/* eslint-disable react/display-name */

const Image = forwardRef<HTMLSpanElement, ImageProps>(
  ({ ratio, disabledEffect = false, effect = 'blur', ...other }, ref) => {
    const content = (
      <LazyLoadImage
        wrapperClassName="wrapper"
        effect={disabledEffect ? 'opacity' : effect}
        placeholderSrc={
          disabledEffect ? '/assets/transparent.png' : '/assets/placeholder-new.png'
        }
        width="100%"
        style={{ objectFit: 'cover' }}
        {...other}
      />
    );

    if (ratio) {
      return (
        <span
          ref={ref}
          style={{
            width: 1,
            lineHeight: 1,
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            paddingTop: getRatio(ratio),
          }}
        >
          <div style={{ position: 'relative', display: 'block' }}>{content}</div>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        style={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', display: 'block' }}>{content}</div>
      </span>
    );
  }
);

export default Image;


// import type React from "react"

// interface ImageProps {
//   src: string
//   alt: string
//   ratio?: number | string
//   width?: number | string
//   height?: number | string
// }

// const Image: React.FC<ImageProps> = ({ src, alt, ratio, width, height }) => {
//   const parsedRatio = typeof ratio === "string" ? Number.parseFloat(ratio.replace("/", "/")) : ratio

//   const imageStyle = {
//     width: width ? width : "auto",
//     height: height ? height : "auto",
//   }

//   if (parsedRatio) {
//     const ratioStyle = {
//       width: 1,
//       lineHeight: 1,
//       display: "block",
//       overflow: "hidden",
//       position: "relative",
//       paddingTop: `${(parsedRatio * 100).toFixed(2)}%`,
//     }
//     return (
//       <div style={{ display: "block", position: "relative" }}>
//         <div style={ratioStyle}>
//           <img src={src || "/placeholder.svg"} alt={alt} style={{ width: "100%", height: "100%" }} />
//         </div>
//       </div>
//     )
//   } else {
//     return <img src={src || "/placeholder.svg"} alt={alt} style={imageStyle} />
//   }
// }

// export default Image



