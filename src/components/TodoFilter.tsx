import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoryFilter, setStatusFilter } from "../store/filterSlice";
import { fetchCategories } from "../api/categoryApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TodoFilter = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories([{ id: "All", name: "All Categories" }, ...data]);
    };
    loadCategories();
  }, []);

  return (
    <div className="flex gap-4 mb-4">
      <Select
        onValueChange={(value) => dispatch(setCategoryFilter(value))}
        defaultValue="All"
      >
        <SelectTrigger className=" max-w-xs">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => dispatch(setStatusFilter(value))}
        defaultValue="All"
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Incomplete">Incomplete</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TodoFilter;
