export type User = {
    uid: string;
    email: string;
    displayName?: string;
};

export interface Trip {
    id: string;
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    ownerId: string;
    collaborators?: string[];
    createdAt?: any;
    updatedAt?: any;
}

