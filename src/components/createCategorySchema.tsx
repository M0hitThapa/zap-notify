
import z from "zod";

const CATEGORY_NAME_VALIDATOR = z.string().min(3, "category name must have at least 3 character").max(30, "category name can have maximum 30 charatcer")


 const createCategorySchema = z.object({
    name:CATEGORY_NAME_VALIDATOR,
    color:z.string().min(1,"color is needed").regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
    emoji:z.emoji("Invalid emoji").optional()
})

export default createCategorySchema