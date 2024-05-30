import React , {useEffect} from "react"; 
import {  useDispatch } from 'react-redux';
import {  Routes, Route } from "react-router-dom";
import Title from "./components/Title";
import SmileCard from "./components/SmileCard";  
import Machines from "./components/Machines";
import Filters from "./components/Filters";
import Card from "./components/RaiseCard"; 
import AbnormalityRecord from "./components/AbnormalityRecord";
import SummaryAbnormality from "./components/SummaryAbnormality"; 
import SummaryCard from "./components/SummaryCard";
import SmileCardAdd from "./components/SmileCardAdd";
import PendingTask from "./components/PendingTask/PendingTask";
import TeamLeader from "./components/TeamLeader/TeamLeader"
import PendingSmileCard from "./components/PendingTask/PendingSmileCard"
import AllMachineSmileCard from "./components/AllMachine/AllMachineSmileCard"
import { AppSidebar } from "./components/Sidebar"; 
import AllMachine from "./components/AllMachine/AllMachine"; 
import { useCookies } from "react-cookie";
import { login } from "./redux/auth/AuthSlice";
import axios from "axios";
import { toast } from "react-toastify";
import JudgementHistoryPage from "./components/JudgementHistoryPage";

function App() { 
  const dispatch = useDispatch(); 
  const [cookies] = useCookies(['token', 'userId']);
  const {  token, userId } = cookies; 
 

  const loginWithToken = async ()  => { 
   await axios
      .post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/user/tokenlogin`,
        { token, userId }
      )
      .then((result) => {
        if (result.data.success) {
         
          dispatch(
            login({
              user: result.data.user,
              token: result.data.token,
            })
          ); 
        }
      })
      .catch((err) => {
        toast.error("Enter correct user Name & Password"); 
      });
  };


  useEffect(() => {     
    if (token) { 
      loginWithToken()
    }
  }, [dispatch]);

  
  return (
    
      <AppSidebar>  
       
        <Title />
        <Filters />
        <Routes>
          <Route path="/" element={<Machines />} />
          <Route path="/checkList" element={<SmileCard />} />
          <Route path="/pendingTasks" element={<PendingTask />} />
          <Route path="/judgementHistory" element={<JudgementHistoryPage />} />
          <Route path="/pendingTasks/cardDetails" element={<PendingSmileCard/>}></Route>
          <Route path="/allMachine/cardDetails" element={<AllMachineSmileCard/>}></Route>
          <Route path="/card" element={<Card />} /> 
          <Route path="/abnormality" element={<AbnormalityRecord />} />
          <Route path="/summaryAbnormality" element={<SummaryAbnormality />} />
          <Route path="/summaryCards" element={<SummaryCard />} />
          <Route path="/addCheckItems" element={<SmileCardAdd />} />
          <Route path="/allMachine" element={<AllMachine />} />
          <Route path="/teamleader" element={<TeamLeader />} />
        </Routes>
       
      </AppSidebar>
    
  );
}

export default App;
