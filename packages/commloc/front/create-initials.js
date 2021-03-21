export const createInitials = info => {
    // info is an email
    if (info.includes('@')) {
        return info.split('@')[0].slice(0, 2).toUpperCase()
    }
    // info is a full name
    if (info.includes(' ')) return info.trim().split(' ').filter(s => !!s).reduce(
        (acc, part) => {
            if (part.trim() && acc.length < 2) acc += part[0].toUpperCase()
            return acc
        }, '')

    return info.length > 1
        ? info.slice(0, 2).toUpperCase()
        : info.toUpperCase() + info.toUpperCase()
}