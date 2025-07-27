export const TAG_COLORS = {
  Design: "bg-green-100 text-green-800",
  Research: "bg-yellow-100 text-yellow-800",
  Prototype: "bg-red-100 text-red-800",
  "Design System": "bg-blue-100 text-blue-800",
  Engineering: "bg-purple-100 text-purple-800",
  Writer: "bg-pink-100 text-pink-800",
  Marketing: "bg-indigo-100 text-indigo-800",
  Development: "bg-orange-100 text-orange-800",
};

export const COLUMN_CONFIG = [
  {
    id: "pending",
    title: "Pending",
    countBgColor: "bg-gray-100",
    countTextColor: "text-gray-700",
  },
  {
    id: "inProgress",
    title: "In Progress",
    countBgColor: "bg-yellow-100",
    countTextColor: "text-yellow-800",
  },
  {
    id: "complete",
    title: "Completed",
    countBgColor: "bg-green-100",
    countTextColor: "text-green-800",
  },
];

export const formatStatusLabel = (status) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "inProgress":
      return "In Progress";
    case "complete":
      return "Complete";
    default:
      return status;
  }
};
