import { base64ToArrayBuffer, cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { defaultAvatarsPaths, primaryDefaultAvatar } from "@/constants";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AvatarSchemaType, SignupFormSchema } from "@/validation/auth/schema";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import ImageCropModal from "./ImageCropModal";
import { useTranslations } from "next-intl";

function AvatarSelector() {
  const t = useTranslations("pages.auth.signup.avatar");
  const [selectedAvatar, setSelectedAvatar] =
    useState<AvatarSchemaType>(primaryDefaultAvatar);
  const [croppedImage, setCroppedImage] = useState<Base64URLString | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext<SignupFormSchema>();

  useEffect(() => {
    form.setValue("avatar", selectedAvatar);
    console.log(form.getValues());
  }, [selectedAvatar]);

  async function handleImageCrop(base64String: string) {
    const base64 = base64String.split("base64,")[1];
    const arrayBuffer = base64ToArrayBuffer(base64);
    setCroppedImage(base64String);
    setSelectedAvatar(arrayBuffer);
  }

  function handleReset() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFile(null);
    setCroppedImage(null);
    setSelectedAvatar(primaryDefaultAvatar);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  }

  function selectDefaultAvatar(avatarPath: string) {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedAvatar(avatarPath);
    setSelectedFile(null);
    setCroppedImage(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex max-md:flex-col items-center gap-10">
        <div className="relative">
          <div className="border bg-muted w-fit overflow-hidden rounded-full object-center object-cover">
            <Image
              alt="Cropped"
              height={100}
              src={
                (typeof selectedAvatar === "string" && selectedAvatar) ||
                croppedImage ||
                primaryDefaultAvatar
              }
              unoptimized
              width={100}
            />
          </div>
          {croppedImage && (
            <Button
              className="absolute bottom-0 end-0 rounded-full"
              onClick={handleReset}
              size="sm"
              type="button"
              variant="destructive"
            >
              <XIcon />
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <Input
            ref={fileInputRef}
            accept="image/*"
            className="max-w-full"
            onChange={handleFileChange}
            type="file"
          />
          <p>{t("fileTypes")}</p>
        </div>
      </div>

      <ImageCropModal
        isOpen={!croppedImage && selectedFile !== null}
        selectedFile={selectedFile}
        onCrop={handleImageCrop}
        onCancel={handleReset}
      />

      <div className="relative w-full h-5">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2/7 h-0.5 bg-border" />
        <span className="absolute top-2/4 left-1/2 -translate-x-1/2 w-3/7 -translate-y-1/2 text-center text-muted-foreground">
          {t("orChooseDefault")}
        </span>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2/7 h-0.5 bg-border" />
      </div>

      <div className="space-y-4">
        <p className="text-lg">{t("defaultAvatars")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5">
          {defaultAvatarsPaths.map((path, i) => {
            return (
              <div className="flex items-center justify-center h-20" key={path}>
                <Avatar
                  className={cn(
                    "w-18 h-18 cursor-pointer box-content",
                    path === selectedAvatar &&
                      "border-4 border-primary shadow-primary"
                  )}
                  onClick={() => selectDefaultAvatar(path)}
                >
                  <AvatarImage src={path} />
                </Avatar>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AvatarSelector;
