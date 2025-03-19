import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/todoSlice";
import { RootState } from "../store/store";
import { fetchTodos } from "../api/todoApi";
import { fetchCategories } from "../api/categoryApi";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [categories, setCategories] = useState<
    { id: string; name: string; color: string }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      const [todosData, categoriesData] = await Promise.all([
        fetchTodos(),
        fetchCategories(),
      ]);
      dispatch(setTodos(todosData));
      setCategories(categoriesData);
    };
    loadData();
  }, [dispatch]);

  const getCategoryDetails = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: "Unknown",
        color: "#6b7280",
      }
    );
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const categoryDetails = getCategoryDetails(todo.category);
        return (
          <div
            key={todo.id}
            className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{todo.text}</h2>
              <span
                className="px-3 py-1 text-sm rounded-lg text-white"
                style={{ backgroundColor: categoryDetails.color }}
              >
                {categoryDetails.name}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-300">
              {todo.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
