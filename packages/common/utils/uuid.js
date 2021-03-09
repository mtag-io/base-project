module.exports = {
    uuid: (len = 16) => {
        const h = len;
        const s = s => Math.floor(s).toString(h);
        return s(Date.now() / 1000) + " ".repeat(h).replace(/./g, () => s(Math.random() * h));
    }
};