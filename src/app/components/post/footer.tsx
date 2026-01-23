"use client";
import { config } from "@/config";
import { GithubLogo, TwitterLogo } from "@phosphor-icons/react";
// Giscus removed
import { Post } from "contentlayer/generated";

interface PostFooterProps {
  post: Post;
}

export const PostFooter = ({ post }: PostFooterProps) => {
  return (
    <>
      <div className="flex justify-center gap-3 my-6">
        <button
          key="twitter-share-button"
          className="btn btn-primary btn-md bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?text=${post.title}&url=${config.baseUrl}${post.slug}`,
              "_blank"
            );
          }}
        >
          <TwitterLogo />
          Tweet
        </button>

        <div>
          <button
            key="github-edit-button"
            className="btn btn-primary btn-md bg-black"
            onClick={() => {
              window.open(
                `${config.githubRepo}/blob/main/content/${post.slug}.mdx`,
                "_blank"
              );
            }}
          >
            <GithubLogo />
            Edit on GitHub
          </button>
        </div>
      </div>

      {/* Giscus comments removed */}
    </>
  );
};
