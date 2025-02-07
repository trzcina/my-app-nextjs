import { flotiqApiClient } from "@/flotiq-api-client";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  readonly params: Promise<{ readonly slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  
  /**
   * Get one blogposts with matching slug
   */
  const content = await flotiqApiClient.content.blogpost.list({
    limit: 1,
    hydrate: 1,
    filters: { slug: { type: "equals", filter: slug } },
  });

  /**
   * If no blogpost was found, return 404
   */
  if (!content?.data?.[0]) {
    return notFound();
  }

  /**
   * Otherwise, show blogpost content for the first matching blogpost
   */
  const blogpost = content.data[0];
  return (
    <div>
      <div className={"mb-4 pb-4 border-b border-gray-800"}>
        {isEnabled ? (
          <p className="text-sm text-red-500">You are browsing in Draft Mode</p>
        ) : (
          <p className="text-sm text-green-500">
            You are browsing only Published content
          </p>
        )}
      </div>
      <Link href={`/blogpost`} className="text-blue-500 hover:underline mb-2 inline-block">
        ← Back to posts
      </Link>
      <h1 className="text-4xl font-bold mb-2">{blogpost.title}</h1>

      <div>
        {blogpost.headerImage?.length ? (
          <Image
            alt={blogpost.headerImage[0].alt || ""}
            src={flotiqApiClient.helpers.getMediaUrl(blogpost.headerImage[0])}
            width={100}
            height={100}
          />
        ) : null}
        <div className={"mb-6"}><p>{blogpost.excerpt}</p></div>
        <div className={"prose"} dangerouslySetInnerHTML={{ __html: blogpost.content }} />
      </div>
    </div>
  );
}
