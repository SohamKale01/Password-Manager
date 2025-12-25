🛡️ Password Manager

A simple and secure Password Manager built using React for the frontend and Node.js + Express + MongoDB for the backend.
This application allows users to store, view, edit, delete, and copy passwords easily.

🚀 Features

Add website credentials (URL, username, password)

Edit existing passwords

Delete saved passwords

Show / hide password visibility

Copy username or password to clipboard

Navigate between inputs using the Enter key

Auto-submit when pressing Enter after entering the password

Responsive and clean UI

Smart footer behavior (fixed when content is short, relative when content exceeds page height)

🛠️ Tech Stack

Frontend: React, HTML5, CSS3, JavaScript
Backend: Node.js, Express.js, MongoDB, REST API

⚙️ How It Works

User enters Website URL

Press Enter → Focus moves to Username

Press Enter → Focus moves to Password

Press Enter → Password gets saved

Saved passwords appear in the table below

Footer stays fixed until content exceeds screen height

🌐 API Endpoints
Method	Endpoint	Description
GET	/passwords	Fetch all passwords
POST	/passwords	Add new password
PUT	/passwords/:id	Update password
DELETE	/passwords/:id	Delete password
🔐 Security Note

This project is for learning purposes only.
Do not store real or sensitive passwords without encryption in production.
