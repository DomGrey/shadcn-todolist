import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const TodoStats = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="flex justify-between text-sm mt-6 border-t-2 py-5">
      <span>Total: {totalTodos} todos</span>
      <span>Active: {activeTodos} todos</span>
      <span>Completed: {completedTodos} todos</span>
      <span>{completionPercentage}% completed</span>
    </div>
  );
};

export default TodoStats;
