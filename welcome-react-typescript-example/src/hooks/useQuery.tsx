import { useMemo } from "react";

export default function useQuery() {
    return useMemo(() => new URLSearchParams(window.location.search), []);
}