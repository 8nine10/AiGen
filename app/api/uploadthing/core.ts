import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server"; 

const f = createUploadthing();

const getUser = async () => await currentUser();

export const ourFileRouter = {
  // Route that accepts any type of file
  media: f({ blob: { maxFileSize: "16MB", maxFileCount: 1 } }) // 👈 changed to `blob`
    .middleware(async ({ req }) => {
      const user = await getUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
