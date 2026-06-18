import { getDeveloperByUsername } from "@/lib/queries";
import DashboardClientPage from "@/app/dashboard/dashboardClientPage";
import { notFound } from "next/navigation";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  const dev = await getDeveloperByUsername(username);
  if (!dev) notFound();

  return <DashboardClientPage currentUser={dev} />;
}