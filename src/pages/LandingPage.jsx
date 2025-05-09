import Navbar from "../components/Navbar";
import logoImage from "../assets/images/logo.png";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="pt-16">
        <section className="pt-24 pb-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Helping people live <br />
                <span className="text-gray-700">their</span> <br />
                <span className="text-[#087E8B]">BEST LIVES</span>
              </h1>

              <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-lg">
                Health on your mind? We’ve got you covered. With over{" "}
                <strong>300,000+</strong> success stories, SweatCrew is leading
                the fitness revolution.
              </p>

              <Link to="/signup">
                <div className="mt-6 bg-[#087E8B] hover:bg-[#56666B] text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition text-center">
                  Start Your Journey 💪
                </div>
              </Link>

            </div>

            {/* Right Visual */}
            <div className="w-full flex justify-center items-center">
              <img
                src={logoImage}
                alt="SweatCrew App Preview"
                className="max-h-96 w-auto rounded-xl shadow-lg object-contain"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Crush Your Fitness Goals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Whether you’re just starting out or looking to level up, SweatCrew
              gives you the tools, coaches, and community to succeed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-[#087E8B] mb-2">
                  Expert Coaching
                </h3>
                <p className="text-gray-600">
                  Get matched with certified trainers to personalize your
                  workout and nutrition plans.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-[#087E8B] mb-2">
                  Challenge Yourself
                </h3>
                <p className="text-gray-600">
                  Join fitness challenges, track your wins, and stay motivated
                  with friendly competition.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-[#087E8B] mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Log workouts, measure performance, and celebrate your
                  milestones in style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <FAQSection />

        {/* Testimonials */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Real People. Real Transformations.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Hear what our users have to say after joining SweatCrew.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
                <p className="text-gray-700 mb-4">
                  “SweatCrew helped me lose 10kg and build a consistent routine.
                  My coach was always there to guide me!”
                </p>
                <div className="text-sm font-semibold text-[#087E8B]">
                  – Eugene A.
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
                <p className="text-gray-700 mb-4">
                  “I joined a 30-day challenge and got hooked. The progress
                  tracker and the friendly community kept me accountable.”
                </p>
                <div className="text-sm font-semibold text-[#087E8B]">
                  – Felix K.
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
                <p className="text-gray-700 mb-4">
                  “Was skeptical at first, but SweatCrew turned out to be
                  life-changing. I’ve never felt more in control of my health.”
                </p>
                <div className="text-sm font-semibold text-[#087E8B]">
                  – Annie G.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-[#087E8B] py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">
              Join thousands of others who took charge of their health with
              SweatCrew. Your journey starts today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/signup"
              className="bg-white text-[#087E8B] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/signup"
              className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#087E8B] transition"
            >
              Talk to a Coach
            </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
