import { useState } from "react";
import { MoreVertical, Edit, Trash, Eye } from "lucide-react";
import Link from "next/link";

const PostActions = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Link
            href={`/dashboard/employee/recruitment/${postId}`}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Eye size={16} className="mr-2" />
            View
          </Link>
          <Link
            href={`/dashboard/employee/recruitment/edit/${postId}`}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Edit size={16} className="mr-2" />
            Edit
          </Link>
          <button
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              // Handle delete logic
              setIsOpen(false);
            }}
          >
            <Trash size={16} className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostActions;
