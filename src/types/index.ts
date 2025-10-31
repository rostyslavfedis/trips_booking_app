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
export interface Place {
    id: string;
    tripId: string;
    locationName: string;
    notes?: string;
    dayNumber: number;
    createdBy: string;
}

export interface NewPlace {
    tripId: string;
    locationName: string;
    notes?: string;
    dayNumber: number;
}

