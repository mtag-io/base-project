const noDepth = ["white", "black", "transparent"]

const getClass = (prop, color, depth) => {
    if (noDepth.includes(color) || !depth) {
        return `${prop}-${color}`
    }
    return `${prop}-${color}-${depth} `
}

export const utils = color => ({
    bg: depth => getClass("bg", color, depth),
    border: depth => getClass("border", color, depth),
    txt: depth => getClass("txt", color, depth),
    caret: depth => getClass("caret", color, depth),
})

export class ClassBuilder {
    constructor(classes, defaultClasses) {
        this.defaults =
            (typeof classes === "function" ? classes(defaultClasses) : classes) ||
            defaultClasses

        this.classes = this.defaults
    }

    flush() {
        this.classes = this.defaults

        return this
    }

    extend() {
        return this
    }

    get() {
        return this.classes
    }

    replace(classes, cond = true) {
        if (cond && classes) {
            this.classes = Object.keys(classes).reduce(
                (acc, from) => acc.replace(new RegExp(from, "g"), classes[from]),
                this.classes
            )
        }

        return this
    }

    remove(classes, cond = true) {
        if (cond && classes) {
            this.classes = classes
                .split(" ")
                .reduce(
                    (acc, cur) => acc.replace(new RegExp(cur, "g"), ""),
                    this.classes
                )
        }

        return this
    }

    add(className, cond = true, defaultValue) {
        if (!cond || !className) return this

        switch (typeof className) {
            case "string":
            default:
                this.classes += ` ${className} `
                return this
            case "function":
                this.classes += ` ${className(defaultValue || this.classes)} `
                return this
        }
    }
}

const defaultReserved = ["class", "add", "remove", "replace", "value"]

export const filterProps = (reserved, props) => {
    const r = [...reserved, ...defaultReserved]

    return Object.keys(props).reduce(
        (acc, cur) =>
            cur.includes("$$") || cur.includes("Class") || r.includes(cur)
                ? acc
                : {...acc, [cur]: props[cur]},
        {}
    )
}