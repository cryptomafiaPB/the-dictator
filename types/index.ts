// Articles interface /app/admin/articles/columns.tsx
export interface Article {
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
    role: "admin" | "editor" | "writer";
    status: "active" | "inactive";
    articles: number;
    lastLogin: string;
    avatarUrl: string;
}
