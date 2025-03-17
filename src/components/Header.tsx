import { ModeToggle } from "./Mode-toggle";

const Header = () => {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between">
      <h1 className="text-black  py-4 text-2xl font-bold">Todo App</h1>
      <ModeToggle />
    </header>
  );
};

export default Header;
