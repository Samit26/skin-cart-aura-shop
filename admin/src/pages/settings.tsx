import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import {
  Settings,
  Save,
  Upload,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
} from "lucide-react";

interface AdminSettings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  emailNotifications: boolean;
  orderNotifications: boolean;
  maintenanceMode: boolean;
  allowRegistration: boolean;
}

const SettingsPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<AdminSettings>({
    siteName: "SkinCart",
    siteDescription: "Premium Mobile Skins & Accessories",
    siteLogo: "",
    contactEmail: "contact@skincart.com",
    contactPhone: "+91 9876543210",
    address: "123 Tech Street, Mumbai, Maharashtra 400001",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
    emailNotifications: true,
    orderNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchSettings();
    }
  }, [isAuthenticated]);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/admin/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setSettings({ ...settings, ...result.data });
        }
      } else {
        console.error("Failed to fetch settings:", response.status);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/admin/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings.");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:5000/api/admin/change-password",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const result = await response.json();
        alert(result.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password.");
    }
  };

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "contact", name: "Contact", icon: Mail },
    { id: "social", name: "Social Media", icon: Globe },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "system", name: "System", icon: Database },
  ];

  if (authLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Settings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your application settings and preferences
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
            <button
              onClick={saveSettings}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Save className="-ml-1 mr-2 h-5 w-5" />
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        siteDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Site Logo URL
                  </label>
                  <input
                    type="url"
                    value={settings.siteLogo}
                    onChange={(e) =>
                      setSettings({ ...settings, siteLogo: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, contactEmail: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, contactPhone: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Business Address
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.facebook}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialMedia: {
                          ...settings.socialMedia,
                          facebook: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.instagram}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialMedia: {
                          ...settings.socialMedia,
                          instagram: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.twitter}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialMedia: {
                          ...settings.socialMedia,
                          twitter: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.youtube}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialMedia: {
                          ...settings.socialMedia,
                          youtube: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive email notifications for important events
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      settings.emailNotifications
                        ? "bg-indigo-600"
                        : "bg-gray-200"
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    role="switch"
                    aria-checked={settings.emailNotifications}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        emailNotifications: !settings.emailNotifications,
                      })
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.emailNotifications
                          ? "translate-x-5"
                          : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order Notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      Get notified when new orders are placed
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      settings.orderNotifications
                        ? "bg-indigo-600"
                        : "bg-gray-200"
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    role="switch"
                    aria-checked={settings.orderNotifications}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        orderNotifications: !settings.orderNotifications,
                      })
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.orderNotifications
                          ? "translate-x-5"
                          : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={changePassword}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-gray-500">
                      Put the site in maintenance mode for updates
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      settings.maintenanceMode ? "bg-red-600" : "bg-gray-200"
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                    role="switch"
                    aria-checked={settings.maintenanceMode}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        maintenanceMode: !settings.maintenanceMode,
                      })
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.maintenanceMode
                          ? "translate-x-5"
                          : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Allow User Registration
                    </h3>
                    <p className="text-sm text-gray-500">
                      Allow new users to register on the site
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      settings.allowRegistration
                        ? "bg-indigo-600"
                        : "bg-gray-200"
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    role="switch"
                    aria-checked={settings.allowRegistration}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        allowRegistration: !settings.allowRegistration,
                      })
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        settings.allowRegistration
                          ? "translate-x-5"
                          : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
