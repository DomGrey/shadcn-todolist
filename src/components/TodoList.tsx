import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/todoSlice";
import { RootState } from "../store/store";
import { fetchTodos } from "../api/todoApi";
import { fetchCategories } from "../api/categoryApi";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
              <Badge
                style={{
                  backgroundColor: categoryDetails.color,
                  color: "white",
                }}
              >
                {categoryDetails.name}
              </Badge>
            </div>
            <Accordion type="single" collapsible className="w-full mt-2">
              <AccordionItem value={todo.id}>
                <AccordionTrigger className="text-gray-500 dark:text-gray-300"></AccordionTrigger>
                <AccordionContent>
                  <p>{todo.description || "No description available."}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
