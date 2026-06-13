# 💳 Fintech Payment App (Angular + Angular Material)

A simulated fintech payment application built with Angular.  
It demonstrates real-world frontend architecture including dynamic reactive forms, RxJS-based async processing, route guards, HTTP interceptors, and reusable UI components.

---

# 🚀 Features

- 📱 Mobile Wallet & 🏦 Bank Transfer payment simulation
- ⚡ Dynamic Reactive Forms (addControl / removeControl)
- 🧭 Route guards (AuthGuard + CanDeactivate)
- 💰 ETB currency formatting pipe
- 🔢 Numeric-only directive for input validation
- 🏷 Reusable status badge component
- 🌐 HTTP interceptor (mock API key injection)
- 🎨 Angular Material UI components

---

# 📦 Tech Stack

- Angular (Standalone Architecture)
- Angular Material
- RxJS
- TypeScript
- Reactive Forms
- UUID

---

# 📁 Project Structure

```text
src/app
│
├── core
│   ├── guards
│   ├── interceptors
│   └── services
│
├── shared
│   ├── components
│   ├── directives
│   └── pipes
│
├── pages
│   ├── login
│   ├── payment
│   ├── processing
│   ├── receipt
│   └── not-found
│
├── models
├── app.routes.ts
└── main.ts
## 🧪 Commands to Run the Project

### 📦 Install dependencies
npm install

### 🚀 Run development server
ng serve

### 🌐 Open application
http://localhost:4200

---

## 🏗 Build for production

ng build

---

## 🧹 Optional: Clean install (if issues happen)

rm -rf node_modules package-lock.json
npm install

---

