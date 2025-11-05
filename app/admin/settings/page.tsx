"use client";

import React, { useEffect, useState } from "react";
import {
  MdOutlineLocalPostOffice,
  MdOutlinePhone,
  MdShortText,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoLogoFacebook } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { RiInstagramFill, RiLinkedinFill } from "react-icons/ri";
import { TbFavicon } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";
import { FaTwitter, FaYoutube, FaTiktok, FaGithub, FaGlobe } from "react-icons/fa";
import { useUpdate } from "@/services/useUpdate";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  // Company info
  const [companyName, setCompanyName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [aboutShort, setAboutShort] = useState("");
  const [about, setAbout] = useState("");

  // Contact info
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Social
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  const { updateData, loading: updating, error: updateError } = useUpdate<any>();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setSettings(data);

        // Populate fields
        setCompanyName(data.companyName || "");
        setSlogan(data.slogan || "");
        setAboutShort(data.aboutShort || "");
        setAbout(data.about || "");
        setPhone1(data.phone1 || "");
        setPhone2(data.phone2 || "");
        setEmail1(data.email1 || "");
        setEmail2(data.email2 || "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setPostalCode(data.postalCode || "");
        setFacebook(data.facebook || "");
        setTwitter(data.twitter || "");
        setInstagram(data.instagram || "");
        setLinkedin(data.linkedin || "");
        setYoutube(data.youtube || "");
        setTiktok(data.tiktok || "");
        setGithub(data.github || "");
        setWebsite(data.website || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    const updatedSettings = {
      companyName,
      slogan,
      aboutShort,
      about,
      phone1,
      phone2,
      email1,
      email2,
      address,
      city,
      postalCode,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      tiktok,
      github,
      website,
    };

    const result = await updateData("settings", updatedSettings, "PUT");

    if (result) {
      alert("Settings updated successfully!");
    }
  };

  if (!settings) return <div className="p-6 text-black">Loading settings...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center p-4">
      <main className="flex-1 max-w-6xl">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          {/* Company Info */}
          <h2 className="text-lg font-semibold text-gray-700 underline mb-4">
            Company Information
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <InputField
              label="Company Name"
              icon={<HiOutlineOfficeBuilding className="text-white text-lg" />}
              placeholder="Enter company name"
              value={companyName}
              onChange={setCompanyName}
            />

            <InputField
              label="Slogan"
              icon={<MdShortText className="text-white text-lg" />}
              placeholder="Enter company slogan"
              value={slogan}
              onChange={setSlogan}
            />

            <TextareaField
              label="About Short"
              icon={<FcAbout className="text-white text-lg" />}
              placeholder="Short description..."
              value={aboutShort}
              onChange={setAboutShort}
            />

            <TextareaField
              label="About"
              icon={<FcAbout className="text-white text-lg" />}
              placeholder="Full company description..."
              value={about}
              onChange={setAbout}
            />

            {/* Contact Info */}
            <InputField
              label="Phone 1"
              icon={<MdOutlinePhone className="text-white text-lg" />}
              placeholder="Primary phone"
              value={phone1}
              onChange={setPhone1}
            />
            <InputField
              label="Phone 2"
              icon={<MdOutlinePhone className="text-white text-lg" />}
              placeholder="Secondary phone"
              value={phone2}
              onChange={setPhone2}
            />
            <InputField
              label="Email 1"
              type="email"
              icon={<MdOutlineLocalPostOffice className="text-white text-lg" />}
              placeholder="Primary email"
              value={email1}
              onChange={setEmail1}
            />
            <InputField
              label="Email 2"
              type="email"
              icon={<MdOutlineLocalPostOffice className="text-white text-lg" />}
              placeholder="Secondary email"
              value={email2}
              onChange={setEmail2}
            />
            <InputField
              label="Address"
              icon={<IoLocation className="text-white text-lg" />}
              placeholder="Company address"
              value={address}
              onChange={setAddress}
            />
            <InputField
              label="City"
              icon={<IoLocation className="text-white text-lg" />}
              placeholder="City"
              value={city}
              onChange={setCity}
            />
            <InputField
              label="Postal Code"
              icon={<IoLocation className="text-white text-lg" />}
              placeholder="Postal code"
              value={postalCode}
              onChange={setPostalCode}
            />

            {/* Social Media */}
            <h2 className="text-lg font-semibold text-gray-700 underline mb-6 md:col-span-2 mt-6">
              Social Media Links
            </h2>

            <InputField
              label="Facebook"
              icon={<IoLogoFacebook className="text-white text-lg" />}
              placeholder="Facebook URL"
              value={facebook}
              onChange={setFacebook}
            />
            <InputField
              label="Twitter"
              icon={<FaTwitter className="text-white text-lg" />}
              placeholder="Twitter URL"
              value={twitter}
              onChange={setTwitter}
            />
            <InputField
              label="Instagram"
              icon={<RiInstagramFill className="text-white text-lg" />}
              placeholder="Instagram URL"
              value={instagram}
              onChange={setInstagram}
            />
            <InputField
              label="LinkedIn"
              icon={<RiLinkedinFill className="text-white text-lg" />}
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={setLinkedin}
            />
            <InputField
              label="YouTube"
              icon={<FaYoutube className="text-white text-lg" />}
              placeholder="YouTube URL"
              value={youtube}
              onChange={setYoutube}
            />
            <InputField
              label="TikTok"
              icon={<FaTiktok className="text-white text-lg" />}
              placeholder="TikTok URL"
              value={tiktok}
              onChange={setTiktok}
            />
            <InputField
              label="GitHub"
              icon={<FaGithub className="text-white text-lg" />}
              placeholder="GitHub URL"
              value={github}
              onChange={setGithub}
            />
            <InputField
              label="Website"
              icon={<FaGlobe className="text-white text-lg" />}
              placeholder="Website URL"
              value={website}
              onChange={setWebsite}
            />

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center mt-8">
              <button
                type="submit"
                disabled={updating}
                className="bg-[#aec958] hover:bg-[#9bb648] text-white px-6 py-2.5 rounded-md font-medium text-sm transition"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>

            {updateError && <div className="text-red-500 mt-2 md:col-span-2">{updateError}</div>}
          </form>
        </div>
      </main>
    </div>
  );
}

// Reusable input with icon
const InputField = ({ label, type = "text", icon, placeholder, value, onChange }: any) => (
  <div className="flex flex-col gap-1.5">
    <Label label={label} icon={icon} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
    />
  </div>
);

// Reusable textarea with icon
const TextareaField = ({ label, icon, placeholder, value, onChange }: any) => (
  <div className="flex flex-col gap-1.5 md:col-span-1">
    <Label label={label} icon={icon} />
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition resize-y h-20"
    />
  </div>
);

const Label = ({ label, icon }: any) => (
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
