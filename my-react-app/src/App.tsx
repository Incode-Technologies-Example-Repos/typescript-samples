import { useState, useEffect, useRef} from 'react'
import Steps from "./Steps";
import { RedirectToMobile } from './components/RedirectToMobile';


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
  // Store data that will not trigger re-renders unless specifically told so
  const isLoaded = useRef(false); 

  //Advance to the next Step
  function goNext() {
    setStep(step + 1);
  }

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

  return (
    <>
      {session
        ? (
          <Steps currentStep={step}>
            <RedirectToMobile session={session} onSkip={goNext}/>
            <h1>Finish</h1>
        </Steps>
        )
        : <p>Loading Session...</p>
      }
    </>
  )
}

export default App