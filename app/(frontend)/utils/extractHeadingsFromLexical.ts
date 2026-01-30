import { SerializedEditorState, SerializedLexicalNode, SerializedElementNode } from "@payloadcms/richtext-lexical/lexical";
import { getLexicalText } from "./getLexicalText";
import slugify from "slugify";
import { HeadingNode } from "../types/HeadingNode";

/**
 * Represents the specific structure of a Lexical Heading
 */
interface SerializedHeadingNode extends SerializedElementNode {
    type: 'heading';
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Type guard to verify if a node is a heading
 */
function isHeadingNode(node: unknown): node is SerializedHeadingNode {
    return (
        node !== null &&
        typeof node === 'object' &&
        'type' in node &&
        (node as SerializedLexicalNode).type === 'heading' &&
        'tag' in node
    );
}

/**
 * Type guard to check for nodes that can have children
 */
function isElementNode(node: unknown): node is SerializedElementNode {
    return node !== null && typeof node === 'object' && 'children' in node && Array.isArray((node as any).children);
}

// const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const extractHeadingsFromLexical = (
    data: SerializedEditorState | SerializedLexicalNode | SerializedLexicalNode[] | unknown
): HeadingNode[] => {
    const rawHeadings: HeadingNode[] = [];

    const traverse = (node: unknown) => {
        // 1. If it's a heading, extract it
        if (isHeadingNode(node)) {
            const text = getLexicalText(node);
            rawHeadings.push({
                title: text,
                id: slugify(text, { lower: true, strict: true }),
                tag: node.tag,
                children: []
            });
        }

        // 2. Recursively check children
        if (isElementNode(node)) {
            node.children.forEach(traverse);
        }
    };

    // Initialize traversal based on input type
    if (data && typeof data === 'object' && 'root' in data) {
        traverse((data as SerializedEditorState).root);
    } else if (Array.isArray(data)) {
        data.forEach(traverse);
    } else {
        traverse(data);
    }

    // 3. Hierarchy construction (Standard Stack Algorithm)
    const tree: HeadingNode[] = [];
    const stack: HeadingNode[] = [];

    rawHeadings.forEach((heading) => {
        const level = parseInt(heading.tag.replace('h', ''), 10);

        while (stack.length > 0) {
            const lastItem = stack[stack.length - 1];
            const lastLevel = parseInt(lastItem.tag.replace('h', ''), 10);

            if (lastLevel < level) break;
            stack.pop();
        }

        if (stack.length === 0) {
            tree.push(heading);
        } else {
            stack[stack.length - 1].children.push(heading);
        }
        stack.push(heading);
    });

    return tree;
};