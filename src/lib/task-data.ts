import { Task } from '@/types/task'
import { generateClient } from 'aws-amplify/data'
import { type Schema } from '@/../amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/../amplify_outputs.json'

Amplify.configure(outputs)

const client = generateClient<Schema>()

export const getTasks = async (): Promise<Task[]> => {
  const { data: todos, errors } = await client.models.Todo.list()

  if (errors) {
    console.error('Error fetching tasks:', errors)
    return []
  }

  return (
    todos?.map((todo) => ({
      ...todo,
      description: todo.description ?? undefined,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
      status: todo.status ?? 'todo',
    })) || []
  )
}

export const getTaskById = async (id: string): Promise<Task | undefined> => {
  const tasks = await getTasks()
  const task = tasks.find((task) => task.id === id)

  if (!task) {
    console.warn(`Task with id ${id} not found`)
    return undefined
  }

  return {
    ...task,
    description: task.description ?? undefined,
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    status: task.status ?? 'todo',
  }
}

export const createTask = async (
  taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Task> => {
  const { errors, data: newTodo } = await client.models.Todo.create({
    title: taskData.title,
    description: taskData.description || undefined,
    dueDate: taskData.dueDate ? taskData.dueDate.toISOString() : undefined,
    status: taskData.status,
  })

  if (errors) {
    console.error('Error creating task:', errors)
    throw new Error('Failed to create task')
  }

  if (!newTodo) {
    throw new Error('Failed to create task: newTodo is null')
  }

  return {
    id: newTodo.id,
    title: newTodo.title,
    description: newTodo.description || undefined,
    dueDate: newTodo.dueDate ? new Date(newTodo.dueDate) : undefined,
    status: newTodo.status || 'todo',
    createdAt: new Date(newTodo.createdAt),
    updatedAt: new Date(newTodo.updatedAt),
  }
}

export const updateTask = async (
  id: string,
  updates: Partial<Task>,
): Promise<Task | undefined> => {
  const { data: updatedTodo, errors } = await client.models.Todo.update({
    id,
    title: updates.title,
    description: updates.description || undefined,
    dueDate: updates.dueDate ? updates.dueDate.toISOString() : undefined,
    status: updates.status,
  })

  if (errors) {
    console.error('Error updating task:', errors)
    return undefined
  }

  if (!updatedTodo) {
    console.warn(`Task with id ${id} not found for update`)
    return undefined
  }

  return {
    id: updatedTodo.id,
    title: updatedTodo.title,
    description: updatedTodo.description || undefined,
    dueDate: updatedTodo.dueDate ? new Date(updatedTodo.dueDate) : undefined,
    status: updatedTodo.status || 'todo',
    createdAt: new Date(updatedTodo.createdAt),
    updatedAt: new Date(updatedTodo.updatedAt),
  }
}

export const deleteTask = async (id: string): Promise<boolean> => {
  // 最新のデータを取得してから削除対象を確認する
  const { data: todos, errors: listErrors } = await client.models.Todo.list()
  if (listErrors || !todos) {
    console.error('Error fetching tasks for deletion:', listErrors)
    return false
  }

  const taskToDelete = todos.find((task) => task.id === id)
  if (!taskToDelete) {
    console.warn(`Task with id ${id} not found for deletion`)
    return false
  }

  const { data: deletedTodo, errors } =
    await client.models.Todo.delete(taskToDelete)

  if (errors) {
    console.error('Error deleting task:', errors)
    return false
  }

  return !!deletedTodo
}
