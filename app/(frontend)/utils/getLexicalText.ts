import { SerializedEditorState, SerializedLexicalNode, SerializedTextNode } from "@payloadcms/richtext-lexical/lexical";

/**
 * Type guard to check if a node is a TextNode
 */
function isTextNode(node: SerializedLexicalNode): node is SerializedTextNode {
    return 'text' in node && typeof (node as SerializedTextNode).text === 'string';
}

/**
 * Type guard to check if a node has children
 */
function hasChildren(node: SerializedLexicalNode): node is SerializedLexicalNode & { children: SerializedLexicalNode[] } {
    return 'children' in node && Array.isArray(node.children);
}

export const getLexicalText = (
    node: SerializedEditorState<SerializedLexicalNode> | SerializedLexicalNode | SerializedLexicalNode[] | unknown
): string => {
    // 1. Handle SerializedEditorState (Top level)
    if (node && typeof node === 'object' && 'root' in node) {
        const state = node as SerializedEditorState;
        return state.root.children.map(getLexicalText).join(' ');
    }

    // 2. Handle Array of nodes
    if (Array.isArray(node)) {
        return node.map(getLexicalText).join(' ');
    }

    // 3. Handle Single Lexical Node
    if (node && typeof node === 'object' && 'type' in node) {
        const lexicalNode = node as SerializedLexicalNode;

        if (isTextNode(lexicalNode)) {
            return lexicalNode.text;
        }

        if (hasChildren(lexicalNode)) {
            return lexicalNode.children.map(getLexicalText).join(' ');
        }
    }

    return '';
};