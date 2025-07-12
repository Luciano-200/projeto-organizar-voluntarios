import { z } from "zod";

const Categorys = z.enum([
    "Alimento",
    "Roupa_E_Calcados",
    "Higiene_Pessoal",
    "Limpeza",
    "Itens_De_Cama",
    "Moveis",
    "Dinheiro",
    "Especialista",
    "Voluntario"
])

export const CreateNeedRequestSchema = z.object({
    needs: z.string(),
    categoryOfNeed: Categorys.optional()
})

export const UpdateNeedRequestSchema = z.object({
    needs: z.string().optional(),
    categoryOfNeed: Categorys.optional()
})