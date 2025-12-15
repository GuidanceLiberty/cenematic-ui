import React from "react";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import loaderBg from "@/assets/img/hero/loaderbg1.jpg";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Begin from "./components/Begin";
import Index from "./components/Index";
import Origin from "./components/Origin";
import Gift from "./components/Gift";
import Library from "./components/Library";
import Inspiration from "./components/Inspiration";
import Sprite from "./components/Sprite";
import Main from "./components/Main";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <Loader bgImage={loaderBg} onComplete={() => setLoaded(true)} />;
  }

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/hero", element: <Hero /> },
    { path: "/begin", element: <Begin /> },
    { path: "/index", element: <Index /> },
    { path: "/origin", element: <Origin /> },
    { path: "/gift", element: <Gift /> },
    { path: "/library", element: <Library /> },
    { path: "/sprite", element: <Sprite /> },
    { path: "/inspiry", element: <Inspiration /> },
    { path: "/main", element: <Main /> },

  ]);
  return <RouterProvider router={router} />;
};

export default App;
