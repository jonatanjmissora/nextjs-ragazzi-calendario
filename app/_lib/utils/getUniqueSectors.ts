type Rubro = {
    _id: string;
    sectores: string[];
}

export const getUniqueSectors = (rubros: Rubro[]) => {
    return [...new Set(rubros.reduce((acc, rubro) => acc.concat(rubro.sectores) ,[]))]
}