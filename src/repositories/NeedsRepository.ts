import { Needs } from "@prisma/client";

export type Categorys = "Alimento"|"Roupa_E_Calcados"|"Higiene_Pessoal"|"Limpeza"|"Itens_De_Cama"|"Moveis"|"Dinheiro"|"Especialista"|"Voluntario"

export interface CreateNeedsAttributes {
    needs: string
    categoryOfNeed?: Categorys
}

export interface NeedsRepository {
    find: () => Promise<Needs[]>
    findById: (id: number) => Promise<Needs | null>
    create: (attributes: CreateNeedsAttributes) => Promise<Needs>
    updateById: (id: number, attributes: Partial<CreateNeedsAttributes>) => Promise<Needs | null>
    deleteById: (id: number) => Promise<Needs | null>
}