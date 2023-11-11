import Image from "next/image";
import Link from "next/link";

import { BsArrowRightShort } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";

const Header = () => {
  return (
    <header className="flex flex-1 justify-around items-center bg-slate-300 p-4 mx-2">
      <Link href="/">
        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
          <LuListTodo className="relative w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-blue-800" />
          <h1 className="text-sm md:text-2xl lg:text-4xl font-extrabold">
            Aplikacja ToDo
          </h1>
        </div>
      </Link>
      <Link href="/pages/create-task">
        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-4">
          <p className="text-sm md:text-xl lg:text-2xl font-semibold">
            Nowe zadanie
          </p>
          <BsArrowRightShort className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
        </div>
      </Link>
    </header>
  );
};

export default Header;
