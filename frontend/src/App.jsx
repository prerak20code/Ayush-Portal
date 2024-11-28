import { Footer, Header, Layout } from './components';
import RegisterUser from './pages/RegisterUser';
function App() {
    return (
        <div className="w-screen h-screen overflow-y-scroll">
            <Header />
            <RegisterUser />
          
              <Footer />   
           
        </div>
    );
}

export default App;
