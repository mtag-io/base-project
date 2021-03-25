export const capitalize = s => s[0].toUpperCase() + s.slice(1)
export const camelCase = s => s.replace(/[-_]([a-z])/g, g => g[1].toUpperCase())
export const dashCase = s => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
export const componentCase = s => capitalize(
    s.toLowerCase().replace(/[-_]([a-z])/g, g => g[1].toUpperCase())
)