"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActiveLink = (path) => {
    if (path === "/dashboard" && pathname === "/") {
      return true;
    }

    if (path === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }

    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-primary fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-9">
        {/* Left links */}
        <div className="flex space-x-8 text-[18px] font-medium">
          <Link
            href="/dashboard"
            className={`transition-colors ${
              isActiveLink("/dashboard")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/project"
            className={`transition-colors ${
              isActiveLink("/dashboard/project")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Project
          </Link>
          <Link
            href="/dashboard/sales"
            className={`transition-colors ${
              isActiveLink("/dashboard/sales")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Transaction
          </Link>
          <Link
            href="/dashboard/employee"
            className={`transition-colors ${
              isActiveLink("/dashboard/employee")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Employee
          </Link>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="https://i.ibb.co/KcwP41RL/betterstart-logo.png"
            alt="BetterStart"
            width={250}
            height={70}
            className="h-8 w-auto"
            priority
          />
        </div>

        {/* Right links + avatar */}
        <div className="flex items-center space-x-6 text-[18px] font-medium">
          <Link
            href="/dashboard/extras"
            className={`transition-colors ${
              isActiveLink("/dashboard/extras")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Extras
          </Link>
          <Link
            href="/dashboard/pricing"
            className={`transition-colors ${
              isActiveLink("/dashboard/pricing")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/dashboard/settings"
            className={`transition-colors ${
              isActiveLink("/dashboard/settings")
                ? "text-primary font-semibold"
                : "text-gray-700 hover:text-primary"
            }`}
          >
            Settings
          </Link>
          <span className="h-6 border-l border-gray-300"></span>
          <div className="flex items-center space-x-2">
            <Image
              src="https://i.pravatar.cc/32"
              alt="User avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">maomislive</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
