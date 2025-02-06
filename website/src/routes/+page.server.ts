

export const load = async (req, res) => {
    const size = 32;

    const offsetX = Math.round((Math.random() - 2) * size);
    const offsetY = Math.round((Math.random() - 2) * size);

    return {
        size, offsetX, offsetY
    }
}