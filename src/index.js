import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App';
import Chat from './Chat';
import MyProfile from './MyProfile';
import { globalStore } from './redux/globalStore';
import { Provider } from 'react-redux';
import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ThemeProvider } from '@emotion/react';
import { PersistGate } from 'redux-persist/integration/react';
import { persist } from './redux/globalStore';

const theme = createTheme({
  palette: {
    primary: blue,
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={globalStore}>
    <PersistGate persistor={persist}></PersistGate>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path=':chatID' element={<Chat />}></Route>
          </Route>
          <Route path='/myprofile' element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider >
);
