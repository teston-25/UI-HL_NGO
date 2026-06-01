import { useEffect } from "react";
import {
  MessageSquare,
  Users,
  Bell,
  ChevronRight,
  Loader2,
} from "lucide-react";
import type { Contact } from "../types/admin";
import { TabError } from "../../../components/admin/TabError";
import { useContact } from "../../../context/ContactContext";

interface ContactsTabProps {
  onView: (contact: Contact) => void;
}

export function ContactsTab({ onView }: ContactsTabProps) {
  const { contacts, loading, error, fetchContacts } = useContact();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Contacts & Inquiries
          </h1>
          <p className="text-gray-500 mt-1">
            Manage contact form submissions and inquiries
          </p>
        </div>
        <TabError message={error} onRetry={fetchContacts} />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Contacts & Inquiries
          </h1>
          <p className="text-gray-500 mt-1">
            Manage contact form submissions and inquiries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8 text-[#B91C1C]" />
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {contacts.filter((c) => c.type === "general inquiry").length} New
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {contacts.filter((c) => c.type === "general inquiry").length}
          </h3>
          <p className="text-gray-500 text-sm">General Inquiries</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#15803d]" />
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {contacts.filter((c) => c.type === "volunteering").length} New
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {contacts.filter((c) => c.type === "volunteering").length}
          </h3>
          <p className="text-gray-500 text-sm">Volunteer Applications</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Bell className="w-8 h-8 text-[#7c3aed]" />
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
              {contacts.filter((c) => c.type === "internship").length} New
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {contacts.filter((c) => c.type === "internship").length}
          </h3>
          <p className="text-gray-500 text-sm">Internship Requests</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            Recent Messages
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No contacts found
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800 overflow-y-auto max-h-[620px] scroll-smooth">
            {contacts.map((msg) => (
              <div
                key={msg.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                onClick={() => onView(msg)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#15803d] flex items-center justify-center text-white font-bold">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {msg.name}
                      <span className="w-2 h-2 bg-[#B91C1C] rounded-full"></span>
                    </p>
                    <p className="text-sm text-gray-500">{msg.subject}</p>

                    <p className="text-sm text-gray-400">
                      {msg.email || msg.phone_number || "No contact info"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">{msg.type}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
