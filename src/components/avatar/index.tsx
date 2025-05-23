"use client";

import { UserContext } from "@/providers/user";
import { useContext, useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import user_avatar from "../../assets/user-avatar.png";
import PoppoverHeaderAvatar from "./poppover";
import { toast } from "sonner";

// Definindo o tipo correto para a referência do Cropper
type ReactCropperElement = HTMLImageElement & {
  cropper: Cropper;
};

interface Props {
  inProfile?: boolean;
  header?: boolean;
}

export default function AvatarLayout({
  inProfile = false,
  header = false,
}: Props) {
  const { UploadAvatar, UserLogged, user, value } = useContext(UserContext);
  const cropperRef = useRef<ReactCropperElement>(null);

  const [imgCrop, setImgCrop] = useState(false);
  const [pview, setPView] = useState<string>("");
  const [src, setSrc] = useState<string | undefined>("");
  const [error, setError] = useState(false);
  const [onPopper, setOnPopper] = useState(false);

  useEffect(() => {
    UserLogged();
  }, [value]);

  if (!header) {
  }
  const openDialog = () => {
    if (!header) {
      setImgCrop(true);
    } else {
      setOnPopper((prev) => !prev);
    }
  };

  const closeDialog = () => {
    setImgCrop(false);
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedImage = cropper?.getCroppedCanvas().toDataURL();
    setPView(croppedImage || "");
  };

  const saveCropImage = async () => {
    const blob = await fetch(pview).then((res) => res.blob());

    if (blob.type.split("/")[0] !== "image") {
      setError(true);
    } else {
      await UploadAvatar(blob, user?.id ?? "").finally(() => {
        toast.success("Imagem atualizada com sucesso!", {
          position: "top-right",
        });
      });
      setImgCrop(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer hover:opacity-70 shadow-sm rounded-full"
        onClick={openDialog}
      >
        {user?.avatar?.urlImg ? (
          <img
            src={user?.avatar.urlImg ? user?.avatar.urlImg : user_avatar.src}
            className={`${inProfile ? "w-20 h-20" : "w-8 h-8"}  rounded-full`}
          />
        ) : (
          <div className="grid items-center gap-2 grid-cols-profileSideBar animate-pulse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300">
              <svg
                className="w-max h-5 text-zinc-200 dark:text-zinc-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>

            {/* < className="h-7 w-7 bg-gray-300 rounded-md"/> */}
          </div>
        )}
      </div>

      {onPopper && (
        <PoppoverHeaderAvatar setOnPopper={openDialog} onPopper={onPopper} />
      )}

      {imgCrop && (
        <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50">
          <div className="flex flex-col bg-white p-4 rounded-lg">
            <span className="mb-6 font-semibold text-xl">
              Alterar Foto de Perfil
            </span>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {src && (
              <Cropper
                src={src}
                style={{ height: 400, width: "100%" }}
                aspectRatio={1}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
              />
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeDialog}
                className="border border-red-300 hover:bg-red-700 hover:text-white text-red-700 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={saveCropImage}
                className="bg-green-700 hover:bg-opacity-70 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
            {error && <span className="text-red-300">Cadastre uma imagem</span>}
          </div>
        </div>
      )}
    </div>
  );
}
