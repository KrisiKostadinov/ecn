"use client";

import { Button } from "@/components/ui/button";
import useImageStore from "@/app/dashboard/images/_stores/upload-image";

export default function UploadButton() {
  const { setOpen } = useImageStore();

  const onUpload = () => {
    setOpen();
  }

  return (
    <div className="hidden md:block">
      <Button onClick={onUpload}>Качване</Button>
    </div>
  );
}
