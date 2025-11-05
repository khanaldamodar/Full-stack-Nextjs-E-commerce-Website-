"use client";

import React, { useState, ChangeEvent } from "react";
import { MdTitle, MdOutlineDescription, MdAdd } from "react-icons/md";
import { TbPhotoPlus } from "react-icons/tb";

// ===================== GALLERY PAGE =====================
const GalleryPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);

  // ✅ Handle multiple image uploads safely
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-700 underline mb-4">
            Gallery Information
          </h2>

          <form className="flex flex-col gap-6">
            {/* ================= Title + Upload Images ================= */}
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

            {/* ================= Image Previews ================= */}
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

            {/* ================= Description ================= */}
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
          </form>

          {/* ================= SAVE BUTTON ================= */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#aec958] hover:bg-[#9bb648] text-white px-6 py-2.5 rounded-md font-medium text-sm transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// ===================== INPUT FIELD =====================
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

// ===================== LABEL =====================
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

export default GalleryPage;
