
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

const handleAuth = async() => {
    const session = getServerSession();
    if (!session) throw new UploadThingError("Unauthorized");
    return { userId: session };
}
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).middleware(() => handleAuth()).onUploadComplete(() => {}),
    videoUploader: f({
       video:{
        maxFileSize: "1GB",
        minFileCount:1
       },
      }).middleware(() => handleAuth()).onUploadComplete(() => {}),
    attachmentUploader: f(["image", "video","audio","text","pdf"]).middleware(() => handleAuth()).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
