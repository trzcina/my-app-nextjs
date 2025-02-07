import { flotiqApiClient } from "@/flotiq-api-client";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage() {
  const { isEnabled } = await draftMode();
  
  /**
   * Get one blogposts with matching slug
   */
  const content = await flotiqApiClient.content.blogpost.list({
    limit: 100,
    hydrate: 1,
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
  return <div>
    <div className={"mb-4 pb-4 border-b border-gray-800"}>
    {isEnabled ? (
      <p className="text-sm text-red-500">You are browsing in Draft Mode</p>
    ) : (
      <p className="text-sm text-green-500">
        You are browsing only Published content
      </p>
    )}
    </div>
    <Link href={`/`} className="text-blue-500 hover:underline mb-2 inline-block">
      ← Back to home
    </Link>
    <div className={"grid grid-cols-1 gap-4"}>
    { (content.data.map((blogpost) => (
      <Link href={`/blogpost/${blogpost.slug}`} key={blogpost.id}>
        <h1 className="text-2xl font-bold mb-2">{blogpost.title}</h1>
        <div className="flex gap-4 my-2">
          {blogpost.headerImage?.length ? (
            <Image
              alt={blogpost.headerImage[0].alt || ""}
              src={flotiqApiClient.helpers.getMediaUrl(blogpost.headerImage[0])}
              width={100}
              height={100}
            />
          ) : null}
          <p>{blogpost.excerpt}</p>
        </div>
      </Link>
      ))

  )
    }
    </div>
  </div>
}
