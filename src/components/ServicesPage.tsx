import imgCustomerVoices from "figma:asset/6ca5b6e16190e8470e1c59b77a2621fa8c35c1d4.png";
import imgSlalomLogo from "figma:asset/6c66aba246da7499b22a27291bf2594c089e5e76.png";
import ButtonOutline from "../imports/ButtonOutline";
import LocationOn from "../imports/LocationOn";

interface ServicesPageProps {
  onBack: () => void;
}

const services = [
  { id: "St", name: "Strategy", color: "bg-[#d4a5d4]" },
  { id: "Da", name: "Data", color: "bg-[#ff6b9d]" },
  { id: "Ai", name: "Artificial intelligence", color: "bg-[#ff9b7a]" },
  { id: "Cl", name: "Cloud", color: "bg-[#ffb347]" },
  { id: "Si", name: "System implementation", color: "bg-[#f4e04d]" },
  { id: "Ex", name: "Experience strategy & design", color: "bg-[#c9df56]" },
  { id: "Dp", name: "Digital product building", color: "bg-[#a8d08d]" },
  { id: "Pd", name: "Planning & delivery", color: "bg-[#7fb069]" },
  { id: "Oc", name: "Organizational change & talent", color: "bg-[#8fd4c1]" },
  { id: "Op", name: "Operations", color: "bg-[#7ec8e3]" },
  { id: "Su", name: "Sustainability", color: "bg-[#a6c8e5]" },
  { id: "Ps", name: "Privacy & security", color: "bg-[#a8a8d4]" },
];

export function ServicesPage({ onBack }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-[#002faf] px-8 py-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.1)]">
        <button 
          onClick={onBack}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src={imgSlalomLogo} alt="Slalom" className="h-8" />
        </button>
        <nav className="hidden md:flex items-center gap-6">
          <span className="text-[#c9df56] font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Services</span>
          <a href="#" className="text-white hover:text-[#c9df56] hover:font-bold transition-all font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Industries</a>
          <a href="#" className="text-white hover:text-[#c9df56] hover:font-bold transition-all font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Insights</a>
          <button 
            onClick={onBack}
            className="border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#002faf] transition-colors font-semibold"
            style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
          >
            Let's Talk
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Our Services Section */}
        <section className="px-8 py-16 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl mb-6">
            Our services
          </h1>
          
          {/* Introduction with Infographic */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16 items-start">
            <div className="flex-1 max-w-2xl">
              <p className="text-[19px] text-gray-700 leading-relaxed">
                With a relentless focus on "why," we combine our services to discover, design, and build the most impactful outcomes for you. We don't come with predetermined processes. Rather, we roll up our sleeves and craft practical, end-to-end solutions in partnership with your teams. Our services are broad, deep, and infinitely customizable!
              </p>
            </div>
            
            {/* Infographic - 2 Column Layout */}
            <div className="w-full lg:w-80 flex-shrink-0 lg:ml-auto lg:-mt-8">
              <h3 className="text-[17px] mb-5 text-gray-800 font-semibold text-left pl-1">LOCAL SOUL, GLOBAL SCALE</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column - Stacked */}
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-[#002faf] mb-1">10K+</div>
                    <p className="text-sm text-gray-700">Interconnected team members</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#002faf] mb-1">700+</div>
                    <p className="text-sm text-gray-700">Technology partners</p>
                  </div>
                </div>
                
                {/* Right Column - 52 by itself */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-2xl font-bold text-[#002faf]">52</span>
                    <div className="w-6 h-6" style={{ '--fill-0': '#002faf' } as React.CSSProperties}>
                      <LocationOn />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Local offices, including our Canadian offices in Calgary, Montréal, Toronto and Vancouver</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((service) => (
              <button
                key={service.id}
                className="flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-[#002faf] hover:shadow-lg transition-all group text-left"
              >
                <div className={`${service.color} w-16 h-16 rounded flex items-center justify-center flex-shrink-0`}>
                  <span className="text-black text-xl font-bold">{service.id}</span>
                </div>
                <span className="text-lg font-bold group-hover:text-[#002faf] transition-colors">
                  {service.name}
                </span>
              </button>
            ))}
          </div>

          {/* Team Description */}
          <div className="mb-16 text-center">
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              From the best strategists to the most talented engineers and everyone in between, our team members drive actionable results and long-term impact.
            </p>
          </div>

          {/* Customer Voices Section */}
          <div className="mb-8">
            <img 
              src={imgCustomerVoices} 
              alt="Customer voices and testimonials" 
              className="w-full"
            />
          </div>
        </section>

        {/* Let's Solve Together CTA – Full Width */}
        <section className="lets-solve-cta">
          <div className="lets-solve-cta__inner">
            <h2 className="lets-solve-cta__headline">
              Let's solve <span className="lets-solve-cta__headline-italic">together.</span>
            </h2>

            <button className="lets-solve-cta__button" onClick={onBack}>
              <span>Get in touch</span>
              <span className="lets-solve-cta__button-arrow">→</span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#002faf] text-white px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
              <div>
                <img src={imgSlalomLogo} alt="Slalom" className="h-8 mb-4 brightness-0 invert" />
              </div>
              
              <div>
                <h3 className="font-semibold mb-3" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">LinkedIn</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Twitter</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Instagram</a></li>
                </ul>
              </div>
              
              {/* Our Locations - 3 columns */}
              <div className="md:col-span-3">
                <h3 className="font-semibold mb-3" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Our Locations</h3>
                <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
                  <div className="space-y-2">
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Australia</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Canada</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Colombia</a></div>
                  </div>
                  <div className="space-y-2">
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Germany</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Ireland</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Japan</a></div>
                  </div>
                  <div className="space-y-2">
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Mexico</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">Netherlands</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">New Zealand</a></div>
                    <div><a href="#" className="text-gray-300 hover:text-[#c9df56] hover:font-bold transition-all">United Kingdom</a></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[rgba(255,255,255,0.2)] pt-6 text-sm text-gray-300 text-center">
              <p>© {new Date().getFullYear()} Slalom, LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ServicesPage;