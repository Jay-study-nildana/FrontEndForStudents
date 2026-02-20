import { Link } from "react-router-dom";

const HomePageNestJSFive = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center py-10 px-4">
    <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 border border-purple-200">
      <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6 drop-shadow">
        Project Overview
      </h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
          <span role="img" aria-label="frontend">
            🎨
          </span>{" "}
          Frontend Summary
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          This project is a modern web application built with{" "}
          <span className="font-semibold text-blue-600">ReactJS</span>, designed
          to provide a rich and interactive user experience. It features a clean
          and organized structure, with dedicated sections for user
          authentication, file management, blog posts, and Formula 1 data
          visualization. The application includes a landing page, navigation
          bar, and footer for easy navigation. Users can register, log in, view
          and edit their profiles, and manage their files. There are also
          specialized components for displaying and analyzing Formula 1 racing
          data, as well as tools for creating, editing, and viewing blog posts.
          The project uses{" "}
          <span className="font-semibold text-blue-600">Tailwind CSS</span> for
          styling and <span className="font-semibold text-blue-600">Vite</span>{" "}
          for fast development. Overall, it offers a user-friendly interface
          with a focus on usability, data presentation, and content management.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
          <span role="img" aria-label="backend">
            🛠️
          </span>{" "}
          Backend Summary
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          This project is a demonstration of a modern web backend built with{" "}
          <span className="font-semibold text-purple-600">NestJS</span>. It
          includes examples of basic features like a “Hello World” endpoint and
          more advanced capabilities such as managing data, user authentication,
          and file uploads. The project uses both in-memory and PostgreSQL
          databases, showing how to store and retrieve information efficiently.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          It features a user-friendly admin panel for managing users and roles,
          and supports secure login and registration with role-based access.
          Users can upload and view files, with each file linked to the person
          who uploaded it. The project also highlights how to run custom
          database queries and transactions, and includes automated tests to
          ensure everything works as expected.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Comprehensive documentation and interactive API testing are provided
          through <span className="font-semibold text-purple-600">Swagger</span>
          , making it easy to explore and understand the available features. The
          project is designed to be a practical starting point for building
          secure, feature-rich web applications.
        </p>
      </section>
      <div className="flex justify-center mt-8">
        <Link
          to="/f1-homepage"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
        >
          Go to F1 Homepage
        </Link>
      </div>
    </div>
  </div>
);

export default HomePageNestJSFive;
