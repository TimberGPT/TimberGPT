import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mt-20 flex flex-col mx-auto size-full align-center justify-center">
      {/* ========== MAIN CONTENT ========== */}
      <main id="content">
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
            404
          </h1>

          <p className="mt-3 text-gray-600">Oops, something went wrong.</p>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find your page.
          </p>

          <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
            <div className="relative mx-auto pb-5 w-[300px] h-[300px]">
              <Image
                src="https://i.ibb.co/rRwsR1x6/error-illustration.png"
                alt="404-error"
                fill
                style={{ objectFit: "contain" }}
                priority
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>

          <div className="mt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 py-3 px-8 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      {/* ========== END MAIN CONTENT ========== */}

      {/* ========== FOOTER ========== */}
      <footer className="mt-auto text-center py-5">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© All Rights Reserved. 2025.</p>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}
    </div>
  );
}
