import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";
import { projectSummary as specterSummary } from "./specter";
import { projectSummary as powerchatSummary } from "./powerchat";
import { projectSummary as solid2Summary } from "./solid-2";
import { projectSummary as solidSocketSummary } from "./solid-socket";
import { projectSummary as solidEventsSummary } from "./solid-events";
import { projectSummary as qbridgeSummary } from "./qbridge";
import { projectSummary as qaiHubSummary } from "./qai-hub";
import { projectSummary as dawadaddySummary } from "./dawadaddy";
import { projectSummary as scrumgptSummary } from "./scrumgpt";
import { projectSummary as caresourceSummary } from "./caresource";
import { projectSummary as momentumDevconSummary } from "./momentum-devcon";
import { projectSummary as protocheckSummary } from "./protocheck";
import { projectSummary as devtranetSummary } from "./devtranet";
import { projectSummary as osdpSummary } from "./osdp";
import { projectSummary as hackathonSuiteSummary } from "./hackathon-suite";
import { projectSummary as professionalAcceleratorSummary } from "./professional-accelerator";
import { projectSummary as oyasSummary } from "./oyas";
import { projectSummary as torpedoshoesSummary } from "./torpedoshoes";
import { projectSummary as thingzoneSummary } from "./thingzone";
import { projectSummary as healthyLovedOnesSummary } from "./healthy-loved-ones";
import { projectSummary as weddingPlannerSummary } from "./wedding-planner";
import { projectSummary as bvpRegistrySummary } from "./bvp-registry";

const projectTiles = [
  { ...specterSummary, title: "Specter" },
  { ...powerchatSummary, title: "PowerChat" },
  { ...solid2Summary, title: "Solid 2.0" },
  { ...solidSocketSummary, title: "Solid Socket" },
  { ...solidEventsSummary, title: "Solid Events" },
  { ...qbridgeSummary, title: "QBridg" },
  { ...qaiHubSummary, title: "QAI Hub" },
  { ...dawadaddySummary, title: "DawaDaddy" },
  { ...scrumgptSummary, title: "ScrumGPT" },
  { ...caresourceSummary, title: "CareSource" },
  { ...momentumDevconSummary, title: "Momentum App" },
  { ...protocheckSummary, title: "ProtoCheck" },
  { ...devtranetSummary, title: "Devtranet" },
  { ...osdpSummary, title: "Ohio Sentencing Data Platform" },
  { ...hackathonSuiteSummary, title: "Hackathon Suite" },
  { ...professionalAcceleratorSummary, title: "Professional Accelerator" },
  { ...oyasSummary, title: "OYAS" },
  { ...torpedoshoesSummary, title: "TorpedoShoes" },
  { ...thingzoneSummary, title: "ThingZone" },
  { ...healthyLovedOnesSummary, title: "HealthyLovedOnes" },
  { ...weddingPlannerSummary, title: "Wedding Planner" },
  { ...bvpRegistrySummary, title: "BVP Registry" },
] as const;

export default function WorkPage() {
  return (
    <>
      <PageMeta
        title="Projects"
        description="Projects by Dev Agrawal across products, open source, civic technology, AI, and developer tools."
        ogImage="/og/work.svg"
      />
      <div class="sketch-page">
        <h1 class="sketch-heading">Projects</h1>
        <div class="project-grid">
          <For each={projectTiles}>
            {(project) => (
              <A href={`/projects/${project.slug}`} class="sketch-card project-tile">
                <h2>{project.title}</h2>
              </A>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
