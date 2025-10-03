import { Card } from "@/components/ui/card";
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
  return (
    <Card className="flex flex-col justify-center items-center text-center p-6 rounded-2xl flex-1">
      <div className="flex justify-center w-full">
        <img src="/monkey.png" alt="no categories" className="size-48 -mt-24" />
      </div>
    </Card>
  );
};
