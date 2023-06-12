export interface Review {
    title: string;
    text?: string;
    status: 'approved' | 'disapproved' | 'pending';
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    email?: string;
    name: string;
    date_reviewed: string;
    id?: number;
    date_created?: string;
    date_modified?: string;
}


export interface ReviewCreateParams {
    title: string;
    text?: string;
    status: 'approved' | 'disapproved' | 'pending';
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    email?: string;
    name: string;
    date_reviewed: string;
}

export interface ReviewUpdateParams {
    title?: string;
    text?: string;
    status?: 'approved' | 'disapproved' | 'pending';
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    email?: string;
    name?: string;
    date_reviewed?: string;
}
