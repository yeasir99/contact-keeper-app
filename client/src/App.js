import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import AppRoutes from './AppRoutes';
import { ContactProvider } from './context/contact/ContactState';

import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthProvider>
      <ContactProvider>
        <AlertState>
          <Router>
            <Navbar />
            <div className="container">
              <Alerts />
              <AppRoutes />
            </div>
          </Router>
        </AlertState>
      </ContactProvider>
    </AuthProvider>
  );
};

export default App;
