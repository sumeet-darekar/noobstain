import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages } from "contentlayer/generated";
import { Mdx } from "@/app/components/post/mdx-components";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: `Sumeet Darekar | ${page.title}`,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="page-container prose dark:prose-invert">
      <div className="page-header">
        <h1>{page.header}</h1>
        <h2>{page.description}</h2>
      </div>
       <iframe
src="https://aichatbot.sendbird.com/playground/index.html?app_id=DE440E09-5C5C-49A7-A842-C1A90344D5C3&bot_id=5Tn9EKJZJIHVl4Oz4P_Ya&region=ap-5"
width="100%"
style="height: 100%; min-height: 700px"
frameborder="0"
></iframe>

      <main className="text-sm">
        <Mdx code={page.body.code} />
      </main>
    </article>
  );
}
