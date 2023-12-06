import './App.css';
import { Entry } from './pages/entry/Entry.page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from './layout/DefaultLayout';
import { Dashboard } from './pages/dashboard/Dashboard.page';
import { AddTicket } from './pages/new ticket/addTicket.page';
import {TicketLists} from './pages/ticket-list/TicketLists.page';


function App() {
  return (
    <div className="App"> 
      {/* <Entry/> */}
      <DefaultLayout>
        {/* <Dashboard/> */}
        {/* <AddTicket/> */}
        <TicketLists/>
      </DefaultLayout>
    </div>
  );
}

export default App;
