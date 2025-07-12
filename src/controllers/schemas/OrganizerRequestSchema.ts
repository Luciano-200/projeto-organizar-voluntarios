import { z } from "zod";

export const CreateOrganizerRequestSchema = z.object ({
    accountId: z.number()
})