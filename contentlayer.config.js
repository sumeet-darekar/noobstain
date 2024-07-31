import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    header: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
    lang: {
      type: "string",
      default: "en",
    },
    comments: {
      type: "boolean",
      default: true,
    },
    author: {
      type: "string",
      default: "sumeet  ",
    },
    layout: {
      type: "string",
      default: "post",
    },
    isThread: {
      type: "boolean",
      default: false,
    },
    isDraft: {
      type: "boolean",
      default: false,
    },
    threadUrl: {
      type: "string",
      default: "",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
});
