// Articles interface /app/admin/articles/columns.tsx
export interface ArticleColumn {
    id: string
    title: string
    author: {
        name: string
        avatar: string
    }
    status: "published" | "draft" | "archived"
    category: string
    views: number
    likes: number
    publishedDate: string
}

// User interface /app/admin/users/columns.tsx
export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "editor" | "reader";
    status: "active" | "inactive";
    articles: number;
    lastLogin: string;
    avatarUrl: string;
}

// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: 'admin' | 'editor' | 'reader';
// }

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Tag {
    id: string;
    name: string;
}

export interface Comment {
    id: string;
    content: string;
    flagged: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Report {
    id: string;
    reason: string;
    resolved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type Status = 'draft' | 'pending' | 'published' | 'rejected';

// export interface Article {
//     id: string;
//     title: string;
//     content: string;
//     slug: string;
//     image?: string;
//     published: boolean;
//     status: Status;
//     shares: number;
//     flagged: boolean;
//     createdAt: Date;
//     updatedAt: Date;
//     views: number;
//     likes: number;
//     dislikes: number;
//     authorId: string;
//     author: User;
//     categoriesIDs: string[];
//     categories: Category[];
//     tagsIDs: string[];
//     tags: Tag[];
//     comments: Comment[];
//     reports: Report[];
// }

export type Role = "admin" | 'editor' | 'reader';

export interface Activity {
    id: string;
    action: string;
    timestamp: Date;
    userId: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

import { Prisma } from "@prisma/client"

export type Article = {
    id: string
    title: string
    content: string
    slug: string
    image: string | null
    published: boolean
    status: Status
    shares: number
    flagged: boolean
    createdAt: Date
    updatedAt: Date
    views: number
    likes: number
    dislikes: number
    authorId: string
    categoriesIDs: string[]
    tagsIDs: string[]
    author?: {
        name: string
        email: string
        image?: string
    }
    categories?: {
        id: string
        name: string
    }[]
    tags?: {
        id: string
        name: string
    }[]
}

export type ArticleWithRelations = Prisma.ArticleGetPayload<{
    include: {
        author: true
        categories: true
        tags: true
    }
}>