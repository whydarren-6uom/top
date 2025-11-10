import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Projects | Darren Wang",
  metadataBase: new URL("https://darrenwang.site/projects"),
  description: "Explore projects built by Darren Wang",
  openGraph: {
    title: "Projects | Darren Wang",
    url: "https://darrenwang.site/projects",
    description: "Explore projects built by Darren Wang",
  },
};

export default async function Project() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas on how it can be improved."
      />

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
            {projects.map((project) => {
              // Use repository URL if available, otherwise show as disabled
              const hasRepository =
                project.repository && project.repository.trim() !== "";

              return hasRepository ? (
                <a
                  href={project.repository}
                  key={project._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-4 dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-4 rounded-lg"
                >
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      width={60}
                      height={60}
                      alt={project.name}
                      className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
                    />
                  ) : (
                    <div className="dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-2 rounded-lg text-3xl">
                      🪴
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg tracking-wide mb-1">
                      {project.name}
                    </h2>
                    <div className="text-sm dark:text-zinc-400 text-zinc-600">
                      {project.tagline}
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  key={project._id}
                  className="flex items-center gap-x-4 dark:bg-primary-bg bg-zinc-50 border border-transparent opacity-60 p-4 rounded-lg cursor-not-allowed"
                >
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      width={60}
                      height={60}
                      alt={project.name}
                      className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
                    />
                  ) : (
                    <div className="dark:bg-primary-bg bg-zinc-50 border border-transparent p-2 rounded-lg text-3xl">
                      🪴
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg tracking-wide mb-1">
                      {project.name}
                    </h2>
                    <div className="text-sm dark:text-zinc-400 text-zinc-600">
                      {project.tagline}
                    </div>
                    <div className="text-xs dark:text-zinc-500 text-zinc-500 mt-1">
                      No repository available
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}
