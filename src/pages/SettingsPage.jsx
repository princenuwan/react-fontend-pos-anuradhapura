import { useState } from "react";

export default function SettingsPage() {
  const [username, setUsername] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert(`Settings Saved:\nUsername: ${username}\nEmail: ${email}\nNotifications: ${notifications}`);
    setPassword(""); // clear password after save
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* User Info */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Profile</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Notifications */}
      <div className="mb-6 flex items-center gap-4">
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          className="w-5 h-5 accent-blue-500"
        />
        <label>Enable notifications</label>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
