import Header from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto max-w-2xl">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
