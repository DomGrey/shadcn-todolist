import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, toggleTodo } from "../store/todoSlice";
import { RootState } from "../store/store";
import { fetchTodos } from "../api/todoApi";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      dispatch(setTodos(data));
    };
    loadTodos();
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{todo.text}</h2>
            <span className="px-3 py-1 text-sm rounded-lg bg-gray-500 text-white">
              {todo.category}
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-300">{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
