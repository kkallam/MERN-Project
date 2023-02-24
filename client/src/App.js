
import { useNavigate } from 'react-router-dom';
import './App.css';
import DisplayUser from './components/DisplayUser';
import { CreateUser } from './components/CreateUser';
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h2>welcome to CRUD operations demo</h2>
      <div className='app-header-content'>
        <p>Welcome to Legacy Tech Systems Resources Info. This is for ADMIN view only. </p>
        {/* <button onClick={() => { navigate("createuser") }}>Create a new user account</button> */}
        {/* <button onClick={() => { navigate("getallusers") }}>View All Users Info</button> */}
  
      </div>
      <div className='app-user-content'>
          <CreateUser />
          <DisplayUser />
      </div>

    </div>
  );
}

export default App;
