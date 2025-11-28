"use client";
import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { TodoFilter } from "./TodoFilter";
import { TodoStats } from "./TodoStats";
import { Tag, TodoWithTags } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, List } from "lucide-react";
import { Button } from "@/components/ui";

interface TodoListProps {
    todos: TodoWithTags[];
    tags: Tag[];
    onAddTodo: (title: string, description: string, category: string, tagIds: string[]) => void;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoList({
    todos,
    tags,
    onAddTodo,
    onToggleComplete,
    onDelete
}: TodoListProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("view");

    const filteredTodos = todos.filter(todo => {
        // Filter by tag
        const tagMatch = selectedTag
            ? todo.tags.some(tag => tag.id === selectedTag)
            : true;

        // Filter by category
        const categoryMatch = selectedCategory
            ? (todo.category === selectedCategory || selectedCategory === "All")
            : true;

        return tagMatch && categoryMatch;
    });



    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="view" className="flex items-center gap-2">
                        <List className="h-4 w-4" />
                        View Todos
                    </TabsTrigger>
                    <TabsTrigger value="add" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Todo
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="add">
                    <div className="rounded-lg ">
                        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
                        <TodoForm tags={tags} onSubmit={onAddTodo} />
                    </div>
                </TabsContent>

                <TabsContent value="view">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <TodoFilter
                                tags={tags}
                                selectedTag={selectedTag}
                                selectedCategory={selectedCategory}
                                onSelectTag={setSelectedTag}
                                onSelectCategory={setSelectedCategory}
                            />
                            <TodoStats todos={filteredTodos} />
                        </div>

                        <div className="space-y-2">
                            {filteredTodos.length === 0 ? (
                                <div className="text-center py-8 bg-muted/30 rounded-lg">
                                    <List className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">
                                        {selectedTag
                                            ? "No tasks found with this tag."
                                            : "No tasks found. Add a new task to get started!"}
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => setActiveTab("add")}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Your First Task
                                    </Button>
                                </div>
                            ) : (
                                filteredTodos.map(todo => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        onToggleComplete={onToggleComplete}
                                        onDelete={onDelete}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}