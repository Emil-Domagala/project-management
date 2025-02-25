import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSideBarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import { MenuIcon, Moon, Search, Settings, Sun, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: currentUser } = useGetAuthUserQuery();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* search bar */}

      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSideBarCollapsed(!isSidebarCollapsed))}
          >
            <MenuIcon className="size-8 dark:text-white" />
          </button>
        )}

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>
      {/* Icons */}

      <div className="flex items-center">
        <button
          className={`rounded p-2 ${isDarkMode ? "dark:hover:bg-gray-700" : "dark:hover:bg-gray-100"}`}
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
          {isDarkMode ? (
            <Sun className="size-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="size-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={`h-min w-min rounded p-2 ${isDarkMode ? "dark:hover:bg-gray-700" : "dark:hover:bg-gray-100"}`}
        >
          <Settings className="size-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block" />
        <div className="hidden items-center justify-between md:flex">
          <div className="flex size-9 items-center justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_AMAZON_S3_BASE_URL}/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Picture"}
                width={100}
                height={100}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="size-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
