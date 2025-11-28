"use client";

import { useState } from "react";
import { defaultTodos, defaultTags } from "./data";
import { Todo, TodoWithTags, Tag } from "./types";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./_components/TodoList";
import { DashboardHeader } from "../_components";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);
  const [tags] = useState<Tag[]>(defaultTags);

  // Add tags to todos for display
  const todosWithTags: TodoWithTags[] = todos.map((todo) => ({
    ...todo,
    tags: todo.tags.map((tagId) => tags.find((tag) => tag.id === tagId)!),
  }));

  const handleAddTodo = (title: string, description: string, category: string, tagIds: string[]) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      tags: tagIds,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 grow-1">
      <DashboardHeader title="Interactive To-Do List" />

      <div className="p-4">
        <TodoList
          todos={todosWithTags}
          tags={tags}
          onAddTodo={handleAddTodo}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
