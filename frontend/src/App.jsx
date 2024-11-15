import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Header from './header/Header';
import SignIn from './signIn/SignIn';
import FilterableImplantsTable from './filterableImplantsTable/FilterableImplantsTable'
import ScrollTop from './scrollTop/ScrollTop';

function App(props) {
  return (
    <>
      <Header />
      <div id="back-to-top-anchor" style={{ paddingTop: "16px" }} />
      <Routes>
        <Route path="/" element={<FilterableImplantsTable />} />
        <Route path="/home" element={<FilterableImplantsTable />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default App
// const EnelImplants = [
//   { id: 0, name: "Porto Corsini", category: "Termoelettrico", country: "Italia", rated_power: 780, num_unita_presenti: 2, operability: true, availability: true, dateLastUpdate: 1 },
//   { id: 1, name: "La Spezia", category: "Termoelettrico", country: "Italia", rated_power: 0, num_unita_presenti: 3, operability: false, availability: false, dateLastUpdate: 1 },
//   { id: 2, name: "San Isidro", category: "Termoelettrico", country: "Cile", rated_power: 800, num_unita_presenti: 3, operability: true, availability: true, dateLastUpdate: 1 },
//   { id: 3, name: "Entracque", category: "Idroelettrico", country: "Italia", rated_power: 1200, num_unita_presenti: 8, operability: true, availability: true, dateLastUpdate: 1 },
//   { id: 4, name: "Cerro Parbellon", category: "Geotermico", country: "Cile", rated_power: 81, num_unita_presenti: 3, operability: true, availability: true, dateLastUpdate: 1 },
//   { id: 5, name: "Partanna", category: "Eolico", country: "Italia", rated_power: 15, num_unita_presenti: 3, operability: true, availability: true, dateLastUpdate: 1 },
// ];