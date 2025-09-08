import { create } from "zustand";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface FormStore {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  resetFormData: () => void;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  date: new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }),
};

export const useFormStore = create<FormStore>((set) => ({
  formData: initialFormData,

  updateFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  resetFormData: () =>
    set({
      formData: {
        ...initialFormData,
        date: new Date().toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        }),
      },
    }),
}));
