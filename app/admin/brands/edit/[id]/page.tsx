"use client";

import { useEffect, useState } from "react";
import { useUpdate } from "@/services/useUpdate";

export default function EditSettingsPage() {
  const settingsId = 1; // hardcoded ID

  const [settings, setSettings] = useState<any>(null);

  const [companyName, setCompanyName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [aboutShort, setAboutShort] = useState("");
  const [about, setAbout] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
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
        const res = await fetch(`/api/settings/${settingsId}`);
        const data = await res.json();
        setSettings(data);

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

    const updatedSettings: any = {
      ...settings,
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

    const result = await updateData(`settings/${settingsId}`, updatedSettings, "PATCH");

    if (result) {
      alert("Settings updated successfully!");
    }
  };

  if (!settings) return <div className="p-6 text-black">Loading settings...</div>;

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 w-full max-w-6xl rounded p-5 shadow-xl border-2 border-[#aec958]">
        <h1 className="text-2xl text-black font-bold text-center mb-2 pt-4">Update Settings</h1>
        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input id="companyName" label="Company Name" value={companyName} onChange={setCompanyName} />
          <Input id="slogan" label="Slogan" value={slogan} onChange={setSlogan} />
          <Textarea id="aboutShort" label="About Short" value={aboutShort} onChange={setAboutShort} />
          <Textarea id="about" label="About" value={about} onChange={setAbout} />

          <Input id="phone1" label="Phone 1" value={phone1} onChange={setPhone1} />
          <Input id="phone2" label="Phone 2" value={phone2} onChange={setPhone2} />
          <Input id="email1" label="Email 1" value={email1} onChange={setEmail1} type="email" />
          <Input id="email2" label="Email 2" value={email2} onChange={setEmail2} type="email" />

          <Input id="address" label="Address" value={address} onChange={setAddress} />
          <Input id="city" label="City" value={city} onChange={setCity} />
          <Input id="postalCode" label="Postal Code" value={postalCode} onChange={setPostalCode} />
          <Input id="facebook" label="Facebook" value={facebook} onChange={setFacebook} />
          <Input id="twitter" label="Twitter" value={twitter} onChange={setTwitter} />
          <Input id="instagram" label="Instagram" value={instagram} onChange={setInstagram} />
          <Input id="linkedin" label="LinkedIn" value={linkedin} onChange={setLinkedin} />
          <Input id="youtube" label="YouTube" value={youtube} onChange={setYoutube} />
          <Input id="tiktok" label="TikTok" value={tiktok} onChange={setTiktok} />
          <Input id="github" label="GitHub" value={github} onChange={setGithub} />
          <Input id="website" label="Website" value={website} onChange={setWebsite} />

          <div className="flex justify-center md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={updating}
              className="bg-[#4998d1] hover:bg-[#3b7aa8] text-white cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full shadow-md"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>

          {updateError && <div className="text-red-500 mt-2 md:col-span-2">{updateError}</div>}
        </form>
      </div>
    </div>
  );
}

// Simple reusable input
function Input({ id, label, value, onChange, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-gray-700 text-sm font-medium">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-lime-500 outline-none"
      />
    </div>
  );
}

// Simple reusable textarea
function Textarea({ id, label, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-gray-700 text-sm font-medium">{label}</label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-lime-500 outline-none resize-y h-20"
      />
    </div>
  );
}
