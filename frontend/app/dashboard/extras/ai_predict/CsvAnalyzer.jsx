"use client"; // Enable client-side rendering for this component

import React, { useState } from "react";
import {
  FileText,
  Table,
  AlertTriangle,
  TrendingUp,
  BarChart,
  Upload,
  Activity,
} from "lucide-react";

export default function CsvAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setSelectedColumn("");
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a CSV file to upload.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload/csv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail ||
            "Failed to analyze CSV. Please check the file format."
        );
      }

      const data = await res.json();
      setResult(data);

      if (data.columns && data.columns.length > 0) {
        setSelectedColumn(data.columns[0]);
      }
    } catch (err) {
      console.error("Upload or analysis failed:", err);
      setErrorMessage(
        `Error: ${err.message || "Upload failed. Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 9H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center ">
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Activity size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              CSV Analytics
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-6">
              Advanced data analysis and insights for your CSV files
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Choose file</span> or drag
                      here
                    </p>
                    <p className="text-xs text-gray-400 mt-1">CSV files only</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {file && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      {file.name}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  loading || !file
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing
                  </span>
                ) : (
                  "Analyze Data"
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-600" />
                <p className="text-red-800">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-12">
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  icon={<Table size={20} />}
                  label="Total Rows"
                  value={result.shape?.[0]?.toLocaleString() || "N/A"}
                />
                <MetricCard
                  icon={<FileText size={20} />}
                  label="Columns"
                  value={
                    result.shape?.[1]?.toLocaleString() ||
                    result.columns?.length?.toLocaleString() ||
                    "N/A"
                  }
                />
                <MetricCard
                  icon={<AlertTriangle size={20} />}
                  label="Missing Values"
                  value={
                    result.missing_values
                      ? Object.values(result.missing_values)
                          .reduce((sum, count) => sum + count, 0)
                          .toLocaleString()
                      : "N/A"
                  }
                />
                <MetricCard
                  icon={<Activity size={20} />}
                  label="Anomalies"
                  value={
                    result.anomalies
                      ? Object.values(result.anomalies)
                          .reduce((sum, count) => sum + count, 0)
                          .toLocaleString()
                      : "N/A"
                  }
                />
              </div>

              {/* Column Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-8">
                  <BarChart size={24} className="text-slate-700" />
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Column Analysis
                  </h2>
                </div>

                <div className="mb-8">
                  <select
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    value={selectedColumn}
                    className="w-full md:w-80 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="">Select column</option>
                    {result.columns?.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    )) || <option disabled>No columns available</option>}
                  </select>
                </div>

                {selectedColumn && result.summary?.[selectedColumn] && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-medium text-slate-900 mb-6">
                      {selectedColumn}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(result.summary[selectedColumn])
                        .slice(0, 6)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                          >
                            <div className="text-sm text-gray-600 mb-1 font-medium capitalize">
                              {key}
                            </div>
                            <div className="text-lg font-semibold text-slate-900">
                              {JSON.stringify(value)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnalysisCard
                  title="Missing Values"
                  data={result.missing_values}
                  emptyMessage="No missing values found"
                />
                <AnalysisCard
                  title="Detected Anomalies"
                  data={result.anomalies}
                  emptyMessage="No anomalies detected"
                />
              </div>

              {/* Trend Predictions */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp size={24} className="text-slate-700" />
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Trend Predictions
                  </h2>
                </div>

                {Object.keys(result.trend_prediction || {}).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(result.trend_prediction).map(
                      ([key, values]) => (
                        <div
                          key={key}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                        >
                          <div className="text-lg font-medium text-slate-900 mb-4">
                            {key}
                          </div>
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">
                              Next 5 predictions:
                            </span>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {Array.isArray(values) && values.length > 0 ? (
                                values.map((v, i) => (
                                  <span
                                    key={i}
                                    className="bg-white px-3 py-1 rounded border border-gray-200 text-xs font-mono"
                                  >
                                    {typeof v === "number"
                                      ? v.toFixed(2)
                                      : String(v)}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-500">
                                  No predictions available
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp
                      size={48}
                      className="mx-auto mb-4 text-gray-300"
                    />
                    <p className="text-gray-500">
                      No trend predictions available
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-slate-600">{icon}</div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function AnalysisCard({ title, data, emptyMessage }) {
  const hasData = data && Object.keys(data).length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">{title}</h3>

      {hasData ? (
        <div className="space-y-4">
          {Object.entries(data)
            .slice(0, 5)
            .map(([col, count]) => (
              <div
                key={col}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <span className="font-medium text-slate-700 truncate pr-4">
                  {col}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-slate-800 flex-shrink-0">
                  {count}
                </span>
              </div>
            ))}
          {Object.keys(data).length > 5 && (
            <p className="text-sm text-gray-500 text-center pt-4 border-t border-gray-100">
              Showing top 5 results
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
