# Integrating the Incode Web SDK with Next.js

This guide provides step-by-step instructions for integrating the Incode Web SDK with Next.js.

### Considerations

- The Incode Web SDK is primarily designed for client-side rendering. While most functionality is available, it's not optimized for server-side rendering.
- Currently, the Incode Web SDK package is not compatible with server-side rendering solutions. To use it, you must import it via a script.
- For security reasons, session tokens and data fetching should be handled on the backend to protect your API keys and sensitive data.

### Integration Steps

1. While working with Next.js and TypeScript, declare the `OnBoarding` element in the `window` or `GlobalThis` object to prevent any build issues while using the Incode Web SDK. As a recommendation, declare it at the top-level entry file to ensure the element is available across the app.

   ```typescript
   declare global {
    interface Window {
        OnBoarding: any;
    }
   }
   ```

2. Load the CDN library script using Next.js's `next/script` module, utilizing the "beforeInteractive" strategy to ensure the SDK is available.

   ```typescript
   // pages.tsx
   import Script from "next/script"; 

   export default function Home() {
    return (
        <>
            <Script
                id="incode-sdk"
                src="https://sdk.incode.com/sdk/onBoarding-1.70.0.js"
                strategy="beforeInteractive"
            /> 
        </>
    );
   }
   ```

3. Now that we have the Incode Web SDK loaded, initialize it to enable the SDK to start calling the different methods.

4. To seamlessly integrate the Incode Web SDK into your application, follow the instructions outlined in the [How to use Web SDK](https://developer.incode.com/docs/tutorial-creating-an-identity-validation-app#capture-and-validate-an-id-card) guide. By adhering to these steps, you'll gain access to the data capture tools, allowing you to seamlessly integrate them into your application based on your preferred architecture strategy.



```typescript
// UserConsent.tsx
'use client';
import Script from "next/script";
import { useEffect, useRef } from "react";

function UserConsent({ session, baseUrl }: UserConsentPropTypes) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);
    
    let incode: any;

    useEffect(() => {
        if (!incode && window.OnBoarding) {
            // Initialize the SDK 
            incode = window.OnBoarding;
            incode.create({
                apiURL: baseUrl
            });
        }
        
        if (incode && isMounted.current) {
            return;
        }
        
        incode.renderUserConsent(containerRef.current, {
            onSuccess: () => { captureAndContinue() },
            session: session,
        });
        isMounted.current = true;

    }, [session]);

}

export { UserConsent };
```