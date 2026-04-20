import { createContext, useContext, useState, useCallback } from "react";
import transparencyAPI, {
  type TransparencyDoc,
  type TransparencyUploadPayload,
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
      setDocs(res.data.data || res.data);
    } catch (e: any) {
      setError(
        e.response?.data?.message || "Failed to fetch transparency documents",
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
      } catch (e: any) {
        setError(e.response?.data?.message || "Failed to upload document");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fetchTransparencyDocs],
  );

  const deleteDocument = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await transparencyAPI.delete(id);
      await fetchTransparencyDocs();
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to delete document");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

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
  if (!ctx)
    throw new Error("useTransparency must be used within TransparencyProvider");
  return ctx;
}
