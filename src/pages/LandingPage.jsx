import Navbar from "../components/Navbar";
import logoImage from "../assets/images/logo.png";


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

              <button className="mt-6 bg-[#087E8B] hover:bg-[#56666B] text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition">
                Start Your Journey 💪
              </button>


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
      </div>
    </>
  );
}
