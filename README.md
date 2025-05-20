# Visual Dash React

A modern, customizable dashboard application built with **React**, **Vite**, and **Tailwind CSS**. Features dynamic light/dark theming, customizable primary and secondary colors, and a beautiful, responsive UI.

## ✨ Features
- **Light & Dark Theme**: Toggle between light and dark modes instantly.
- **Custom Colors**: Change primary and secondary theme colors from the settings page.
- **Persistent Theme**: Theme and color choices are saved across sessions.
- **Responsive Layout**: Works great on desktop and mobile.
- **Reusable Components**: Buttons, toggles, cards, tables, modals, and more.
- **Sidebar & Header**: Fully themed and responsive navigation.
- **Accessible**: Keyboard navigation and focus styles.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation
```bash
# Clone the repository
$ git clone https://github.com/your-username/visual-dash-react.git
$ cd visual-dash-react

# Install dependencies
$ yarn install
# or
$ npm install
```

### Development
```bash
# Start the development server
$ yarn dev
# or
$ npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```bash
$ yarn build
# or
$ npm run build
```

## 🖌️ Theming & Customization
- **Theme Toggle**: Go to the **Settings** page to switch between light and dark mode.
- **Primary/Secondary Colors**: Use the color pickers in Settings to instantly update the dashboard's accent colors.
- **All components** (buttons, toggles, sidebar, header, etc.) update automatically to match your theme and color choices.

### How Theming Works
- Uses CSS variables and Tailwind's `dark` mode.
- The `.dark` class is toggled on `<html>` for dark mode.
- Theme and color choices are stored in `localStorage`.
- All colors are referenced via CSS variables (e.g., `--primary-color`, `--secondary-color`).

## 🗂️ Project Structure
```
src/
  components/    # Reusable UI components
  contexts/      # Theme context and providers
  layouts/       # Main layout wrappers
  pages/         # App pages (Dashboard, Products, Settings, etc.)
  routes/        # App routing
  index.css      # Tailwind and global styles
  App.tsx        # App entry point
```

## 🛠️ Customization
- Add new pages in `src/pages/` and link them in the sidebar.
- Create new components in `src/components/` and use theme classes (`bg-card`, `text-foreground`, etc.) for instant theming.
- Adjust theme variables in `index.css` for advanced color customization.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](LICENSE)
