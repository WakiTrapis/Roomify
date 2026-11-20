export interface PrintRow {
    label: string;
    value: string;
}

export interface PrintDocument {
    title: string;
    reference: string;
    rows: PrintRow[];
    photoUrl: string | null;
    seal: string | null;
}