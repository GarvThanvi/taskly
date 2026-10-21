// src/app/tasks/page.tsx
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTasks } from '@/lib/tasks';
import { TaskForm } from '@/components/task-form';

const priorityVariant = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
} as const;

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Tasks</h1>
      <TaskForm></TaskForm>
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