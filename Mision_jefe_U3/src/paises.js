// paises.js — Datos fijos: los países que se pueden elegir.
// codigo = el que entiende la API de Agify (ISO de 2 letras). "" = sin filtrar por país.
export const PAISES = [
  { codigo: "", nombre: "Todo el mundo" },
  { codigo: "ES", nombre: "España" },
  { codigo: "MX", nombre: "México" },
  { codigo: "AR", nombre: "Argentina" },
  { codigo: "CO", nombre: "Colombia" },
  { codigo: "US", nombre: "Estados Unidos" },
  { codigo: "GB", nombre: "Reino Unido" },
  { codigo: "FR", nombre: "Francia" },
  { codigo: "IT", nombre: "Italia" },
  { codigo: "DE", nombre: "Alemania" },
];

// find: devuelve el nombre del país a partir de su código ("ES" → "España")
export function nombrePais(codigo) {
  return PAISES.find((pais) => pais.codigo === codigo)?.nombre ?? codigo;
}
