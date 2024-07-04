// components/MathRenderer.js

import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
interface Props {
    expression: string;
}
const MathRenderer = ({ expression }: Props ) => {
  return <BlockMath>{expression}</BlockMath>;
};

export default MathRenderer;
