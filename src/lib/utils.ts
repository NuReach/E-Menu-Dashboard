import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}


export function generateToken(userId: number) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '12h' });
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}


interface Jwt {
  userId: number;
  exp: number;
  iat : number;
}

export async function verifyToken(token: string): Promise<Jwt | null> {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as Jwt;

    const isExpired = decoded.exp <= Date.now() / 1000; 

    return isExpired ? null : decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null; 
  }
}


