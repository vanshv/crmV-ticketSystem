import './App.css';
import { Entry } from './pages/entry/Entry.page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from './pages/dashboard/Dashboard.page';
import { AddTicket } from './pages/new ticket/addTicket.page';
import {TicketLists} from './pages/ticket-list/TicketLists.page';
import { Ticket } from './pages/ticket/Ticket.page';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PrivateRoute } from './components/private-route/PrivateRoute.comp';
import { DefaultLayout } from './layout/DefaultLayout';
import React from 'react';

function App() {
  return (
    <div className="App"> 
      <Router>
        <Routes>

           <Route exact path="/" element={<Entry/>} />
            <Route path="/dashboard" element={<DefaultLayout><Dashboard/></DefaultLayout>}/>
            <Route path="/add-ticket" element={<DefaultLayout><AddTicket/></DefaultLayout>}/>
            <Route path="/tickets" element={<DefaultLayout><TicketLists/></DefaultLayout>}/>
            <Route path="/ticket/:tId" element={<DefaultLayout><Ticket/></DefaultLayout>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
