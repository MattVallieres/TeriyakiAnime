import { Hero } from "./components/Hero";
import { Popular } from "./components/Popular";

import { Recommendations } from "./components/Recommendations";

export default function Home() {
  return (
    <>
    <Hero />
    <Recommendations />
    <Popular />
    </>
  );
}
