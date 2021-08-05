import './App.css';
import Login from './components/login/login';
import AppShell from './components/app-shell/app-shell'
import { init } from './service/auth/auth-token';

init();

function App() {
  return (
    <div className="App h-100">
      {/* <Login></Login> */}
      <AppShell></AppShell>
    </div>
  );
};

export default App;
