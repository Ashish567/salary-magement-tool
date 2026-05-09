"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useDeleteEmployee } from "@/hooks/use-delete-employee";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteEmployeeDialogProps {
  employeeId: string;
  employeeName: string;
  onSuccess?: () => void;
}

export function DeleteEmployeeDialog({ 
  employeeId, 
  employeeName, 
  onSuccess 
}: DeleteEmployeeDialogProps) {
  const { deleteEmployee, isLoading } = useDeleteEmployee();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const success = await deleteEmployee(employeeId);
    if (success) {
      toast.success(`Employee ${employeeName} deleted successfully`);
      setOpen(false);
      onSuccess?.();
    } else {
      toast.error(`Failed to delete employee ${employeeName}`);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          aria-label="Delete employee"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the employee
            <span className="font-semibold text-foreground mx-1">{employeeName}</span>
            and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
