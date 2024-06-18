/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";

import Mixpanel from "./utils/mixpanel";
import StudentForm from "./pages/studentform/page";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      Mixpanel?.track("Page View", { path: url });
    };

    // Track initial page load
    Mixpanel?.track("Page View", { path: router.asPath });

    // Add router event listener for route changes
    router?.events?.on("routeChangeComplete", handleRouteChange);

    // Clean up event listener
    return () => {
      router?.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <main>
      <StudentForm />
    </main>
  );
}

export default Home;
