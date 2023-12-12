import { useState, useEffect } from "react";
import { type SessionType, FrontId, BackId, ResetPermissions, ProcessId, Selfie, FaceMatch, RetrySteps } from "./components/OnBoarding";
import usePermissions from "./hooks/usePermissions";
import useQuery from "./hooks/useQuery";
import incode from "./incode";
import Steps from "./Steps";

async function startOnboardingSession() {
  const tokenServerURL = import.meta.env.VITE_TOKEN_SERVER_URL as string;
  const response = await fetch(`${tokenServerURL}/start`);
  const session: SessionType = await response.json() as SessionType;
  return session;
}

function App() {
  const [session, setSession] = useState<SessionType|null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const permissionsState = usePermissions();
  const [resetPermissions, setResetPermissions] = useState(false);
  const [liveness, setLiveness] = useState(false);
  const [userExists, setUserExists] = useState(false);
  
  const queryParams = useQuery();
  
  function goNext() {
    setStep(step + 1);
  }
  useEffect(() => {
    startOnboardingSession().then(async (session: SessionType)=>{
      await incode.warmup();
      console.log(session);
      setSession(session);
    }).catch((e)=>console.log(e));  
  }, [queryParams]);
  
  useEffect(() => {
    // if permissions are denied from start, let's show the reset permissions screen
    setResetPermissions(permissionsState === "denied" ? true : false);
  }, [permissionsState]);
  
  function handleErrorEvent(e: {type: string}) {
    if (e.type === "permissionDenied") {
      console.log("denied permissions");
      setResetPermissions(true);
      return;
    }
    setError(true);
  }
  
  function handleError() {
    setError(true);
  }
  
  
  if (!session) return "loading";
  if (resetPermissions) {
    return <ResetPermissions onTryAgain={() => setResetPermissions(false)} />;
  }
  if (error) return "Error!";
  return (
    <div className="App">
      <Steps currentStep={step}>
        <FrontId session={session} onError={handleErrorEvent} onSuccess={goNext}/>
        <BackId session={session}  onError={handleError} onSuccess={goNext}/>
        <ProcessId session={session} onSuccess={goNext}/>
        <Selfie
          session={session}
          onSuccess={(response) => {
            setLiveness(response.liveness);
            setUserExists(response.existingUser);
            goNext();
          }}
          onError={handleError}
        />
        <FaceMatch
          session={session}
          onSuccess={goNext}
          liveness={liveness}
          userExists={userExists}
          onError={handleError}
        />
        <RetrySteps
          session={session}
          numberOfTries={3}
          onSuccess={goNext}
          onError={handleError}
        />
        <div>
          <h1
            style={{
              textAlign: "center",
            }}
          >
    You finished the onboarding process
          </h1>
        </div>
      </Steps>
    </div>
  );
}
  
export default App
  