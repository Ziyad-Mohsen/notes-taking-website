import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ImageCrop,
  ImageCropContent,
  ImageCropApply,
  ImageCropReset,
} from "@/components/ui/shadcn-io/image-crop";
import { Crop, RotateCcwIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface ImageCropModalProps {
  selectedFile: File | null;
  isOpen: boolean;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

function ImageCropModal({
  selectedFile,
  isOpen,
  onCrop,
  onCancel,
}: ImageCropModalProps) {
  const t = useTranslations("pages.auth.signup.imageCrop");
  const hasValidFile = selectedFile && selectedFile instanceof File;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {hasValidFile ? (
            <ImageCrop
              aspect={1}
              circularCrop
              file={selectedFile}
              maxImageSize={1024 * 1024} // 1MB
              onCrop={onCrop}
            >
              <div className="w-full flex justify-center bg-muted/50 rounded-lg p-4 border">
                <ImageCropContent className="max-w-full max-h-[400px] w-full" />
              </div>
              <DialogFooter className="flex-row gap-2 sm:gap-2 w-full px-0">
                <ImageCropApply asChild>
                  <Button
                    type="button"
                    className="flex-1 sm:flex-initial"
                    size="default"
                  >
                    <Crop className="size-4 mr-2" />
                    {t("applyCrop")}
                  </Button>
                </ImageCropApply>
                <ImageCropReset asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                    size="default"
                  >
                    <RotateCcwIcon className="size-4 mr-2" />
                    {t("reset")}
                  </Button>
                </ImageCropReset>
                <Button
                  onClick={onCancel}
                  type="button"
                  variant="ghost"
                  className="flex-1 sm:flex-initial"
                  size="default"
                >
                  <XIcon className="size-4 mr-2" />
                  {t("cancel")}
                </Button>
              </DialogFooter>
            </ImageCrop>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">{t("noImageSelected")}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageCropModal;
