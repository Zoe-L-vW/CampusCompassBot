import { useState } from "react";
import { Tag } from "../types";
import { Plus, X } from "lucide-react";
import { Button, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { CATEGORIES } from "../data";

interface TodoFormProps {
    tags: Tag[];
    onSubmit: (title: string, description: string, category: string, selectedTags: string[]) => void;
}

// Predefined categories

export function TodoForm({ tags, onSubmit }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit(title, description, category, selectedTags);
        setTitle("");
        setDescription("");
        setCategory("");
        setSelectedTags([]);
    };

    const toggleTag = (tagId: string) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg  shadow-sm">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                    Task Title *
                </Label>
                <Input
                    id="title"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg py-5"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                    Description
                </Label>
                <Textarea
                    id="description"
                    placeholder="Add details about this task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-medium">
                        Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-base font-medium">
                        Tags
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Button
                                key={tag.id}
                                type="button"
                                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                                size="sm"
                                className={`rounded-full transition-all ${selectedTags.includes(tag.id) ? tag.color : ''}`}
                                onClick={() => toggleTag(tag.id)}
                            >
                                {tag.name}
                                {selectedTags.includes(tag.id) && (
                                    <X className="h-3 w-3 ml-1" />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    size="lg"
                    className="gap-1 px-6 font-medium"
                    disabled={!title.trim()}
                >
                    <Plus className="h-5 w-5" />
                    Add Task
                </Button>
            </div>
        </form>
    );
}