// Define the Space interface
export interface Space {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    membersCount?: number; // Optional, as it may not always be provided
    price_per_day?: number; // Daily rate for bookings
    capacity?: number; // Space capacity
    location?: string; // Space location
    }

export interface SpaceImages {
    id: string;
    spaceId: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}    


export interface SpaceMember {
    id: string;
    spaceId: string;
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
}

export interface SpaceInvitation {
    id: string;
    spaceId: string;
    email: string;
    invitedBy: string;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceSettings {
    id: string;
    spaceId: string;
    allowPublicAccess: boolean;
    enableNotifications: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceActivity {
    id: string;
    spaceId: string;
    userId: string;
    action: 'created' | 'updated' | 'deleted' | 'joined' | 'left';
    timestamp: Date;
}


export interface SpaceAnalytics {
    spaceId: string;
    totalMembers: number;
    activeMembers: number;
    totalActivities: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceNotification {
    id: string;
    spaceId: string;
    userId: string;
    message: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpacePermission {
    id: string;
    spaceId: string;
    userId: string;
    canEdit: boolean;
    canDelete: boolean;
    canInvite: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceTag {
    id: string;
    spaceId: string;
    tagName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceCategory {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpaceCategoryAssignment {
    id: string;
    spaceId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

