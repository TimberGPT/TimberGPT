"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProfileSettings from "./_components/ProfileSettings";
import CompanySettings from "./_components/CompanySettings";
import Navbar from "../../../components/common/Navbar";
import { getDecodedToken } from "../../../utils/local-storage";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isAdmin, setIsAdmin] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const decodedToken = getDecodedToken();
    const role = decodedToken?.role;
    const company_id = decodedToken?.company_id;
    const isUserAdmin = role === "Admin" || company_id === null;

    setIsAdmin(isUserAdmin);
    setCompanyId(decodedToken?.company_id);

    const tabParam = searchParams.get("tab");
    if (tabParam === "company" && !isUserAdmin) {
      setActiveTab("profile");
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "profile");
      window.history.pushState({}, "", url);
    } else if (tabParam) {
      setActiveTab(tabParam);
    }

    setMounted(true);
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    router.push(`/dashboard/settings?tab=${tab}`, {
      scroll: false,
      shallow: true,
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f6f9ff]">
        <Navbar />
        <div className="pt-36 pb-6">
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff]">
      <Navbar />
      <div className="pt-36 pb-6">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600"
                }`}
                onClick={() => handleTabChange("profile")}
                aria-current={activeTab === "profile" ? "page" : undefined}
              >
                Profile Settings
              </button>

              {isAdmin && (
                <button
                  className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === "company"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600"
                  }`}
                  onClick={() => handleTabChange("company")}
                >
                  Company Settings
                </button>
              )}
            </nav>
          </div>

          <div className="py-10">
            {activeTab === "profile" ? (
              <ProfileSettings />
            ) : isAdmin ? (
              <CompanySettings companyId={companyId} />
            ) : (
              <ProfileSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
