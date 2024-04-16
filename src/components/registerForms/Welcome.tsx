import { useUploadeImageMutation } from "@/app/api/userApi";
import usePersist from "@/hooks/usePersist";
import { useRef, useState } from "react";
import { IoMdImages } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserType } from "./CreateUser";
import Loader from "../Loader";

type Props = {
  userField: UserType;
};
export default function Welcome({ userField }: Props) {
  const [persist, setPersist] = usePersist();
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const [uploadeImage,{isLoading}] = useUploadeImageMutation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const { email } = userField;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  const onUploadeImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      if (image) {
        formData.append("image", image);
      }
      await uploadeImage(formData).unwrap();

      toast.success("Welcome budy, Your profile successfully created.");
      navigate("/");
    } catch (error: any) {
      if (!error.status) {
        toast.error("No Server Response");
      } else {
        toast.error(error.data?.message);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-xl px-10 sm:mx-16">
      <h1 className="text-xl font-black mx-auto">Customize your experience</h1>
      <div className=" relative gap-1 mr-5 mt-2 flex justify-center items-center flex-col">
        <img
          className="w-20 h-20 object-center col-span-1 rounded-full   bg-slate-400"
          src="/user.png"
          alt="🖼️"
        />

        <button
          className=" p-1 hover:bg-sky-950 rounded-full text-xl"
          onClick={handleClick}
        >
          <IoMdImages />
        </button>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          ref={hiddenFileInput}
          style={{ display: "none", height: 1 }}
        />
        {image && <span className=" text-sm">{image.name}</span>}
      </div>
      <div className=" mt-1 text-slate-500 text-[13px]">
        <p>
          By signing up, you agree to our Terms,{" "}
          <Link to="#" className="text-sky-600 hover:underline">
            Privacy Policy
          </Link>
          , and{" "}
          <Link to="#" className="text-sky-600 hover:underline">
            Cookie Use
          </Link>
          . X may use your contact information, including your email address and
          phone number for purposes outlined in our Privacy Policy.{" "}
          <Link to="#" className="text-sky-600 hover:underline">
            Learn more
          </Link>
        </p>
      </div>
      <label htmlFor="persist" className="flex gap-1  py-5">
        <input
          type="checkbox"
          id="persist"
          onChange={() => setPersist(!persist)}
          checked={persist}
        />
        Trust This Device
      </label>
      <div className="relative  mt-16 ">
        <button
          className=" text-black w-full text-lg bg-slate-200 border border-slate-600 py-2 pl-5 rounded-full hover:bg-slate-50"
          onClick={onUploadeImage}
        >
                  {isLoading ? (
              <Loader
                color="#059af7"
                loading={true}
                circleSize={3}
                isFull={false}
                className="justify-center gap-5 py-2 "
              />
            ) : (
              <span>Welcome</span>
            )}
        </button>
      </div>
    </div>
  );
}
