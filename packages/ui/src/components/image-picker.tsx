import { UploadIcon } from "lucide-react";
import type { DropzoneInputProps } from "react-dropzone";
import { useDropzone } from "react-dropzone";

import { type InputProps } from "@ui/components/input";
import { cn } from "@ui/lib/utils";

interface ImagePickerProps
  extends Omit<DropzoneInputProps, "value" | "onChange" | "type">,
    Pick<InputProps, "ref"> {
  value?: File;
  onChange?: (file: File) => void;
}

const ImagePreview = ({ file }: { file: File }) => (
  <div>
    <img
      src={URL.createObjectURL(file)}
      alt="Preview"
      className="aspect-square size-full rounded-full object-cover"
    />
    <div className="absolute bottom-0 flex h-1/5 w-full justify-center bg-primary/60 p-4 opacity-0 duration-200 group-hover:opacity-100">
      <UploadIcon className="text-primary-foreground" aria-hidden="true" />
    </div>
  </div>
);

const Placeholder = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="rounded-full border border-dashed p-3 text-center">
      <UploadIcon className="size-7 text-muted-foreground" aria-hidden="true" />
    </div>
    <p className="font-medium text-muted-foreground">Upload a new picture</p>
  </div>
);

const ImagePicker = ({
  className,
  onChange,
  value,
  disabled,
  ref,
  ...props
}: ImagePickerProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => onChange?.(acceptedFiles[0]),
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative grid w-full max-w-xs aspect-square rounded-full cursor-pointer border border-muted/20 bg-muted/20 place-items-center text-center transition hover:bg-input/20 overflow-hidden ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed hover:bg-input/30",
        className
      )}
    >
      <input ref={ref} {...getInputProps(props)} />
      {value ? <ImagePreview file={value} /> : <Placeholder />}
    </div>
  );
};
ImagePicker.displayName = "ImagePicker";

export { ImagePicker, type ImagePickerProps };
