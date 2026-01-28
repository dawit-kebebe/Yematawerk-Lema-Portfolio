export type AboutType = {
    id: string;
    blockType: 'about';
    section_title: string;
    timeline: TimelineType[];
};

export type TimelineType = {
    date: string;
    title: string;
    description: string;
}