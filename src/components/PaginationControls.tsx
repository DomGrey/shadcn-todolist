import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentPage, setTodosPerPage } from "../store/paginationSlice";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const PaginationControls = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const todosPerPage = useSelector(
    (state: RootState) => state.pagination.todosPerPage
  );
  const totalTodos = useSelector(
    (state: RootState) => state.todos.todos.length
  );
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleFirstPage = () => {
    dispatch(setCurrentPage(1));
  };

  const handleLastPage = () => {
    dispatch(setCurrentPage(totalPages));
  };

  const handleTodosPerPageChange = (value: string) => {
    dispatch(setTodosPerPage(Number(value)));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="flex text-center justify-between gap-4 mt-6 w-full">
      <div className="flex items-center gap-4">
        <span className="text-md font-small">Show:</span>
        <Select
          onValueChange={handleTodosPerPageChange}
          defaultValue={todosPerPage.toString()}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="15">15 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-2">
          <Button
            variant={"outline"}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            variant={"outline"}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant={"outline"}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            variant={"outline"}
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
