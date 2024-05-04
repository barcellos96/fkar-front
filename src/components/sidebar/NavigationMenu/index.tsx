"use client";

import Link from "next/link";
import { navigationMain, navigationSecond } from "./navigation";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path?: string;
}

type NavigationList = NavigationItem[];

export function MainNavigation() {
  const pathname = usePathname();

  const renderLevels = (data: NavigationList) => {
    return data.map((item, index) => {
      return (
        <Link
          key={index}
          href={item.path ?? "#"}
          className={`${
            item.path === pathname && "border-l border-green-700 bg-green-50"
          } flex text-base font-medium text-zinc-800 rounded px-3 py-3 hover:bg-zinc-100 transition duration-300 ease-linear`}
        >
          {<item.icon size={18} className="mr-2" />}
          {item.name}
        </Link>
      );
    });
  };

  return <>{renderLevels(navigationMain)}</>;
}

export function SecondNavigation() {
  const pathname = usePathname();

  const renderLevels = (data: NavigationList) => {
    return data.map((item, index) => {
      return (
        <Link
          key={index}
          href={item.path ?? "#"}
          className={`${
            item.path === pathname && "border-l border-green-700 bg-green-50"
          } flex text-base font-medium text-zinc-800 rounded px-3 py-3 hover:bg-zinc-100 transition duration-300 ease-linear`}
        >
          {<item.icon size={18} className="mr-2" />}
          {item.name}
        </Link>
      );
    });
  };

  return <>{renderLevels(navigationSecond)}</>;
}
