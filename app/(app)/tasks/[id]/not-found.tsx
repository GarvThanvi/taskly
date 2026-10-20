import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

export default function TaskNotFound() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Task not found</h1>
      <p className='text-muted-foreground'>That task doesn't exist or was deleted.</p>
      <Button className={buttonVariants()}>
        <Link href='/tasks'>Back to tasks</Link>
      </Button>
    </div>
  );
}