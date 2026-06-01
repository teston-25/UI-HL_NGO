import { FileText, Upload, Eye, Trash2, Loader2 } from "lucide-react";
import type { TransparencyDoc } from "../types/admin";
import { TabError } from "../../../components/admin/TabError";

interface TransparencyTabProps {
  docs: TransparencyDoc[];
  loadingData: boolean;
  error: string | null;
  onRetry: () => void;
  onUpload: () => void;
  onDelete: (id: number) => void;
}

export function TransparencyTab({
  docs,
  loadingData,
  error,
  onRetry,
  onUpload,
  onDelete,
}: TransparencyTabProps) {
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Transparency Files
          </h1>
          <p className="text-gray-500 mt-1">
            Upload and manage transparency documents
          </p>
        </div>
        <TabError message={error} onRetry={onRetry} />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Transparency Files
          </h1>
          <p className="text-gray-500 mt-1">
            Upload and manage transparency documents
          </p>
        </div>
        <button
          onClick={onUpload}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors"
        >
          <Upload className="w-5 h-5" />
          Upload Document
        </button>
      </div>

      {loadingData ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
        </div>
      ) : docs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No documents uploaded yet
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
              Uploaded Documents
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#B91C1C]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#B91C1C]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {doc.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleDateString()} •{" "}
                      {doc.file_type.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
