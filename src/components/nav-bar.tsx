import {
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  interface Me {
    id: number;
    firstName: string;
    email: string;
    roleName: string;
    roles: string[];
    permissions: string[];
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const navigation = [
    { name: "Дашбоард", path: "/", icon: HomeIcon },
    { name: "Хэрэглэгчид", path: "/users", icon: UsersIcon },
  ];
  
  return (
    <div>
      <div className="fixed inset-y-0 z-50 flex w-72 shadow-lg">
        <div className="flex grow flex-col gap-y-4 overflow-y-auto px-6 pb-4 bg-gradient-to-br from-blue-950 to-[#0e1245]">
          <div className="flex h-16 shrink-0 items-center">
             <Image
                            className="hidden dark:block"
                            src={"/logo.png"}
                            alt="Logo"
                            width={40}
                            height={40}
                            objectFit="cover"
                          />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className={classNames(
                          pathname === item.path
                            ? "bg-blue-700 border-blue-600 text-white"
                            : "text-gray-400 hover:bg-blue-600 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors duration-300 ease-in-out cursor-pointer border border-transparent",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-gray-300 group-hover:text-white"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
