'use client';

import { useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';

import { getAiSummary } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface SummaryButtonProps {
  title: string;
  description: string;
}

export function SummaryButton({ title, description }: SummaryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    // Reset state when opening
    setSummary(null);
    setError(null);
    setIsOpen(true);
    
    startTransition(async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      const result = await getAiSummary(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSummary(result.summary ?? null);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button
          variant="outline"
          className="w-full bg-transparent hover:bg-accent/10 border-accent text-accent hover:text-accent"
          onClick={handleAction}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Summary
        </Button>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI-Powered Summary</DialogTitle>
          <DialogDescription>
            Here is an AI-generated summary for "{title}".
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 min-h-[100px]">
          {isPending && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
