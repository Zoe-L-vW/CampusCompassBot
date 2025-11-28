import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tag } from "../types";
import { Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        description: string;
        category: string;
        completed: boolean;
        tags: Tag[];
    };
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
    const [showDetails, setShowDetails] = useState(false);
    
    const hasDetails = todo.description || todo.category;

    return (
        <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-start gap-4 flex-1">
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggleComplete(todo.id)}
                    className="h-5 w-5 rounded-full mt-0.5"
                />
                
                <div className="flex-1 space-y-2">
                    <div 
                        className={`flex items-start justify-between ${hasDetails ? 'cursor-pointer' : ''}`}
                        onClick={() => hasDetails && setShowDetails(!showDetails)}
                    >
                        <p className={`text-base font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {todo.title}
                        </p>
                        
                        {hasDetails && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground ml-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(!showDetails);
                                }}
                            >
                                {showDetails ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </Button>
                        )}
                    </div>
                    
                    {showDetails && (
                        <div className="space-y-3 pt-2 pl-2 border-l-2 border-muted">
                            {todo.description && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                                    <p className="text-sm text-foreground/90">{todo.description}</p>
                                </div>
                            )}
                            
                            {todo.category && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                        {todo.category}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {todo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {todo.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className={`${tag.color} text-white text-xs px-2 py-1 rounded-full`}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="text-muted-foreground hover:text-destructive ml-2 flex-shrink-0"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}