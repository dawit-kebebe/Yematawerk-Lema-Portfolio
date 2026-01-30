export type AboutType = {
    id: string;
    blockType: 'about';
    blockSlug: string;
    section_title: string;
    timeline: TimelineType[];
    cta: {
        label: string;
        url: string;
    }
};

export type TimelineType = {
    date: string;
    title: string;
    description: string;
}