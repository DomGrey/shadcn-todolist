import { ModeToggle } from "./Mode-toggle";

const Header = () => {
  return (
    <header className=" flex items-center justify-between">
      <h1 className="py-4 text-2xl font-bold">Todo App</h1>
      <ModeToggle />
    </header>
  );
};

export default Header;
