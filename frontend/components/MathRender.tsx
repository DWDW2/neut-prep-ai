// components/MathRenderer.js

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
interface Props {
    expression: string
}
const MathRenderer = ({ expression }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      // eslint-disable-next-line react/no-children-prop
      children={expression}
      components={{
        p: ({ node, ...props }) => <span {...props} />, // Render paragraphs as spans
      }}
    />
  );
};

export default MathRenderer;
