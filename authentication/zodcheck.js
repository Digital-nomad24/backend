const { z } = require('zod');

export const userZod = z.object({
    username: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(1),
    Email: z.string().email().min(1)
});
export const signinzod=z.object({
    email:z.string().email().min(1),
    password: z.string().min(1)
})

