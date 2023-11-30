import './App.css';
import { Entry } from './pages/entry/Entry.page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from './layout/DefaultLayout';


function App() {
  return (
    <div className="App"> 
      {/* <Entry/> */}
      <DefaultLayout>
        //Dashboard
      </DefaultLayout>
    </div>
  );
}

export default App;
