import vine from '@vinejs/vine'

export const RegisterUserValidator = vine.compile(
    vine.object({
        firstname: vine.string().trim().minLength(4).maxLength(256),
        lastname: vine.string().trim().minLength(4).maxLength(256),
        email: vine.string().trim().email().maxLength(256),
        username: vine.string().trim().minLength(4).maxLength(256),
        password: vine.string().trim().minLength(6).maxLength(256),
        // profile_picture: vine.string().trim().minLength(4).maxLength(256).nullable().optional(),
        bio: vine.string().trim().minLength(4).maxLength(256).nullable().optional(),
        location: vine.string().trim().minLength(4).maxLength(256).nullable(),
        role_id: vine.number().min(1).optional(),
    }),
)