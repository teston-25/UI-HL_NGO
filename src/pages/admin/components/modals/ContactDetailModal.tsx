import { Trash2 } from "lucide-react";
import { Modal } from "../Modal";
import type { Contact } from "../../types/admin";

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onDelete: (id: number) => Promise<void>;
}

export function ContactDetailModal({
  isOpen,
  onClose,
  contact,
  onDelete,
}: ContactDetailModalProps) {
  if (!contact) return null;

  const handleDelete = async () => {
    await onDelete(contact.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Details">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#15803d] flex items-center justify-center text-white text-xl font-bold">
            {contact.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              {contact.name}
            </h3>
            <span className="px-2 py-1 bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-medium rounded-full">
              {contact.type}
            </span>
          </div>
        </div>
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {contact.email}
            </p>
          </div>
          {contact.phone_number && (
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {contact.phone_number}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Subject</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {contact.subject}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Message</p>
            <p className="font-medium text-gray-900 dark:text-white whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
