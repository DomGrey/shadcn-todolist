import Layout from "./components/Layout";
import { ThemeProvider } from "@/components/theme-provider";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <TodoList />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default App;
