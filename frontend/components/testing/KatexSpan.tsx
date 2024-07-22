'use client';
import renderMathInElement from 'katex/dist/contrib/auto-render.js';
import 'katex/dist/katex.min.css';
import { useEffect, useRef, HTMLAttributes } from 'react';

interface KatexSpanProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const KatexSpan: React.FC<KatexSpanProps> = ({ text, ...delegated }) => {
  const katexTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (katexTextRef.current) {
      renderMathInElement(katexTextRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [text]);

  return (
    <div ref={katexTextRef} {...delegated}>
      {text}
    </div>
  );
}

export default KatexSpan;
