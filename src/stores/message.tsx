import { StateCreator } from "zustand";

export interface Message {
  title: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
}

export interface MessageSlice {
  message: Message | null;
  error: unknown;
  createMessage: (message: Message) => void;
  removeMessage: () => void;
  createFailedMessage: (message: Message, error: unknown) => void;
}

export const createMessageSlice: StateCreator<MessageSlice, [], [], MessageSlice> = (set, get) => ({
  message: null,
  error: null,
  createMessage: (message: Message) => {
    set({ message });
  },
  removeMessage: () => {
    set({ message: null });
  },
  createFailedMessage: (message: Message, error: unknown) => {
    set({ message, error });
  },
});
