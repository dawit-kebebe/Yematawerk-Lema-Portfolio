export type HeadingNode = {
    title: string;
    id: string;
    tag: string; // 'h1', 'h2', etc.
    children: HeadingNode[];
}