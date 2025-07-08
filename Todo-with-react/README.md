# 📝 Todo App – React + TypeScript + TailwindCSS

A production-grade Todo App built with React, designed to simulate real-world interview challenges from companies like Amazon and Swiggy. Features full CRUD functionality, filtering, persistent storage, and a beautiful responsive UI.

---

## 🚀 Features

### ✅ Core Functionality
- **Create**: Add tasks with title, description, priority, and due date
- **Read**: View a list of todos with real-time updates
- **Update**: Inline editing of title and description, status toggling
- **Delete**: Remove individual todos or clear completed

### 🔍 Filtering & Search
- Filter by `All`, `Active`, `Completed`
- Search by keyword in title or description

### 🎨 UX Enhancements
- Priority color-coding (High, Medium, Low)
- Due date highlighting (overdue indicators)
- Timestamps for creation and edits
- Smooth animations and hover effects

### 💾 Persistence
- Todos and preferences saved in `localStorage`
- Dark mode preference stored and restored

### 🌗 Dark Mode
- Toggle between dark/light themes
- Auto-persist user preference

---

## 🛠️ Technologies Used

- **React 18** with Functional Components + Hooks
- **TypeScript** for type safety
- **Tailwind CSS** for modern, responsive UI
- **React Context + useReducer** for global state management
- **LocalStorage** for client-side persistence

---

## 🧱 Folder Structure

```
src/
│
├── components/
│   ├── TodoForm.tsx
│   ├── TodoItem.tsx
│   └── FilterBar.tsx
│
├── hooks/
│   └── useTodos.ts
│
├── utils/
│   └── todoUtils.ts
│
├── App.tsx
└── index.tsx
```

---

## ✨ Bonus Features

- 🔍 Live search with debounce
- 📅 Due date warnings with visual alerts
- 🎨 Dark mode toggle with persistent setting
- 📱 Mobile-friendly design
- 🔄 Drag-and-drop support (coming soon)
- 🔔 Optional deadline reminders (via color cues)

---

## 💡 Running Locally

```bash
# Clone the repo
git clone https://github.com/NavnathVarade/react-practices.git
cd react-practices/Todo-with-react

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## ✅ Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - Lint code
- `npm run format` - Format using Prettier

---

## 📸 Preview

![Light Mode](./screenshots/light.png)
![Dark Mode](./screenshots/dark.png)

---

## 📦 Deployment

Deployed via **Vercel / Netlify**:
🔗 [Live Demo](https://your-todo-demo.vercel.app)

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Navnath Varade** – [GitHub](https://github.com/NavnathVarade)
📂 [Project Repo](https://github.com/NavnathVarade/react-practices/tree/main/Todo-with-react)

---

## 📜 License

MIT © 2025 - Feel free to fork, use, and modify!

---

## ✅ Getting Started with GitHub

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Fully featured Todo App"
```

### 2. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `todo-app-react`
3. Don't initialize with README (we already have one)

### 3. Push to GitHub
```bash
git remote add origin https://github.com/NavnathVarade/react-practices.git
git branch -M main
git push -u origin main
```

### 4. Add Screenshots (Optional)
1. Create a `screenshots` folder in your project root
2. Add light.png and dark.png screenshots
3. Commit and push the changes

---

## 🏆 Interview Ready Features

This Todo App demonstrates key concepts often tested in technical interviews:

- **State Management**: Context API + useReducer pattern
- **TypeScript**: Strong typing and interfaces
- **Performance**: Memoization and optimization techniques
- **Persistence**: LocalStorage integration
- **UI/UX**: Responsive design with Tailwind CSS
- **Testing Ready**: Component-based architecture
- **Clean Code**: Separation of concerns and reusable components
