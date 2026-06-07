import { useState, useCallback, useEffect } from "react";
import apiClient from "../../../services/axios";
import beneficiaryStatsAPI from "../../../services/api/beneficiaryStatsApi";
import newsAPI from "../../../services/api/newsApi";
import emergencyAPI from "../../../services/api/emergencyApi";
import type {
  AdminTab,
  Admin,
  Contact,
  News,
  Emergency,
  TransparencyDoc,
  BeneficiaryStats,
  Donation,
  DonationStats,
} from "../types/admin";
import adminAPI from "../../../services/api/adminApi";
import transparencyAPI from "../../../services/api/transparencyApi";
import auditLogAPI, { type AuditLog } from "../../../services/api/auditLogApi";
import donationAPI from "../../../services/api/donationApi";

export interface AdminData {
  contacts: Contact[];
  news: News[];
  emergencies: Emergency[];
  transparencyDocs: TransparencyDoc[];
  admins: Admin[];
  beneficiaryStats: BeneficiaryStats | null;
  donations: Donation[];
  auditLogs: AuditLog[];
  donationStats: DonationStats | null;
  loadingData: boolean;
  error: string | null;
}

export interface RefetchFunctions {
  refetchContacts: () => Promise<void>;
  refetchNews: () => Promise<void>;
  refetchEmergencies: () => Promise<void>;
  refetchTransparency: () => Promise<void>;
  refetchAdmins: () => Promise<void>;
  refetchBeneficiaryStats: () => Promise<void>;
  refetchDonations: () => Promise<void>;
  refetchAuditLogs: () => Promise<void>;
  retry: () => void;
}

export function useAdminData(
  activeTab: AdminTab,
  isSuperAdmin: boolean,
): AdminData & RefetchFunctions {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [transparencyDocs, setTransparencyDocs] = useState<TransparencyDoc[]>(
    [],
  );
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [beneficiaryStats, setBeneficiaryStats] =
    useState<BeneficiaryStats | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationStats, setDonationStats] = useState<DonationStats | null>(
    null,
  );
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const refetchContacts = useCallback(async () => {
    const res = await apiClient.get("/v1/admin/contacts");
    setContacts(res.data.data);
  }, []);

  const refetchNews = useCallback(async () => {
    const res = await newsAPI.getAll();
    setNews(res.data.news);
  }, []);

  const refetchEmergencies = useCallback(async () => {
    const res = await emergencyAPI.getAll();
    setEmergencies(res.data.emergencies);
  }, []);

  const refetchTransparency = useCallback(async () => {
    const res = await transparencyAPI.getAll();
    setTransparencyDocs(res.data.data || res.data || []);
  }, []);

  const refetchAdmins = useCallback(async () => {
    const res = await adminAPI.getAdmins();
    setAdmins(res.data.admins || res.data.data || []);
  }, []);

  const refetchBeneficiaryStats = useCallback(async () => {
    const res = await beneficiaryStatsAPI.getStats();
    const statsData = res?.data?.stats ?? res;
    setBeneficiaryStats(statsData);
  }, []);

  const refetchDonations = useCallback(async () => {
    const res = await donationAPI.getAllDonations(1, 10);
    setDonations(res.data?.donations || []);
  }, []);

  const refetchAuditLogs = useCallback(async () => {
    const res = await auditLogAPI.getAll({ page: 1, limit: 50 });
    setAuditLogs(res.data?.logs || []);
  }, []);

  const retry = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      setError(null);
      try {
        switch (activeTab) {
          case "contacts":
            await refetchContacts();
            break;
          case "news":
            await Promise.all([refetchNews(), refetchEmergencies()]);
            break;
          case "transparency":
            await refetchTransparency();
            break;
          case "admins":
            if (isSuperAdmin) await refetchAdmins();
            break;
          case "beneficiaries":
            await refetchBeneficiaryStats();
            break;
          case "donations":
            await refetchDonations();
            break;
          case "dashboard":
            await Promise.all([refetchDonations(), refetchAuditLogs()]);
            break;
          case "audit":
            await refetchAuditLogs();
            break;
        }
      } catch (err: unknown) {
        const axiosErr = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        const message =
          axiosErr.response?.data?.message ||
          axiosErr.message ||
          "Failed to load data. Please check your connection and try again.";
        setError(message);
        console.error("Error fetching data:", err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [
    activeTab,
    isSuperAdmin,
    retryCount,
    refetchContacts,
    refetchNews,
    refetchEmergencies,
    refetchTransparency,
    refetchAdmins,
    refetchBeneficiaryStats,
    refetchDonations,
    refetchAuditLogs,
  ]);

  return {
    contacts,
    news,
    emergencies,
    transparencyDocs,
    admins,
    beneficiaryStats,
    donations,
    donationStats,
    auditLogs,
    loadingData,
    error,
    refetchContacts,
    refetchNews,
    refetchEmergencies,
    refetchTransparency,
    refetchAdmins,
    refetchBeneficiaryStats,
    refetchDonations,
    refetchAuditLogs,
    retry,
  };
}
