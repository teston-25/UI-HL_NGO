import { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  FileText,
  DollarSign,
  Upload,
  Bell,
  Settings,
  BarChart3,
  Home,
  Shield,
  Edit,
  Trash2,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useAdminData } from "./hooks/useAdminData";
import { useAdminActions } from "./hooks/useAdminActions";
import { useCRUDModalState } from "../../hooks/useModalState";
import type {
  AdminTab,
  Tab,
  Admin,
  News,
  Emergency,
  Contact,
} from "./types/admin";
import { Column } from "../../components/admin/AdminTable";

// Layout
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";

// Tabs
import { DashboardTab } from "./tabs/DashboardTab";
import { DonationsTab } from "./tabs/DonationsTab";
import { BeneficiariesTab } from "./tabs/BeneficiariesTab";
import { NewsTab } from "./tabs/NewsTab";
import { AuditTab } from "./tabs/AuditTab";
import { TransparencyTab } from "./tabs/TransparencyTab";
import { ContactsTab } from "./tabs/ContactsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { AdminsTab } from "./tabs/AdminsTab";

// Modals
import { BeneficiaryModal } from "./components/modals/BeneficiaryModal";
import { NewsModal } from "./components/modals/NewsModal";
import { EmergencyModal } from "./components/modals/EmergencyModal";
import { ContactDetailModal } from "./components/modals/ContactDetailModal";
import { TransparencyModal } from "./components/modals/TransparencyModal";
import { AdminManagementModal } from "../../components/admin/modals/AdminManagementModal";

const VALID_TABS: AdminTab[] = [
  "dashboard",
  "donations",
  "beneficiaries",
  "news",
  "audit",
  "transparency",
  "contacts",
  "settings",
  "admins",
];

