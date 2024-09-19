import { BrowserRouter as Router} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx';

createRoot(document.getElementById("root")).render(
  <Router>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </Router>
);
