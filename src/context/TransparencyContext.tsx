import { createContext, useContext, useState, useCallback } from "react";
import transparencyAPI from "../services/api/transparencyApi";
import type {
  TransparencyDoc,
  TransparencyUploadPayload,
} from "../services/api/transparencyApi";

interface TransparencyContextType {
  docs: TransparencyDoc[];
  loading: boolean;
  error: string | null;
  fetchTransparencyDocs: () => Promise<void>;
  uploadDocument: (form: TransparencyUploadPayload) => Promise<void>;
  deleteDocument: (id: number) => Promise<void>;
}

const TransparencyContext = createContext<TransparencyContextType | undefined>(
  undefined,
);

export function TransparencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransparencyDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await transparencyAPI.getAll();
      const payload = res?.data ?? res;
      const docsArray = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
        ? payload
        : [];
      setDocs(docsArray);
    } catch (e: unknown) {
      // Fixed: Changed 'any' to 'unknown' to fix ESLint rule
      const err = e as { response?: { data?: { message?: string } } };
      setError(
        err.response?.data?.message || "Failed to fetch transparency documents",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(
    async (form: TransparencyUploadPayload) => {
      setLoading(true);
      setError(null);
      try {
        await transparencyAPI.upload(form);
        await fetchTransparencyDocs();
      } catch (e: unknown) {
        // Fixed: Changed 'any' to 'unknown'
        const err = e as { response?: { data?: { message?: string } } };
        setError(err.response?.data?.message || "Failed to upload document");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fetchTransparencyDocs],
  );

  const deleteDocument = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await transparencyAPI.delete(id);
        await fetchTransparencyDocs();
      } catch (e: unknown) {
        // Fixed: Changed 'any' to 'unknown'
        const err = e as { response?: { data?: { message?: string } } };
        setError(err.response?.data?.message || "Failed to delete document");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fetchTransparencyDocs],
  ); // Fixed: Added missing dependency to the array

  return (
    <TransparencyContext.Provider
      value={{
        docs,
        loading,
        error,
        fetchTransparencyDocs,
        uploadDocument,
        deleteDocument,
      }}
    >
      {children}
    </TransparencyContext.Provider>
  );
}

export function useTransparency() {
  const ctx = useContext(TransparencyContext);
  if (!ctx) {
    throw new Error(
      "useTransparency must be used within a TransparencyProvider",
    );
  }
  return ctx;
}
