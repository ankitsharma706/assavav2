# ☕ Caffenia

A premium, immersive coffee e-commerce and experience platform built with React 19, Vite, and cutting-edge web technologies. Caffenia blends high-end design with seamless functionality to create a "ritual-like" shopping experience.

![Caffenia Preview](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070)

## ✨ Features

-   **🛍️ Premium Shop**: A curated selection of coffee products with smooth transitions and quick-add capabilities.
-   **🎭 Immersive Storytelling**: A dedicated "Scroll Story" page utilizing GSAP and Lenis for a cinematic brand narrative.
-   **🧊 3D Visuals**: Integration of React Three Fiber for dynamic 3D elements and interactive scenes.
-   **📅 Experience Events**: A comprehensive booking system for coffee-related events and workshops.
-   **🛒 Advanced Cart & Wishlist**: Persistent state management for a seamless user journey from discovery to checkout.
-   **📱 Responsive & Fluid**: Motion-driven UI using Framer Motion and custom CSS animations, fully optimized for all devices.
-   **🎨 GSAP Animations**: Smooth, professional-grade animations and parallax effects throughout the platform.

## 🚀 Tech Stack

-   **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
-   **Animations**: [GSAP](https://greensock.com/gsap/), [Framer Motion](https://www.framer.com/motion/)
-   **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org/)
-   **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd caffenia-main
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000/`.

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

-   `src/components/`: Reusable UI components and specific modules like `CoffeeComponents` and `EventComponents`.
-   `src/pages/`: Main route components (Home, Shop, About, Account, etc.).
-   `src/lib/`: Utility functions and library configurations.
-   `src/data/`: Static data and content constants.
-   `public/`: Static assets like images and 3D models.

## 🌐 Deployment

The project is pre-configured for easy deployment:
-   **Netlify**: Includes `netlify.toml` for SPA routing and build settings.
-   **Vercel**: Includes `vercel.json` for seamless Vercel integration.

---

Built with ❤️ by the Caffenia Team.
