import { Volunteer } from "@prisma/client"

export type Regions = "Outro_Pais"|"Regiao_Sul"|"Regiao_Nordeste"| "Regiao_Norte"| "Regiao_Sudeste"| "Regiao_Centro_Oeste"
export type Times = "Manha"|"Tarde"|"Noite"|"ManhaTarde"|"ManhaNoite"|"TardeNoite"|"ManhaTardeNoite"
export type VolunteerExpertises = "Nenhuma"|"Medico"|"Enfermeiro"|"Bombeiro"|"Psicologo"|"Policial"|"SalvaVidas"|"Engenheiro"|"Veterinario"
export type VolunteerStatus = "Fez_Contato"|"Selecionado"|"Encerrado"

export interface CreateVolunteerAttributes {
    accountId: number
    region: Regions
    availabilityTime: Times
    availability?: string
    equipment?: string
    expertise?: VolunteerExpertises
    status?: VolunteerStatus
    phoneNumber?: string
}

export interface VolunteerWhereParams {
    status?: VolunteerStatus
    availabilityTime?: Times
    region?: Regions
    expertise?: VolunteerExpertises
}

export interface FindVolunteerParams {
  where?: VolunteerWhereParams
  sortBy?: "region" | "status" | "availabilityTime" | "expertise"
  order?: "asc" | "desc"
  limit?: number
  offset?: number
}

export interface VolunteerRepository {
    find: (params: FindVolunteerParams) => Promise<Volunteer[]>
    findById: (id: number) => Promise<Volunteer | null>
    count: (where: VolunteerWhereParams) => Promise <number>
    create: (attributes: CreateVolunteerAttributes) => Promise<Volunteer>
    updateById: (id: number, attributes: Partial<CreateVolunteerAttributes>) => Promise<Volunteer | null>
    deleteById: (id: number) => Promise<Volunteer | null>
}