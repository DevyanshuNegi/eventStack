import { compare, hash } from 'bcrypt'
import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema<User> = new mongoose.Schema({

  name:{type:String, required:false},
  email:{type:String, required:true},
  password:{type:String, required:true},
  createdAt:{type:Date, required:true},
  updatedAt:{type:Date, required:true},
}
  , { timestamps: true })

export const User = mongoose.models.User || mongoose.model<User>('User', UserSchema)

export async function createUser(user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  // const client = await clientPromise
  // const db = client.db()

  const existingUser = await User.findOne({ email: user.email })
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

  const result = await User.create(newUser)
  return { ...newUser, _id: result.insertedId }
}

export async function getUserByEmail(email: string): Promise<User | null> {


  return User.findOne({ email })
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await compare(password, user.password)
  return isValid ? user : null
}

