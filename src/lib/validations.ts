import { z } from 'zod';

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['farmer', 'trader', 'expert']),
  location: z.string().min(2, 'Please enter your location'),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Please enter your location'),
  phone: z.string().optional(),
});

// Marketplace Schemas
export const listingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  unit: z.string().min(1, 'Please specify the unit'),
  quantity: z.string().min(1, 'Please specify the quantity available'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(2, 'Please enter your location'),
  sellerPhone: z.string().min(10, 'Please enter a valid phone number'),
});

// Forum Schemas
export const forumPostSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
});

export const forumReplySchema = z.object({
  content: z.string().min(10, 'Reply must be at least 10 characters'),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type ListingFormData = z.infer<typeof listingSchema>;
export type ForumPostFormData = z.infer<typeof forumPostSchema>;
export type ForumReplyFormData = z.infer<typeof forumReplySchema>;