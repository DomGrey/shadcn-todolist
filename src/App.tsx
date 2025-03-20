import Layout from "./components/Layout";
import { ThemeProvider } from "@/components/Theme-provider";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { Toaster } from "sonner";
import TodoStats from "./components/TodoStats";
import TodoFilter from "./components/TodoFilter";
import PaginationControls from "./components/PaginationControls";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Toaster position="top-right" />
          <AddTodoForm />
          <TodoFilter />
          <TodoList />
          <PaginationControls />
          <TodoStats />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default App;
