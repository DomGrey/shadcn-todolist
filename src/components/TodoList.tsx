import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/todoSlice";
import { RootState } from "../store/store";
import { fetchTodos, deleteTodo } from "../api/todoApi";
import { fetchCategories } from "../api/categoryApi";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";
import { RxCross2 } from "react-icons/rx";
import EditTodoDialog from "./EditTodoDialog";
import { SlArrowDown } from "react-icons/sl";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const selectedStatus = useSelector(
    (state: RootState) => state.filter.selectedStatus
  );
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const todosPerPage = useSelector(
    (state: RootState) => state.pagination.todosPerPage
  );
  const [categories, setCategories] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

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
  const handleToggleComplete = async (todoId: string, completed: boolean) => {
    await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    const updatedTodos = await fetchTodos();
    dispatch(setTodos(updatedTodos));

    toast.success(`Todo marked as ${!completed ? "completed" : "incomplete"}`);
  };

  const handleDeleteTodo = async (todoId: string, todoText: string) => {
    const confirmed = confirm(`Are you sure you want to delete "${todoText}"?`);
    if (!confirmed) return;

    await deleteTodo(todoId);

    const updatedTodos = await fetchTodos();
    dispatch(setTodos(updatedTodos));

    toast.error(`Todo "${todoText}" deleted!`);
  };

  const handleToggleExpand = (todoId: string) => {
    setExpandedTodo((prev) => (prev === todoId ? null : todoId));
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesCategory =
      selectedCategory === "All" || todo.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Completed" && todo.completed) ||
      (selectedStatus === "Incomplete" && !todo.completed);

    return matchesCategory && matchesStatus;
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <div className="space-y-3 mt-4">
      {currentTodos.map((todo) => {
        const categoryDetails = getCategoryDetails(todo.category);
        return (
          <div
            key={todo.id}
            className="border rounded-lg bg-white dark:bg-gray-800 shadow p-4"
            onClick={() => handleToggleExpand(todo.id)}
          >
            <div className=" flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => {
                    handleToggleComplete(todo.id, todo.completed);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <h2
                  className={`text-lg font-semibold ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  style={{
                    backgroundColor: categoryDetails.color,
                    color: "white",
                  }}
                >
                  {categoryDetails.name}
                </Badge>
                <SlArrowDown />
                <EditTodoDialog todo={todo} />
                {/* <Accordion type="single" collapsible className=" mt-2">
                <AccordionItem value={todo.id}>
                  <AccordionTrigger className="text-gray-500 dark:text-gray-300"></AccordionTrigger>
                  <AccordionContent>
                    <p>{todo.description || "No description available."}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}
                <RxCross2
                  size={24}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTodo(todo.id, todo.text);
                  }}
                />
              </div>
            </div>
            {expandedTodo === todo.id && (
              <div className="col-span-full mt-4 w-full border-t pt-3">
                <p className="text-gray-600 dark:text-gray-300">
                  {todo.description || "No description available."}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
