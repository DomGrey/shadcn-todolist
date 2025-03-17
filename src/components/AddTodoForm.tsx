import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTodos } from "../store/todoSlice";
import { fetchTodos } from "../api/todoApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
      description,
    };

    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    // Fetch updated todos
    const updatedTodos = await fetchTodos();
    dispatch(setTodos(updatedTodos));

    // Clear form
    setText("");
    setCategory("General");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-center space-y-4 p-4">
      <Input
        className="w-full"
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <Select onValueChange={setCategory} defaultValue={category}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="General">General</SelectItem>
          <SelectItem value="Work">Work</SelectItem>
          <SelectItem value="Personal">Personal</SelectItem>
        </SelectContent>
      </Select>

      {/* <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}

      <Button type="submit">+ Todo</Button>
    </form>
  );
};

export default AddTodoForm;
