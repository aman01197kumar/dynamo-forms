import Link from "next/link";
import RecentForms from "../_components/layout/RecentForms";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Build Forms Effortlessly
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Create, manage, and track all your forms from one beautiful dashboard.
        </p>

        <Link href="/create-form">
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="relative z-10">Create New Form</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </Link>
      </section>

      {/* Recent Forms Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recently Created Forms
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <RecentForms />
        </div>
      </section>
    </main>
  );
};

export default Home;
