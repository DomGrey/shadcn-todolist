import Layout from "./components/Layout";
import { ThemeProvider } from "@/components/Theme-provider";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Toaster richColors />
          <AddTodoForm />
          <TodoList />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default App;
