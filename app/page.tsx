import App from "./App";
import { getPortfolioData } from "@/lib/portfolio-data";

export default async function Page() {
  const { experience, projects, leetcode, contact } = await getPortfolioData();
  return (
    <App experience={experience} projects={projects} leetcode={leetcode} contact={contact} />
  );
}
