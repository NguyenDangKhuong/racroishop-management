export const __prod__ = process.env.NODE_ENV === 'production'

export const BACKEND_HOST = __prod__
  ? process.env.NEXT_PUBLIC_BACK_END_HOST_PROD
  : process.env.NEXT_PUBLIC_BACK_END_HOST_DEV

export const CLOUD_NAME_CLOUDINARY =
  process.env.NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY
export const API_KEY_CLOUDINARY = process.env.NEXT_PUBLIC_API_KEY_CLOUDINARY
export const API_SECRET_CLOUDINARY =
  process.env.NEXT_PUBLIC_API_SECRET_CLOUDINARY

export const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME
export const SECRET_COOKIE_PASSWORD =
  process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD
