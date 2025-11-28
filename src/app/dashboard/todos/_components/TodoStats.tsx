import { TodoWithTags } from "../types";

interface TodoStatsProps {
  todos: TodoWithTags[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const completionPercentage = totalTodos > 0
    ? Math.round((completedTodos / totalTodos) * 100)
    : 0;

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div>
        <span className="font-medium">{totalTodos}</span> tasks
      </div>
      <div>
        <span className="font-medium">{completedTodos}</span> completed
      </div>
      <div>
        <span className="font-medium">{completionPercentage}%</span> done
      </div>
    </div>
  );
}