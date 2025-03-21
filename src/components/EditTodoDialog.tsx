import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setTodos } from "../store/todoSlice";
import { fetchTodos, updateTodo } from "../api/todoApi";
import { fetchCategories } from "../api/categoryApi";
import { FaPencil } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const EditTodoDialog = ({ todo }: { todo: any }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.text);
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState(todo.category);
  const [completed, setCompleted] = useState(todo.completed);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleSave = async () => {
    const updatedTodo = {
      ...todo,
      text: title,
      description,
      category,
      completed,
    };

    await updateTodo(updatedTodo);

    const updatedTodos = await fetchTodos();
    dispatch(setTodos(updatedTodos));

    toast.success("Todo updated successfully!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FaPencil size={18} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo Title"
            required
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-full">
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
          <div className="flex items-center gap-2">
            <Checkbox
              checked={completed}
              onCheckedChange={(checked) => setCompleted(checked as boolean)}
            />
            <span>Mark as Completed</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog;
