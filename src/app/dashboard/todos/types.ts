export type Tag = {
    id: string;
    name: string;
    color: string;
};

export type Todo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    tags: string[]; // Array of tag IDs
    category: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TodoWithTags = Omit<Todo, 'tags'> & {
    tags: Tag[];
};