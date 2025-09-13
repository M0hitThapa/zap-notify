import z from "zod"
export const CATEGORY_VALIDATE_NAME = z.string().min(1, "category name is required").regex(/^[a-zA-Z0-9-]+$/, "category name should only contain letter, number and hyphen")