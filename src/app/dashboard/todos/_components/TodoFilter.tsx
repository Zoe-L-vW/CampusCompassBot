import { Tag } from "../types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

// Predefined categories (same as in your TodoForm)
const CATEGORIES = [
    "Getting started",
    "Before arrival",
    "First Steps",
    "Settling In",
    "Work",
    "Personal",
    "Urgent",
    "Low Priority"
];

interface TodoFilterProps {
    tags: Tag[];
    selectedTag: string | null;
    selectedCategory: string | null;
    onSelectTag: (tagId: string | null) => void;
    onSelectCategory: (category: string | null) => void;
}

export function TodoFilter({ 
    tags, 
    selectedTag, 
    selectedCategory, 
    onSelectTag, 
    onSelectCategory 
}: TodoFilterProps) {
    return (
        <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Filter by Category</h3>
                <div className="flex flex-wrap gap-2 items-center">
                    <Select value={selectedCategory || ""} onValueChange={(value) => onSelectCategory(value || null)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            {CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    {selectedCategory && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectCategory(null)}
                            className="flex items-center gap-1"
                        >
                            {selectedCategory}
                            <X className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Tag Filter */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Filter by Tags</h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedTag === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSelectTag(null)}
                    >
                        All Tags
                    </Button>
                    {tags.map((tag) => (
                        <Button
                            key={tag.id}
                            variant={selectedTag === tag.id ? "default" : "outline"}
                            size="sm"
                            className={selectedTag === tag.id ? tag.color : ''}
                            onClick={() => onSelectTag(tag.id)}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Active Filters Display */}
            {(selectedTag || selectedCategory) && (
                <div className="flex items-center gap-2 pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {selectedCategory && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            Category: {selectedCategory}
                            <X 
                                className="h-3 w-3 ml-1 cursor-pointer" 
                                onClick={() => onSelectCategory(null)} 
                            />
                        </span>
                    )}
                    {selectedTag && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            Tag: {tags.find(t => t.id === selectedTag)?.name}
                            <X 
                                className="h-3 w-3 ml-1 cursor-pointer" 
                                onClick={() => onSelectTag(null)} 
                            />
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            onSelectTag(null);
                            onSelectCategory(null);
                        }}
                        className="text-xs h-7"
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}