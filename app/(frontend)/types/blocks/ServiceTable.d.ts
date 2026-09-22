export type ServiceTableType = {
    id?: string | null;
    blockType: 'service-table';
    blockSlug?: string | null;
    section_title: string;
    columns?: {
        id?: string | null;
        label: string;
    }[] | null;
    rows?: {
        id?: string | null;
        label: string;
        values?: {
            id?: string | null;
            value?: string | null;
        }[] | null;
    }[] | null;
}
