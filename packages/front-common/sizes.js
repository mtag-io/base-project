import {imgSizes, sizes} from '../common/units.const'

export const imgSize = s => imgSizes[s]

// height
export const h = s => `h-${sizes[s]}`

// width
export const w = s => `w-${sizes[s]}`

// padding
export const p = s => `p-${sizes[s]}`
export const px = s => `px-${sizes[s]}`
export const py = s => `py-${sizes[s]}`
export const pl = s => `pl-${sizes[s]}`
export const pr = s => `pr-${sizes[s]}`
export const pt = s => `pt-${sizes[s]}`
export const pb = s => `pb-${sizes[s]}`

// margin
export const m = s => `m-${sizes[s]}`
export const mx = s => `mx-${sizes[s]}`
export const my = s => `my-${sizes[s]}`
export const ml = s => `ml-${sizes[s]}`
export const mr = s => `mr-${sizes[s]}`
export const mt = s => `mt-${sizes[s]}`
export const mb = s => `mb-${sizes[s]}`

export const roundSize = (s, limits) => {
    if(!limits || !limits.length) return ''
    if(s < limits[0]) return limits[0].toString()
    for (let i = 0; i < limits.length - 2; i++) {
        if ((s > limits[i]) && (s <= limits[i + 1])) return limits[i+1].toString()
    }
    return limits[limits.length - 1].toString()
}