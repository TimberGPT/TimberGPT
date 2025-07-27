// chatting.zip/chatting/ImageAnalysisReport.jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ImageAnalysisReport = ({ analysisData, ringCountData }) => {
  if (!analysisData && !ringCountData) {
    return (
      <div className="p-4 text-center text-gray-500">
        Upload an image to get an analysis report.
      </div>
    );
  }

  const renderBoxplotSummary = (boxplot) => {
    if (!boxplot) return null;
    return (
      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          Statistical Summary of Ring Counts (Boxplot)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="font-medium text-gray-700">First Quartile (Q1):</p>
            <p className="text-gray-900">{boxplot.Q1}</p>
            <p className="text-gray-600 text-xs">
              25% of the data falls below this value.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Median (Q2):</p>
            <p className="text-gray-900">{boxplot.Median}</p>
            <p className="text-gray-600 text-xs">
              The middle value of the dataset.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Third Quartile (Q3):</p>
            <p className="text-gray-900">{boxplot.Q3}</p>
            <p className="text-gray-600 text-xs">
              75% of the data falls below this value.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              Interquartile Range (IQR):
            </p>
            <p className="text-gray-900">{boxplot.IQR}</p>
            <p className="text-gray-600 text-xs">
              The range between Q1 and Q3, representing the middle 50% of data.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Outliers:</p>
            <p className="text-gray-900">
              {boxplot.Outliers && boxplot.Outliers.length > 0
                ? boxplot.Outliers.join(", ")
                : "None"}
            </p>
            <p className="text-gray-600 text-xs">
              Data points significantly different from other observations.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Q1-Q3 Range:</p>
            <p className="text-gray-900">
              [{boxplot.Q1_Q3_range[0]}, {boxplot.Q1_Q3_range[1]}]
            </p>
            <p className="text-gray-600 text-xs">
              The boundaries of the central box in a boxplot.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      {analysisData && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Timber Defect Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Total Log Area:</p>
              <p className="text-lg font-medium text-gray-900">
                {analysisData.total_log_area} px²
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Defect Area:</p>
              <p className="text-lg font-medium text-gray-900">
                {analysisData.defect_area} px²
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Defect Ratio:</p>
              <p className="text-lg font-medium text-gray-900">
                {analysisData.defect_ratio.toFixed(2)}%
              </p>
            </div>
          </div>
          {analysisData.image_blob && (
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-2">
                Annotated Image
              </h3>
              <img
                src={`data:image/jpeg;base64,${analysisData.image_blob}`}
                alt="Annotated Log"
                className="max-w-full h-auto rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>
      )}

      {ringCountData && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Tree Ring Count Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Pith Center:</p>
              <p className="text-lg font-medium text-gray-900">
                {ringCountData.pith_center &&
                Array.isArray(ringCountData.pith_center) &&
                ringCountData.pith_center.length >= 2
                  ? `[${ringCountData.pith_center[0]}, ${ringCountData.pith_center[1]}]`
                  : "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md col-span-full">
              <p className="text-sm text-gray-600">Ring Counts:</p>
              <p className="text-lg font-medium text-gray-900">
                {ringCountData.ring_counts &&
                Array.isArray(ringCountData.ring_counts)
                  ? ringCountData.ring_counts.join(", ")
                  : "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-600">Mean Ring Count:</p>
              <p className="text-lg font-medium text-gray-900">
                {ringCountData.mean_ring_count !== undefined &&
                ringCountData.mean_ring_count !== null
                  ? ringCountData.mean_ring_count
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {ringCountData.img_canny && (
              <div className="flex flex-col items-center border border-gray-200 rounded-md p-2 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-800 mb-2 text-center">
                  Canny Edge Detection
                </h3>
                <img
                  src={`data:image/jpeg;base64,${ringCountData.img_canny}`}
                  alt="Canny Edge Detection"
                  className="w-full h-auto rounded-md object-contain" // Added w-full and object-contain
                />
              </div>
            )}
            {ringCountData.img_polar && (
              <div className="flex flex-col items-center border border-gray-200 rounded-md p-2 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-800 mb-2 text-center">
                  Polar Transformation
                </h3>
                <img
                  src={`data:image/jpeg;base64,${ringCountData.img_polar}`}
                  alt="Polar Transformation"
                  className="w-full h-auto rounded-md object-contain" // Added w-full and object-contain
                />
              </div>
            )}
            {ringCountData.img_boxplot && (
              <div className="flex flex-col items-center border border-gray-200 rounded-md p-2 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-800 mb-2 text-center">
                  Boxplot Visualization
                </h3>
                <img
                  src={`data:image/jpeg;base64,${ringCountData.img_boxplot}`}
                  alt="Boxplot Visualization"
                  className="w-full h-auto rounded-md object-contain" // Added w-full and object-contain
                />
              </div>
            )}
          </div>
          {renderBoxplotSummary(ringCountData.boxplot_summary)}
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisReport;
