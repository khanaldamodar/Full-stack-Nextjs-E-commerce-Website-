"use client";

import React, { useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePost } from "@/services/usePost";

import { MdTitle, MdOutlineDescription, MdAdd } from "react-icons/md";
import { TbPhotoPlus } from "react-icons/tb";

const AddGalleryPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);

  const { postData, loading, error } = usePost<FormData>("/api/gallery");

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;

    const selectedFiles = Array.from(files);
    const newPreviews = selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      images.forEach((img) => formData.append("images", img));

      await postData(formData, token, true); // pass true if your hook supports FormData
      alert("Gallery added successfully!");
      router.push("/admin/gallery"); // redirect to gallery list
    } catch (err) {
      console.error(err);
      alert(error?.message || "Failed to add gallery.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-700 underline mb-4">
            Gallery Information
          </h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <InputField
                label="Title"
                icon={<MdTitle className="text-white text-lg" />}
                placeholder="Enter gallery title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />

              {/* Upload Images */}
              <div className="flex flex-col gap-1.5">
                <Label
                  label="Upload Images"
                  icon={<TbPhotoPlus className="text-white text-lg" />}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e.target.files)}
                  className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                />
              </div>
            </div>

            {previews.length > 0 && (
              <div className="flex flex-wrap gap-4 items-center">
                {previews.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.name}
                    className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                  />
                ))}

                {/* Add more images button */}
                <label className="flex items-center justify-center w-10 h-10 rounded-full bg-[#aec958] hover:bg-[#9bb648] text-white cursor-pointer transition">
                  <MdAdd className="text-lg" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label
                label="Description"
                icon={<MdOutlineDescription className="text-white text-lg" />}
              />
              <textarea
                placeholder="Write a short description for this gallery..."
                className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition resize-y h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#aec958] hover:bg-[#9bb648] text-white px-6 py-2.5 rounded-md font-medium text-sm transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type?: string;
  icon: React.ReactNode;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1.5">
    <Label label={label} icon={icon} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
    />
  </div>
);

interface LabelProps {
  label: string;
  icon: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ label, icon }) => (
  <label className="text-gray-700 text-sm font-medium flex items-center gap-2.5">
    <span
      className="w-8 h-8 flex items-center justify-center rounded-full"
      style={{ backgroundColor: "#aec958" }}
    >
      {icon}
    </span>
    {label}
  </label>
);

export default AddGalleryPage;
