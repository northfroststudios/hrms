import { z } from 'zod';

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "image/gif",
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const formatFileSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)}MB`;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(5, { message: 'Full Name must be at least 5 characters' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirm_password: z.string().min(8, { message: 'Password must be at least 8 characters' })
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password']
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email()
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirm_password: z.string().min(8, { message: 'Password must be at least 8 characters' })
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password']
});

export const OnboardingSchema = z.object({
  company_name: z.string().min(2, { message: 'Company Name must be at least 2 characters' }).optional(),
  company_code: z.string().min(2, { message: 'Company Code must be at least 2 characters' }).optional(),
  company_logo: z.instanceof(File).superRefine((file, ctx) => {
    if (!ALLOWED_MIME_TYPES.includes(file.type as typeof ALLOWED_MIME_TYPES[number])) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File must be a valid image (JPEG, PNG, WebP, or GIF)",
      });
    }
    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `File size must be less than 5MB. Got: ${formatFileSize(file.size)}`,
      });
    }
  }).optional()
});