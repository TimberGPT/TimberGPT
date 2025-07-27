// "use client";

// import React from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import CustomForm from "@/components/form/CustomForm";
// import CustomInput from "@/components/form/CustomInput";
// import CustomTextarea from "@/components/form/CustomTextarea";
// import CustomSelect from "@/components/form/CustomSelect";
// import Breadcrumb from "../common/Breadcrumb";

// // Validation schema using Zod
// const projectSchema = z.object({
//   projectName: z.string().min(1, "Project name is required"),
//   description: z.string().optional(),
//   projectStatus: z.string().optional(),
//   priorityLevel: z.string().optional(),
//   dueDate: z.string().optional(),
//   endDate: z.string().optional(),
//   category: z.string().optional(),
// });

// const ProjectSettings = ({ projectData, onSubmit }) => {
//   const handleFormSubmit = (data) => {
//     console.log("Form submitted:", data);
//     if (onSubmit) {
//       onSubmit(data);
//     }
//   };

//   const categoryOptions = [
//     { value: "", label: "Select a category" },
//     { value: "webDevelopment", label: "Web Development" },
//     { value: "mobileApp", label: "Mobile App" },
//     { value: "uiUxDesign", label: "UI/UX Design" },
//     { value: "branding", label: "Branding" },
//     { value: "marketing", label: "Marketing" },
//     { value: "contentCreation", label: "Content Creation" },
//     { value: "seo", label: "SEO" },
//     { value: "other", label: "Other" },
//   ];

//   const defaultValues = {
//     projectName: projectData?.projectName || "",
//     description: projectData?.description || "",
//     projectStatus: projectData?.projectStatus || "",
//     priorityLevel: projectData?.priorityLevel || "",
//     dueDate: projectData?.dueDate || "",
//     endDate: projectData?.endDate || "",
//     category: projectData?.category || "",
//   };

//   return (
//     <>
//       <Breadcrumb
//         items={[{ label: "Projects Overview", href: "#" }]}
//         currentPage="Project Settings"
//       />

//       <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-8 mx-auto">
//         <CustomForm
//           onSubmit={handleFormSubmit}
//           resolver={zodResolver(projectSchema)}
//           defaultValues={defaultValues}
//         >
//           {/* Card */}
//           <div className="bg-white rounded-xl shadow-xs">
//             <div className="pt-0 p-4 sm:pt-0 sm:p-7">
//               {/* Grid */}
//               <div className="space-y-4 sm:space-y-3">
//                 <div className="pt-3 space-y-2">
//                   <label
//                     htmlFor="projectName"
//                     className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                   >
//                     Project name
//                   </label>

//                   <CustomInput
//                     name="projectName"
//                     placeholder="Enter project name"
//                     className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="description"
//                     className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                   >
//                     Description
//                   </label>

//                   <CustomTextarea
//                     name="description"
//                     rows={6}
//                     placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
//                     className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="projectStatus"
//                     className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                   >
//                     Project Status
//                   </label>

//                   <CustomInput
//                     name="projectStatus"
//                     placeholder="In Progress"
//                     className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="priorityLevel"
//                     className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                   >
//                     Priority Level
//                   </label>

//                   <CustomInput
//                     name="priorityLevel"
//                     placeholder="High"
//                     className="py-1.5 sm:py-2 px-3 pe-11 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
//                   <div className="flex-1">
//                     <label
//                       htmlFor="dueDate"
//                       className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                     >
//                       Due date
//                     </label>
//                     <CustomInput
//                       name="dueDate"
//                       type="date"
//                       className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label
//                       htmlFor="endDate"
//                       className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                     >
//                       End date
//                     </label>
//                     <CustomInput
//                       name="endDate"
//                       type="date"
//                       className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label
//                     htmlFor="category"
//                     className="inline-block text-sm font-medium text-gray-800 mt-2.5"
//                   >
//                     Category
//                   </label>

//                   <CustomSelect
//                     name="category"
//                     options={categoryOptions}
//                     className="py-1.5 sm:py-2 px-3 pe-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-purple-500 focus:ring-purple-500"
//                   />
//                 </div>
//               </div>
//               {/* End Grid */}

//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   className="w-full text-center py-3 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
//                 >
//                   Add project
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* End Card */}
//         </CustomForm>
//       </div>
//     </>
//   );
// };

// export default ProjectSettings;
