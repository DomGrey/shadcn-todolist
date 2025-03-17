import Layout from "./components/Layout";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout></Layout>
      </ThemeProvider>
    </>
  );
};
export default App;
