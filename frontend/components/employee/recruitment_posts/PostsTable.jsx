import Link from "next/link";

const PostsTable = ({ posts }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 py-2 sm:px-6 sm:py-3 text-start text-base sm:text-sm"
            >
              <span className="font-semibold text-gray-800">Title</span>
            </th>
            <th
              scope="col"
              className="px-2 py-2 sm:px-6 sm:py-3 text-start w-[120px] sm:w-[175px] text-base sm:text-sm"
            >
              <span className="font-semibold text-gray-800">Role</span>
            </th>
            <th
              scope="col"
              className="px-2 py-2 sm:px-6 sm:py-3 text-start text-base sm:text-sm"
            >
              <span className="font-semibold text-gray-800">Type</span>
            </th>
            <th
              scope="col"
              className="px-2 py-2 sm:px-6 sm:py-3 text-start text-base sm:text-sm"
            >
              <span className="font-semibold text-gray-800">Location</span>
            </th>
            <th
              scope="col"
              className="px-2 py-2 sm:px-6 sm:py-3 text-start text-base sm:text-sm"
            >
              <span className="font-semibold text-gray-800">Experience</span>
            </th>
            <th
              scope="col"
              className="px-2 py-2 sm:px-6 sm:py-3 text-start text-base sm:text-sm"
            >
              <span className="font-semibold text-gray-800">End Date</span>
            </th>
            <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-end"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="bg-white hover:bg-gray-50">
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm">
                  <Link
                    href={`/dashboard/employee/recruitment_post_applicants/${post.id}`}
                  >
                    <span className="block font-semibold text-primary underline">
                      {post.title}
                    </span>
                  </Link>
                </td>
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm">
                  <span className="block text-gray-600">{post.role_apply}</span>
                </td>
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm">
                  <span className="block text-gray-600">
                    {post.employement_type}
                  </span>
                </td>
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm">
                  <span className="block text-gray-600">{post.location}</span>
                </td>
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm">
                  <span className="block text-gray-600">
                    {post.experience_level}
                  </span>
                </td>
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm">
                  <span className="block text-gray-600">
                    {new Date(post.end_date).toLocaleDateString()}
                  </span>
                </td>
                <td className="whitespace-normal break-words px-2 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm"></td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No recruitment posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
