import Hero from "./components/Hero";
import Letter from "./components/Letter";
import WhoWeAre from "./components/WhoWeAre";
import Promises from "./components/Promises";
import Problems from "./components/Problems";
import Timeline from "./components/Timeline";
import Final from "./components/Final";
import { TornEdge } from "./components/Doodles";

export default function App() {
  return (
    <main dir="rtl" className="min-h-screen">
      <Hero />
      <Letter />
      <WhoWeAre />
      <TornEdge from="#f5eedd" to="#eadfc6" seed={5} />
      <Promises />
      <TornEdge from="#eadfc6" to="#1f3d2b" seed={8} />
      <Problems />
      <TornEdge from="#1f3d2b" to="#f5eedd" seed={12} />
      <Timeline />
      <TornEdge from="#f5eedd" to="#1e1e1e" seed={17} />
      <Final />
    </main>
  );
}
