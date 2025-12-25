import { useState, useEffect, useRef } from "react";
import "./App.css";
import Navebar from "./Components/Navebar";
import Footer from "./Components/Footer";

const API_URL = "http://localhost:3000/passwords";

function App() {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwords, setPasswords] = useState([]);
  const [editUUID, setEditUUID] = useState(null);
  const [showPass, setShowPass] = useState(false);

  // 🔹 smart footer state
  const [footerFixed, setFooterFixed] = useState(true);

  // 🔹 refs for Enter-key navigation
  const siteRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // 🔹 fetch passwords
  const getPasswords = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPasswords(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // 🔹 check page height to toggle footer
  const checkFooterPosition = () => {
    const pageHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    setFooterFixed(pageHeight <= viewportHeight);
  };

  // 🔹 re-check when content changes or window resizes
  useEffect(() => {
    checkFooterPosition();
    window.addEventListener("resize", checkFooterPosition);
    return () => window.removeEventListener("resize", checkFooterPosition);
  }, [passwords]);

  // 🔹 form handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 Enter-key flow
  const handleKeyDown = (e, field) => {
    if (e.key !== "Enter") return;

    if (field === "site") usernameRef.current.focus();
    else if (field === "username") passwordRef.current.focus();
    else if (field === "password") savePassword();
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) return;

    try {
      if (editUUID) {
        await fetch(`${API_URL}/${editUUID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setEditUUID(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      setForm({ site: "", username: "", password: "" });
      siteRef.current.focus();
      getPasswords();
    } catch (err) {
      console.error(err);
    }
  };

  const editBtn = (item) => {
    setForm({
      site: item.site,
      username: item.username,
      password: item.password,
    });
    setEditUUID(item.uuid);
    siteRef.current.focus();
  };

  const deleteBtn = async (uuid) => {
    try {
      await fetch(`${API_URL}/${uuid}`, { method: "DELETE" });
      getPasswords();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navebar />
      <div className="bgcolor"></div>

      {/* 🔹 MAIN CONTENT */}
      <div className="main-content">
        <div className="bglogo">🛡️ Password</div>

        <input
          ref={siteRef}
          value={form.site}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "site")}
          className="webs"
          placeholder="Enter website URL"
          name="site"
        />

        <div className="hero">
          <input
            ref={usernameRef}
            value={form.username}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "username")}
            placeholder="Enter Username"
            name="username"
          />

          <div className="input-wrapper">
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "password")}
              type={showPass ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
            />
            <span className="eye" onClick={() => setShowPass(!showPass)}>
              <img className="eyeimg" src="/pngwing.com (16).png" alt="eye" />
            </span>
          </div>
        </div>

        <div className="sub-btn">
          <button onClick={savePassword}>
            {editUUID ? "✏️ Update" : "✅ Submit"}
          </button>
        </div>

        <hr />
        <h2>Your Passwords</h2>

        <div className="showpassword">
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {passwords.length === 0 ? (
                <tr>
                  <td colSpan="4">No passwords saved</td>
                </tr>
              ) : (
                passwords.map((item) => (
                  <tr key={item.uuid}>
                    <td>{item.site}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>
                      <button onClick={() => editBtn(item)}>Edit ✏️</button>{" "}
                      <button onClick={() => deleteBtn(item.uuid)}>Delete 🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 SMART FOOTER */}
      <Footer isFixed={footerFixed} />
    </>
  );
}

export default App;
