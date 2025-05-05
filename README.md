# SweatCrew 🏋️‍♂️🔥

**SweatCrew** is a community-powered fitness platform where users can log workouts, join challenges, and stay accountable with friends. Inspired by the Fitr model, SweatCrew fosters consistency through fun competition and community engagement.

## 🚀 Tech Stack

- React.js + Vite
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- Chart.js / Recharts

## 📦 Features

- 🔐 Secure login with Google or Email
- 📅 Daily workout logging
- 💪 Create and join workout challenges
- 🏆 Leaderboards for motivation
- 📈 Visual progress tracking
- 🧑‍🤝‍🧑 Social feed & friend system

### ✅ **Project Plan**

#### Core Features:

1. **Authentication** – Firebase Auth (Google & Email/password)
2. **Workout Logging** – Users log daily workouts (type, duration, notes)
3. **Challenge System** – Users create/join challenges
4. **Leaderboards** – Rank users based on challenge progress
5. **Community** – Follow friends, view feeds
6. **Progress Dashboard** – Personal progress stats & charts

#### Tech Stack:

* **Frontend:** React.js with Vite
* **Backend:** Firebase (Auth, Firestore, Cloud Storage)
* **Styling:** Tailwind CSS
* **Charts:** Chart.js or Recharts
* **Icons:** React Icons or HeroIcons

---

### 📁 **Folder Structure**

```
sweatcrew/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── assets/              # Images, logos, illustrations
│   ├── components/          # Reusable UI components
│   ├── features/            # Features like auth, workouts, challenges
│   │   ├── auth/
│   │   ├── workouts/
│   │   ├── challenges/
│   │   └── leaderboard/
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Main screens (Home, Login, Dashboard)
│   ├── routes/              # Protected routes and navigation
│   ├── services/            # Firebase functions (auth, db, storage)
│   ├── context/             # Global state providers
│   ├── styles/              # Tailwind or global styles
│   ├── utils/               # Helpers (date formatting, validation, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   └── firebase.js          # Firebase config and init
│
├── .env
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---


## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sweatcrew.git
   cd sweatcrew


2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your Firebase project and copy your config to `.env`:

   ```
   VITE_FIREBASE_API_KEY=xxx
   VITE_FIREBASE_AUTH_DOMAIN=xxx
   ...
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## 📸 Screenshots

*TODO: Add screenshots of Dashboard, Challenges page, Leaderboard, etc.*

## 📃 License

MIT License – [Open Source](LICENSE)



---

### ℹ️ **About Section (for website/About page)**

```txt
SweatCrew is built for communities that thrive on movement, accountability, and mutual motivation. Whether you're just starting your fitness journey or you're a weekend warrior, SweatCrew helps you stay on track by logging your workouts, joining challenges, and cheering each other on.

🏃‍♀️ Log workouts daily  
🔥 Join or create fun fitness challenges  
🥇 Compete on leaderboards  
🤝 Build a fitness tribe

Together, we sweat better. 💪

