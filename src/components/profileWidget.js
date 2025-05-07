import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pencil from "../assets/editPencil.png";
import Casco from "../assets/cascoPerfil.png";

function ProfileWidget({ show, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editableUser, setEditableUser] = useState({ name: "", country: "" });
  const [editingField, setEditingField] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        console.error("No user ID found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7033/api/UsersApi/${userId}`);
        setUser(response.data);
        setEditableUser({ name: response.data.name, country: response.data.country });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchUserProfile();
    }
  }, [show, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await axios.put(`https://localhost:7033/api/UsersApi/${userId}`, {
        ...user,
        name: editableUser.name,
        country: editableUser.country,
      });
      setUser((prev) => ({ ...prev, ...editableUser }));
      setEditingField(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!show) return null;

  return (
    <div className={`profile-widget ${show ? "show" : ""}`}>
      <div className="profile-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3 className="profile-title">My Profile</h3>

        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <img src={Casco} width="120" height="auto" className="profile-image" alt="Profile Icon" />

            <div className="editable-name">
              {editingField === "name" ? (
                <input
                  type="text"
                  name="name"
                  value={editableUser.name}
                  onChange={handleChange}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="profile-input"
                />
              ) : (
                <span onClick={() => setEditingField("name")} className="name-text">
                  {editableUser.name}
                </span>
              )}
              <img src={Pencil} className="edit-icon" alt="Editar campo" onClick={() => setEditingField("name")} />
            </div>

            <div className="profile-info">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            <div className="profile-info">
              <label>Country</label>
              <div className="editable-field">
                {editingField === "country" ? (
                  <select
                    name="country"
                    value={editableUser.country}
                    onChange={handleChange}
                    onBlur={() => setEditingField(null)}
                    autoFocus
                    className="profile-input"
                  >
                    <option value="">Select...</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Spain">Spain</option>
                    <option value="England">England</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Germany">Germany</option>
                  </select>
                ) : (
                  <span onClick={() => setEditingField("country")}>{editableUser.country}</span>
                )}
                <img src={Pencil} className="edit-icon" alt="Editar campo" onClick={() => setEditingField("country")} />
              </div>
            </div>

            <button className="botonLogin mt-5" onClick={handleSaveChanges} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button className="botonLogout mt-5" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileWidget;
