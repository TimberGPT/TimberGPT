// chatting.zip/chatting/ImageUploadForm.jsx
import { useState } from "react";
import { Upload, X } from "lucide-react";

const ImageUploadForm = ({ onAnalyzeImages, isLoading }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Array to hold multiple files

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    if (files.length > 2) {
      alert("Please select a maximum of two images.");
      setSelectedFiles([]); // Clear selection if too many
      event.target.value = ""; // Reset input
    } else {
      setSelectedFiles(files);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure exactly two files are selected before analyzing
    if (selectedFiles.length === 2) {
      // Pass the two specific files to the parent component
      // Assuming selectedFiles[0] is for defect, selectedFiles[1] for ring count
      onAnalyzeImages(selectedFiles[0], selectedFiles[1]);
    } else {
      alert(
        "Please select exactly two images to proceed: one for Defect Analysis and one for Ring Count Analysis."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col items-center justify-center w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3 text-center">
          Upload Images for Analysis
        </h4>

        {selectedFiles.length === 0 ? (
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-2 pb-3">
              <Upload className="w-6 h-6 mb-1 text-gray-400" />
              <p className="mb-1 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                (Select two JPG, PNG files)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              multiple // Allow multiple file selection
            />
          </label>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {selectedFiles.map((file, index) => (
              <div
                key={file.name + index}
                className="relative p-2 border rounded-md flex flex-col items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="max-w-full h-auto rounded-md max-h-32 object-contain mb-2"
                />
                <p className="text-xs text-gray-700 truncate w-full text-center">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {index === 0 ? "(Defect Analysis)" : "(Ring Count Analysis)"}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={selectedFiles.length !== 2 || isLoading} // Ensure exactly two files are selected
        className={`mt-4 w-full inline-flex items-center justify-center gap-x-2 px-4 py-2 text-sm font-medium rounded-lg ${
          selectedFiles.length === 2 && !isLoading
            ? "bg-[#6FB110] text-white hover:bg-primary-700"
            : "bg-[#6FB110] text-white cursor-not-allowed"
        }`}
      >
        {isLoading ? "Analyzing..." : "Analyze Images"}
      </button>
    </form>
  );
};

export default ImageUploadForm;
