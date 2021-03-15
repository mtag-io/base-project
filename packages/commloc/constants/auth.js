export const createAnonymousUser = (anonymousUser, anonymousRoleKey) => ({
    ...anonymousUser,
    role: anonymousRoleKey
})
