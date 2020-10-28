export class Book {
    title: string;
    publishDate: string;
    thumbnailUrl: string;
    shortDescription: string;
    authors: string;
    availability: boolean;
    id: number;
    rentedFrom?: string;
    rentedTo?: string;
}
