export const clickOutside = (node, onEventFunction) => {
    const handleClick = event => {
        const path = event.composedPath();
        if (!path.includes(node)) {
            onEventFunction();
        }
    }
    document.addEventListener("click", handleClick);

    return {
        destroy() {
            document.removeEventListener("click", handleClick);
        }
    }
}