export function AdminPage() {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { logout, admin } = useAdminAuth();

  const isSuperAdmin = admin?.role === "SUPER_ADMIN";

  const [activeTab, setActiveTabState] = useState<AdminTab>(
    tab && VALID_TABS.includes(tab as AdminTab)
      ? (tab as AdminTab)
      : "dashboard",
  );

  useEffect(() => {
    if (tab && VALID_TABS.includes(tab as AdminTab)) {
      setActiveTabState(tab as AdminTab);
    }
  }, [tab]);

  const setActiveTab = useCallback(
    (newTab: AdminTab) => {
      setActiveTabState(newTab);
      navigate(`/admin/${newTab}`);
    },
    [navigate],
  );

  // Data & actions
  const data = useAdminData(activeTab, isSuperAdmin);
  const actions = useAdminActions(data);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = useMemo(
    () =>
      data.news.filter((n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [data.news, searchQuery],
  );

  const filteredEmergencies = useMemo(
    () =>
      data.emergencies.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [data.emergencies, searchQuery],
  );

  // Layout state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal states
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showTransparencyModal, setShowTransparencyModal] = useState(false);
  const adminModal = useCRUDModalState<Admin>();

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [editingEmergency, setEditingEmergency] = useState<Emergency | null>(
    null,
  );

  // Tab definitions
  const tabs: Tab[] = useMemo(
    () => [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "donations", label: "Donations", icon: DollarSign },
      { id: "beneficiaries", label: "Beneficiaries", icon: Users },
      { id: "news", label: "News & Emergencies", icon: FileText },
      { id: "audit", label: "Financial Audit", icon: BarChart3 },
      { id: "transparency", label: "Transparency", icon: Upload },
      { id: "contacts", label: "Contacts", icon: Bell },
      { id: "settings", label: "Settings", icon: Settings },
      ...(isSuperAdmin
        ? [
            {
              id: "admins" as AdminTab,
              label: "Admin Management",
              icon: Shield,
            },
          ]
        : []),
    ],
    [isSuperAdmin],
  );

  // News modal helpers
  const openNewsModal = (item?: News) => {
    setEditingNews(item || null);
    setShowNewsModal(true);
  };

  const openEmergencyModal = (item?: Emergency) => {
    setEditingEmergency(item || null);
    setShowEmergencyModal(true);
  };

  // Admin table columns
  const adminColumns: Column<Admin>[] = [
    {
      key: "email",
      header: "Email",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#991B1B] flex items-center justify-center text-white font-bold">
            {item.email.charAt(0).toUpperCase()}
          </div>
          <p className="font-medium text-gray-900 dark:text-white">
            {item.email}
          </p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (item) => (
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            item.role === "SUPER_ADMIN"
              ? "bg-[#7c3aed]/10 text-[#7c3aed]"
              : "bg-[#15803d]/10 text-[#15803d]"
          }`}
        >
          {item.role}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Created At",
      render: (item) => (
        <p className="text-gray-500 dark:text-gray-400">
          {new Date(item.created_at).toLocaleDateString()}
        </p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              adminModal.openEdit(item);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              adminModal.openDelete(item);
            }}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a]">
      <AdminHeader
        admin={admin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <AdminSidebar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={logout}
      />

      <main className="lg:ml-64 pt-16 p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl"
          >
            {activeTab === "dashboard" && (
              <DashboardTab
                admin={admin}
                beneficiaryStats={data.beneficiaryStats}
                news={data.news}
                emergencies={data.emergencies}
                donationStats={data.donationStats}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === "donations" && (
              <DonationsTab onRetry={data.retry} />
            )}

            {activeTab === "beneficiaries" && (
              <BeneficiariesTab
                onEdit={() => setShowBeneficiaryModal(true)}
                onRetry={() => data.refetchBeneficiaryStats()}
              />
            )}

            {activeTab === "news" && (
              <NewsTab
                news={filteredNews}
                emergencies={filteredEmergencies}
                loadingData={data.loadingData}
                onAddNews={() => openNewsModal()}
                onEditNews={(item) => openNewsModal(item)}
                onDeleteNews={actions.handleNewsDelete}
                onAddEmergency={() => openEmergencyModal()}
                onEditEmergency={(item) => openEmergencyModal(item)}
                onDeleteEmergency={actions.handleEmergencyDelete}
              />
            )}

            {activeTab === "audit" && (
              <AuditTab
                donations={data.donations}
                donationStats={data.donationStats}
              />
            )}

            {activeTab === "transparency" && (
              <TransparencyTab
                docs={data.transparencyDocs}
                loadingData={data.loadingData}
                error={data.error}
                onRetry={data.retry}
                onUpload={() => setShowTransparencyModal(true)}
                onDelete={actions.handleTransparencyDelete}
              />
            )}

            {activeTab === "contacts" && (
              <ContactsTab
                onView={(contact) => {
                  setSelectedContact(contact);
                  setShowContactModal(true);
                }}
              />
            )}

            {activeTab === "settings" && <SettingsTab admin={admin} />}

            {activeTab === "admins" && isSuperAdmin && (
              <AdminsTab
                admins={data.admins}
                loadingData={data.loadingData}
                error={data.error}
                onRetry={data.retry}
                onAdd={() => adminModal.openCreate()}
                columns={adminColumns}
                onRowClick={(item) => adminModal.openEdit(item)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modals */}
      <BeneficiaryModal
        isOpen={showBeneficiaryModal}
        onClose={() => setShowBeneficiaryModal(false)}
        updateStats={actions.handleBeneficiarySave}
        initialData={
          data.beneficiaryStats
            ? {
                total_beneficiaries: data.beneficiaryStats.total_beneficiaries,
                countries_count: data.beneficiaryStats.countries_count,
                water_projects: data.beneficiaryStats.water_projects,
              }
            : undefined
        }
      />

      <NewsModal
        isOpen={showNewsModal}
        onClose={() => {
          setShowNewsModal(false);
          setEditingNews(null);
        }}
        onSave={actions.handleNewsSave}
        editingNews={editingNews}
      />

      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => {
          setShowEmergencyModal(false);
          setEditingEmergency(null);
        }}
        onSave={actions.handleEmergencySave}
        editingEmergency={editingEmergency}
      />

      <ContactDetailModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
        onDelete={actions.handleContactDelete}
      />

      <TransparencyModal
        isOpen={showTransparencyModal}
        onClose={() => setShowTransparencyModal(false)}
        onUpload={actions.handleTransparencyUpload}
      />

      <AdminManagementModal
        isOpen={adminModal.isOpen}
        onClose={adminModal.close}
        admin={adminModal.selectedItem || undefined}
        onSave={async (formData) => {
          await actions.handleAdminSave(
            formData,
            adminModal.mode === "delete" ? "create" : adminModal.mode,
            adminModal.selectedItem?.id,
          );
          adminModal.close();
        }}
        onDelete={
          adminModal.mode === "delete"
            ? async (id) => {
                await actions.handleAdminDelete(id);
                adminModal.close();
              }
            : undefined
        }
        loading={actions.loading}
        mode={adminModal.mode}
      />
    </div>
  );
}
