import { CreateContentCategoryModal } from "@/components/create-event-category-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient();

  const { mutate: insertQuickstartCategories, isPending } = useMutation({
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
      <h1 className="mt-2 font-medium tracking-tight text-xl/8 text-gray-900 ">
        No Event Category Yet
      </h1>
      <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
        Start tracking your event by creating your first category
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
          onClick={() => insertQuickstartCategories()}
          disabled={isPending}
        >
          <span className="size-5">🚀</span>
          <span>{isPending ? "Creating..." : "QuickStart"}</span>
        </Button>
        <CreateContentCategoryModal containerClassName="w-full sm:w-auto">
          <Button className="flex space-x-2 items-center w-fill sm:w-auto">
            <span>Add Category</span>
          </Button>
        </CreateContentCategoryModal>
      </div>
    </Card>
  );
};
