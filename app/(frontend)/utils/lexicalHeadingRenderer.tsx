import { SerializedElementNode } from '@payloadcms/richtext-lexical/lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';
import { JSX } from 'react';
import slugify from 'slugify';

interface HeadingNode extends SerializedElementNode {
    type: 'heading';
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const lexicalHeadingRenderer: JSXConverter<HeadingNode> = ({ node, nodesToJSX }) => {
    // 1. Get the raw text for the ID
    // We map the children nodes directly before they become JSX
    const text = node.children
        .map((child: any) => child.text || '')
        .join('');

    const id = slugify(text, { lower: true, strict: true });

    // 2. Determine the HTML tag
    const Tag = node.tag as keyof JSX.IntrinsicElements;

    // 3. Return ACTUAL JSX, not an object
    return (
        <Tag id={id} className="scroll-mt-24">
            {nodesToJSX({ nodes: node.children })}
        </Tag>
    );
}

export default lexicalHeadingRenderer;