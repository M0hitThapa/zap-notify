import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient();

  const { mutate: insertQuickstartCategories } = useMutation({
    mutationFn: async () => {
      await fetch("/api/category/insertQuickstartCategories", {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
    },
  });
  return;
};
