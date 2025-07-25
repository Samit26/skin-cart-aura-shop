import { useState, useEffect } from "react";

interface UserProfile {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      orderUpdates: boolean;
      promotions: boolean;
    };
    language: string;
    currency: string;
  };
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar: {
    url?: string;
    public_id?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  addressType: "home" | "office" | "other";
}

// Simple local user state (replace with real backend integration as needed)
const [profile, setProfile] = useState<UserProfile | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Simulate fetching user profile from backend/localStorage
useEffect(() => {
  setLoading(true);
  // Replace with real API call
  const stored = localStorage.getItem("userProfile");
  if (stored) {
    setProfile(JSON.parse(stored));
  }
  setLoading(false);
}, []);

const updateProfile = async (updateData: Partial<UserProfile>) => {
  if (!profile) return;
  const updated = { ...profile, ...updateData };
  setProfile(updated);
  localStorage.setItem("userProfile", JSON.stringify(updated));
  return updated;
};

const addAddress = async (addressData: Omit<Address, "_id">) => {
  if (!profile) return;
  const newAddress: Address = { ...addressData, _id: Date.now().toString() };
  const updated = { ...profile, addresses: [...profile.addresses, newAddress] };
  setProfile(updated);
  localStorage.setItem("userProfile", JSON.stringify(updated));
  return newAddress;
};

const updateAddress = async (
  addressId: string,
  updateData: Partial<Address>
) => {
  if (!profile) return;
  const updatedAddresses = profile.addresses.map((addr) =>
    addr._id === addressId ? { ...addr, ...updateData } : addr
  );
  const updated = { ...profile, addresses: updatedAddresses };
  setProfile(updated);
  localStorage.setItem("userProfile", JSON.stringify(updated));
  return updatedAddresses.find((addr) => addr._id === addressId);
};

const deleteAddress = async (addressId: string) => {
  if (!profile) return;
  const updatedAddresses = profile.addresses.filter(
    (addr) => addr._id !== addressId
  );
  const updated = { ...profile, addresses: updatedAddresses };
  setProfile(updated);
  localStorage.setItem("userProfile", JSON.stringify(updated));
};

return {
  profile,
  loading,
  error,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  refetch: () => {},
};
