import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTodos } from "../store/todoSlice";
import { fetchTodos, addTodo } from "../api/todoApi";
import { fetchCategories } from "../api/categoryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
      setCategory(data.length > 0 ? data[0].id : "");
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category) return;

    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
      description,
    };

    await addTodo(newTodo);

    // Fetch updated todos
    const updatedTodos = await fetchTodos();
    dispatch(setTodos(updatedTodos));

    toast.success(`Todo "${text}" added!`);

    // Clear form
    setText("");
    setCategory(categories.length > 0 ? categories[0].id : "");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-center gap-2 mb-4 py-4">
      <Input
        className="w-full"
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">
        <FaPlus /> Add
      </Button>
    </form>
  );
};

export default AddTodoForm;
