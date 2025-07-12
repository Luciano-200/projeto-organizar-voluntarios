import { z } from "zod";

const Regions = z.enum([
    "Outro_Pais",
    "Regiao_Sul",
    "Regiao_Nordeste",
    "Regiao_Norte",
    "Regiao_Sudeste",
    "Regiao_Centro_Oeste"
])

const Times = z.enum([
    "Manha",
    "Tarde",
    "Noite",
    "ManhaTarde",
    "ManhaNoite",
    "TardeNoite",
    "ManhaTardeNoite"
])

const VolunteerExpertises = z.enum([
    "Nenhuma",
    "Medico",
    "Enfermeiro",
    "Bombeiro",
    "Psicologo",
    "Policial",
    "SalvaVidas",
    "Engenheiro",
    "Veterinario"
])

const VolunteerStatus = z.enum([
    "Fez_Contato",
    "Selecionado",
    "Encerrado"
])

export const CreateVolunteerRequestSchema = z.object({
    accountId: z.number(),
    region: Regions,
    availabilityTime: Times,
    availability: z.string().optional(),
    equipment: z.string().optional(),
    expertise: VolunteerExpertises.optional(),
    status: VolunteerStatus.optional(),
    phoneNumber: z.string().optional()
})

export const UpdateVolunteerRequestSchema = z.object({
    region: Regions.optional(),
    availabilityTime: Times.optional(),
    availability: z.string().optional(),
    equipment: z.string().optional(),
    expertise: VolunteerExpertises.optional(),
    status: VolunteerStatus.optional(),
    phoneNumber: z.string().optional()
})

export const GetVolunteerRequestSchema = z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    status: VolunteerStatus.optional(),
    expertise: VolunteerExpertises.optional(),
    availabilityTime: Times.optional(),
    region: Regions.optional(),
    sortBy: z.enum(["availabilityTime", "status", "expertise", "region"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})