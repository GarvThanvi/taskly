// components/task-edit-form.tsx
'use client';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { updateTask } from '@/actions/task';
import { updateTaskSchema, type TaskUpdate } from '@/lib/validations/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TaskEditFormProps = {
  taskData: {
    id: string;
    title: string;
    notes: string | null;
    priority: string;
    dueDate: Date | null;
  };
};

export function TaskEditForm({ taskData }: TaskEditFormProps) {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<TaskUpdate>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: taskData.title,
      notes: taskData.notes ?? '',
      priority: taskData.priority as TaskUpdate['priority'],
      dueDate: taskData.dueDate ? taskData.dueDate.toISOString().slice(0, 10) : '',
    },
  });

  const onSubmit = (values: TaskUpdate) =>
    startTransition(async () => {
      const res = await updateTask(taskData.id, values);
      if (res.ok) {
        reset(values); // saved values become the new baseline
        toast.success('Task updated');
        return;
      }
      for (const [field, msgs] of Object.entries(res.errors)) {
        setError(field as keyof TaskUpdate, { message: msgs?.[0] });
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-1'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' {...register('title')} />
        {errors.title && <p className='text-sm text-destructive'>{errors.title.message}</p>}
      </div>

      <div className='space-y-1'>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea id='notes' {...register('notes')} />
        {errors.notes && <p className='text-sm text-destructive'>{errors.notes.message}</p>}
      </div>

      <div className='flex gap-4'>
        <div className='space-y-1'>
          <Label htmlFor='priority'>Priority</Label>
          <select id='priority' {...register('priority')} className='block rounded-md border p-2'>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
          {errors.priority && <p className='text-sm text-destructive'>{errors.priority.message}</p>}
        </div>

        <div className='space-y-1'>
          <Label htmlFor='dueDate'>Due date</Label>
          <Input id='dueDate' type='date' {...register('dueDate')} />
          {errors.dueDate && <p className='text-sm text-destructive'>{errors.dueDate.message}</p>}
        </div>
      </div>

      <Button type='submit' disabled={pending || !isDirty}>
        {pending ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  );
}