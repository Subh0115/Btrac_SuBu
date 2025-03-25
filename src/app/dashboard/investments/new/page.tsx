'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface InvestmentFormData {
  name: string;
  amount: number;
  type: string;
}

export default function NewInvestmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: InvestmentFormData = {
        name: formData.get('name') as string,
        amount: parseFloat(formData.get('amount') as string),
        type: formData.get('type') as string,
      };

      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create investment');
      }

      toast.success('Investment created successfully');
      router.push('/dashboard/investments');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create investment');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Investment Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter investment name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                name="type"
                placeholder="Enter investment type"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Investment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 