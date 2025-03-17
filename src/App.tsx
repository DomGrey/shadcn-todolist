import Layout from "./components/Layout";
import { ThemeProvider } from "@/components/theme-provider";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <AddTodoForm />
          <TodoList />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default App;
