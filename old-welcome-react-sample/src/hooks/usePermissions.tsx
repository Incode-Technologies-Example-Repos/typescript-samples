import { useEffect, useState } from "react";

const usePermissions = function (): string {
  const [state, setState] = useState("unkwown");
    
  useEffect(() => {
    try {
      navigator.permissions
        .query({ name: "camera" as PermissionName})
        .then(function (result) {
          setState(result.state);
        })
        .catch(() => {
          setState("unkwown");
        });
    } catch (e) {
      setState("unkwown");
    }
  }, []);
    
  return state;
}

export default usePermissions;