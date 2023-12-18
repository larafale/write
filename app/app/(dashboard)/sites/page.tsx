import { Suspense } from "react";
import Sites from "@/components/sites";
import PlaceholderCard from "@/components/placeholder-card";
import CreateSiteButton from "@/components/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma"
import { getUser } from "@/lib/auth";

export default async function AllSites({ params }: { params: { id: string } }) {
  const user = await getUser()
  if (!user) return

  const data = await prisma.site.findFirst({
    where: {
      user: { id: user.id }
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!data || data.userId !== user.id) redirect(`/`)

  return redirect(`/site/${data.id}`)

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Sites
          </h1>
          <CreateSiteButton>
            <CreateSiteModal />
          </CreateSiteButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites />
        </Suspense>
      </div>
    </div>
  );
}