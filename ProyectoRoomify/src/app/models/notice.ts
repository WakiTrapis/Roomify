export type NoticeType = 'norma' | 'comunicado';

export interface Notice {
    id: string;
    title: string;
    content: string;
    type: NoticeType;
    date: string;
}
