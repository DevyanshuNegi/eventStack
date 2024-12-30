import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { hash, compare } from 'bcrypt'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export async function createUser(user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const client = await clientPromise
  const db = client.db()

  const existingUser = await db.collection<User>('users').findOne({ email: user.email })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(user.password, 10)
  const now = new Date()
  const newUser: User = {
    ...user,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  }

  const result = await db.collection<User>('users').insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise
  const db = client.db()

  return db.collection<User>('users').findOne({ email })
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await compare(password, user.password)
  return isValid ? user : null
}

