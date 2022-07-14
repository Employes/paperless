export const childOf = (c, p) => {
    while ((c = c.parentNode) && c !== p);
    return !!c;
};
