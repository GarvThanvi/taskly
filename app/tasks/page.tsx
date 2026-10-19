// src/app/tasks/page.tsx
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const tasks = [
  { id: '1', title: 'Learn routing', notes: 'Pages, layouts, dynamic routes', priority: 'high', done: false },
  { id: '2', title: 'Set up shadcn/ui', notes: 'Button, Card, Badge', priority: 'medium', done: true },
  { id: '3', title: 'Read about server components', notes: 'Module 3', priority: 'low', done: false },
];

const priorityVariant = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
} as const;

export default function TasksPage() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Tasks</h1>

      {tasks.map((task) => (
        <Link key={task.id} href={`/tasks/${task.id}`} className='block'>
          <Card className='transition-colors hover:bg-muted/50'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className={task.done ? 'line-through text-muted-foreground' : ''}>
                  {task.title}
                </CardTitle>
                <Badge variant={priorityVariant[task.priority as keyof typeof priorityVariant]}>
                  {task.priority}
                </Badge>
              </div>
              <CardDescription>{task.notes}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={task.done ? 'outline' : 'secondary'}>
                {task.done ? 'Done' : 'To do'}
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}