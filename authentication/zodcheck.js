const { z } = require('zod');

const userZod = z.object({
    username: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(1),
    email: z.string().email().min(1)
});
const signinzod=z.object({
    email:z.string().email().min(1),
    password: z.string().min(1)
})
module.exports = {userZod,signinzod};
