type Rubro = {
    _id: string;
    sectores: string[];
}

export const getUniqueSectors = (rubros: Rubro[]) => {
    const sectoresArry = rubros.map(rubro => rubro.sectores)
    return [...new Set(sectoresArry.reduce((acc, sectores) => acc.concat(sectores), []))]
}