import { useStore } from "@/stores";

export const useSuggestion = () => {
  const suggestions = useStore((state) => state.suggestions);
  const getSuggestions = useStore((state) => state.getSuggestions);

  if (!suggestions) {
    throw getSuggestions();
  }

  return suggestions;
};

export default useSuggestion;
