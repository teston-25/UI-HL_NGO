import { useState } from "react";
import apiClient from "../../../services/axios";
import { useToast } from "../../../components/Toast";
import type {
  BeneficiaryForm,
  NewsForm,
  EmergencyForm,
  TransparencyForm,
  AdminFormData,
} from "../types/admin";
import type { RefetchFunctions } from "./useAdminData";

export interface AdminActions {
  loading: boolean;
  handleBeneficiarySave: (form: BeneficiaryForm) => Promise<void>;
  handleNewsSave: (form: NewsForm, editingId?: number) => Promise<void>;
  handleNewsDelete: (id: number) => Promise<void>;
  handleEmergencySave: (
    form: EmergencyForm,
    editingId?: number,
  ) => Promise<void>;
  handleEmergencyDelete: (id: number) => Promise<void>;
  handleContactDelete: (id: number) => Promise<void>;
  handleTransparencyUpload: (form: TransparencyForm) => Promise<void>;
  handleTransparencyDelete: (id: number) => Promise<void>;
  handleAdminSave: (
    data: AdminFormData,
    mode: "create" | "edit",
    editingId?: number,
  ) => Promise<void>;
  handleAdminDelete: (id: number) => Promise<void>;
}

export function useAdminActions(refetch: RefetchFunctions): AdminActions {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleBeneficiarySave = async (form: BeneficiaryForm) => {
    setLoading(true);
    try {
      await apiClient.put("/v1/admin/beneficiary-stats", form);
      await refetch.refetchBeneficiaryStats();
      showToast("success", "Beneficiary stats updated successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to update beneficiary stats",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSave = async (form: NewsForm, editingId?: number) => {
    setLoading(true);
    try {
      if (editingId) {
        await apiClient.put(`/v1/admin/news/${editingId}`, form);
        showToast("success", "News updated successfully!");
      } else {
        await apiClient.post("/v1/admin/news", form);
        showToast("success", "News created successfully!");
      }
      await refetch.refetchNews();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast("error", err.response?.data?.message || "Failed to save news");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleNewsDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    setLoading(true);
    try {
      await apiClient.delete(`/v1/admin/news/${id}`);
      await refetch.refetchNews();
      showToast("success", "News deleted successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete news",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencySave = async (
    form: EmergencyForm,
    editingId?: number,
  ) => {
    setLoading(true);
    try {
      if (editingId) {
        await apiClient.put(`/v1/admin/emergencies/${editingId}`, form);
        showToast("success", "Emergency updated successfully!");
      } else {
        await apiClient.post("/v1/admin/emergencies", form);
        showToast("success", "Emergency created successfully!");
      }
      await refetch.refetchEmergencies();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to save emergency",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this emergency?")) return;
    setLoading(true);
    try {
      await apiClient.delete(`/v1/admin/emergencies/${id}`);
      await refetch.refetchEmergencies();
      showToast("success", "Emergency deleted successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete emergency",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContactDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    setLoading(true);
    try {
      await apiClient.delete(`/v1/admin/contacts/${id}`);
      await refetch.refetchContacts();
      showToast("success", "Contact deleted successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete contact",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTransparencyUpload = async (form: TransparencyForm) => {
    if (!form.file || !form.title) {
      showToast("error", "Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", form.file);
      formData.append("title", form.title);
      formData.append("file_type", form.file_type);
      formData.append("year", form.year);
      await apiClient.post("/v1/admin/transparency", formData);
      await refetch.refetchTransparency();
      showToast("success", "Document uploaded successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to upload document",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleTransparencyDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    setLoading(true);
    try {
      await apiClient.delete(`/v1/admin/transparency/${id}`);
      await refetch.refetchTransparency();
      showToast("success", "Document deleted successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete document",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSave = async (
    data: AdminFormData,
    mode: "create" | "edit",
    editingId?: number,
  ) => {
    if (!data.email) {
      showToast("error", "Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      if (mode === "edit" && editingId) {
        await apiClient.put(`/v1/admin/${editingId}`, {
          email: data.email,
          role: data.role,
        });
        showToast("success", "Admin updated successfully!");
      } else {
        await apiClient.post("/v1/admin", data);
        showToast("success", "Admin created successfully!");
      }
      await refetch.refetchAdmins();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast("error", err.response?.data?.message || "Failed to save admin");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleAdminDelete = async (id: number) => {
    setLoading(true);
    try {
      await apiClient.delete(`/v1/admin/${id}`);
      await refetch.refetchAdmins();
      showToast("success", "Admin deleted successfully!");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to delete admin",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleBeneficiarySave,
    handleNewsSave,
    handleNewsDelete,
    handleEmergencySave,
    handleEmergencyDelete,
    handleContactDelete,
    handleTransparencyUpload,
    handleTransparencyDelete,
    handleAdminSave,
    handleAdminDelete,
  };
}
