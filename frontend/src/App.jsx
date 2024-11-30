import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Header from './header/Header';
import FilterableImplantsTable from './filterableImplantsTable/FilterableImplantsTable'
import SignIn from './signIn/SignIn';
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

export default App;