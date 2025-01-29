import { RootState } from "@/store";
import { logout } from "@/store/auth-slice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { message } from "@/utils/toast";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";

import useSWR from "swr";
import { authApi } from "@/apis";
export function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      dispatch(logout());
      router.push("/auth/login");
    } catch (error: any) {
      message.error("Алдаа гарлаа");
    }
  };
  interface Me {
    id: number;
    firstName: string;
    email: string;
    roleName: string;
    roles: string[];
    permissions: string[];
  }
  
  const { data: meData, isLoading, error } = useSWR<Me>(
    "swr.me.data", 
    () => authApi.me(), 
    { revalidateOnFocus: false, shouldRetryOnError: false } 
  );

  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", onClick: logOut },
  ];

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button> */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          />
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Image
                alt="avatar"
                width={50}
                height={50}
                src="https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-8 w-8 rounded-full bg-gray-50"
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  aria-hidden="true"
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                >
                {meData?.roleName}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 text-gray-400"
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    >
                      {item.name}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
