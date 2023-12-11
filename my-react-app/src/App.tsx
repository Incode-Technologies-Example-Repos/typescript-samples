import { useState, useEffect, useRef } from 'react'
import Steps from "./components/Steps";
import { RedirectToMobile } from './components/RedirectToMobile';
import { FrontId } from './components/FrontId';
import { BackId } from './components/BackId';
import { ProcessId } from './components/ProcessId';
import { Selfie } from './components/Selfie';

//Function to fetch the onboarding session
async function startOnboardingSession() {
  const tokenServerURL = import.meta.env.VITE_TOKEN_SERVER_URL as string;
  const response = await fetch(`${tokenServerURL}/start`);
  const session = await response.json();
  return session;
}

function App() {
  const [session, setSession] = useState(null); // Stores the Session
  
  const [step, setStep] = useState(0); // Store the current step
  //Advance to the next Step
  function goNext() {
    setStep(step + 1);
  }
  
  // Error Handling
  const [error, setError] = useState("");
  //Handling Error
  function handleError(e: { type: string; }) {
    setError(e.type);
  }
  
  // Store data that will not trigger re-renders unless specifically told so
  const isLoaded = useRef(false); 

  // Run this after the initial loading
  useEffect(() => {
    // Only fetch the data if we havent fetched it yet
    if (isLoaded.current) return;
    
    //Fetch the session and save it on the session variable
    startOnboardingSession().then(async (session) => {
      setSession(session);
    }).catch(
      (e)=>console.log(e)
    );
    // We already sent the async call, don't call it again
    isLoaded.current = true;
  }, []);

  if (!session) return (<p>Loading Session...</p>);
  if (error) return (<p>Error: {error}!</p>);
  return (
    <Steps currentStep={step}>
      <RedirectToMobile session={session} onSkip={goNext}/>
      <FrontId session={session} onError={handleError} onSuccess={goNext}/>
      <BackId session={session} onError={handleError} onSuccess={goNext}/>
      <ProcessId session={session} onSuccess={goNext}/>
      <Selfie session={session} onError={handleError} onSuccess={goNext}/>
      <h1>Finish</h1>
    </Steps>
  )
}

export default App