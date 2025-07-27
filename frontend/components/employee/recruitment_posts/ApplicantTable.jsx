"use client";

const renderStars = (rating) => {
  if (rating == null) return null;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        className="inline-block w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    );
  }
  if (halfStar) {
    stars.push(
      <svg
        key="half"
        className="inline-block w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-grad)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
        />
      </svg>
    );
  }
  return stars;
};

const ApplicantTable = ({
  currentItems,
  checkedApplicants,
  handleCheckboxChange,
}) => {
  return (
    <div className="max-w-[85rem] mx-auto mt-6 bg-white rounded-xl shadow p-10">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-sm table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <th className="p-4 rounded-l-lg">
                <input
                  type="checkbox"
                  checked={
                    currentItems.length > 0 &&
                    currentItems.every((a) => checkedApplicants.includes(a.id))
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const ids = currentItems
                        .map((a) => a.id)
                        .filter((id) => !checkedApplicants.includes(id));
                      ids.forEach(handleCheckboxChange);
                    } else {
                      const ids = currentItems
                        .map((a) => a.id)
                        .filter((id) => checkedApplicants.includes(id));
                      ids.forEach(handleCheckboxChange);
                    }
                  }}
                />
              </th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">CV Rating</th>
              <th className="p-4 text-left">CV Feedback</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left rounded-r-lg">CV</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg"
                >
                  No applicants have applied yet.
                </td>
              </tr>
            ) : (
              currentItems.map((applicant, idx) => (
                <tr
                  key={applicant.id}
                  className={`border-b transition hover:bg-blue-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      checked={checkedApplicants.includes(applicant.id)}
                      onChange={() => handleCheckboxChange(applicant.id)}
                    />
                  </td>
                  <td className="p-4 align-middle font-semibold text-gray-800">
                    {applicant.name}
                  </td>
                  <td className="p-4 align-middle text-blue-700">
                    {applicant.email}
                  </td>
                  <td className="p-4 align-middle">{applicant.phone}</td>
                  <td className="p-4 align-middle">
                    {applicant.cv_rating === null ||
                    applicant.cv_rating === undefined ? (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    ) : (
                      <span className="font-semibold flex items-center gap-1">
                        {renderStars(applicant.cv_rating)}
                        <span className="ml-1 text-gray-600 text-xs">
                          {applicant.cv_rating}
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="p-4 align-middle text-gray-700">
                    {applicant.cv_feedback}
                  </td>
                  <td className="p-4 align-middle">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        applicant.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : applicant.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-primary-dark transition"
                      onClick={() => window.open(applicant.cv_pdf, "_blank")}
                    >
                      View CV
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantTable;
