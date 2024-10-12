import FilterableImplantsTable from './filterableImplantsTable/FilterableImplantsTable'

const EnelImplants = [
  { id: 0, name: "Porto Corsini", category: "Termoelettrico", country: "Italia", ratedPower: 780, NumUnitàPresenti: 2, operability: true, availability: true },
  { id: 1, name: "La Spezia", category: "Termoelettrico", country: "Italia", ratedPower: 0, NumUnitàPresenti: 3, operability: false, availability: false },
  { id: 2, name: "San Isidro", category: "Termoelettrico", country: "Cile", ratedPower: 800, NumUnitàPresenti: 3, operability: true, availability: true },
  { id: 3, name: "Entracque", category: "Idroelettrico", country: "Italia", ratedPower: 1200, NumUnitàPresenti: 8, operability: true, availability: true },
  { id: 4, name: "Cerro Parbellon", category: "Geotermico", country: "Cile", ratedPower: 81, NumUnitàPresenti: 3, operability: true, availability: true },
  { id: 5, name: "Partanna", category: "Eolico", country: "Italia", ratedPower: 15, NumUnitàPresenti: 3, operability: true, availability: true },
];

export default function App() {
  return <FilterableImplantsTable enelImplants={EnelImplants} />;
}
