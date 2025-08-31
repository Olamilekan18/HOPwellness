import { useEffect, useState } from "react";
import DashboardLayout from "../../componet/dashboard/dashboardLayout";
import { toast } from "react-toastify";

export default function DashboardSettings() {
  const [profilePicture, setProfilePicture] = useState("");

  function updateProfilePicture(e) {
    if (e[0] && e) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(e[0]);
    }
  }

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    } else {
      const defaultImage =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      localStorage.setItem("profilePicture", defaultImage);
      setProfilePicture(defaultImage);
       window.location.reload();
    toast.success("Profile picture updated!");
    }
  }, []);

  useEffect(() => {
    if (profilePicture) {
      localStorage.setItem("profilePicture", profilePicture);
    }
  }, [profilePicture]);

  function handleSaveChanges() {
    window.location.reload();
    toast.success("Settings saved!");
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          ⚙️ Settings
        </h1>

        {/* Profile Picture Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Profile Picture
          </h2>
          <div className="flex flex-col sm:flex-row sm:space-x-6 items-center">
            <div className="w-32 h-32 border-2 border-green-400 dark:border-white bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4 sm:mb-0">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full  object-cover"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-2">
                Upload Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-100"
                onChange={(e) => {
                  updateProfilePicture(e.target.files);
                }}
              />
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Profile Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-100"
                defaultValue=""
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-100"
                defaultValue=""
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-100"
                defaultValue=""
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Receive Notifications
              </span>
              <input
                type="checkbox"
                className="toggle toggle-indigo"
                defaultChecked
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button onClick={handleSaveChanges}
           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
