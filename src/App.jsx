import Body from "./componenets/body"
import Profile from "./componenets/profile"
import Login from "./componenets/login"
import Feed from "./componenets/feed"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
function App() {
 

  return (
    <>
     <Provider store={appStore}>
     <BrowserRouter basename="/">
       <Routes>
       <Route path="/" element={<Body/>}>
       <Route path="/" element={<Feed/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/profile" element={<Profile/>}/>
       </Route>
       </Routes>
        
     
     </BrowserRouter>
    
    </Provider>
     
    </>
  );
}

export default App
