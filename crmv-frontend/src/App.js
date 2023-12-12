import './App.css';
import { Entry } from './pages/entry/Entry.page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from './pages/dashboard/Dashboard.page';
import { AddTicket } from './pages/new ticket/addTicket.page';
import { TicketLists } from './pages/ticket-list/TicketLists.page';
import { Ticket } from './pages/ticket/Ticket.page';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { PrivateRoute } from './components/private-route/PrivateRoute.comp';
import { DefaultLayout } from './layout/DefaultLayout';
import React from 'react';

function App() {

  return (
    <div className="App"> 
      <Router>
        <Routes>
            <Route path="/" element={<Entry/>} />
            <Route path="/dashboard/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="/add-ticket/" element={<PrivateRoute><AddTicket/></PrivateRoute>}/>
            <Route path="/tickets/" element={<PrivateRoute><TicketLists/></PrivateRoute>}/>
            <Route path="/ticket/:tId" element={<PrivateRoute><Ticket/></PrivateRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/*
bugs: 

wrong password
calling /dashboard from address bar
ticket messages not loading
UI looks bad
*/