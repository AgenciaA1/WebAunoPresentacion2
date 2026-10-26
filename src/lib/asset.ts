/** Prefixes a /public path with the deploy base (e.g. GitHub Pages subpath). */
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '');
