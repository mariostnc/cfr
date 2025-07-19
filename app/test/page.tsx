export default function TestPage() {
  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Test CSS Styling</h1>
          <p className="text-gray-400 text-sm sm:text-base">Verifică funcționarea stilurilor Tailwind CSS</p>
        </div>

        {/* Glass Cards */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <div className="glass-card">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Glass Card Test</h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Aceasta este o carte cu efect glassmorphism. Ar trebui să aibă un fundal semi-transparent cu blur.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Buton Primary
              </button>
              <button className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Buton Secondary
              </button>
            </div>
          </div>

          <div className="glass-card">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Neumorphism Test</h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Aceasta este o carte cu efect neumorphism. Ar trebui să aibă umbre subtile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="neumorphism p-4 sm:p-6 rounded-lg">
                <h3 className="font-bold text-sm sm:text-base mb-2">Neumorphism Card</h3>
                <p className="text-xs sm:text-sm text-gray-400">Efect 3D subtil</p>
              </div>
              <div className="neumorphism p-4 sm:p-6 rounded-lg">
                <h3 className="font-bold text-sm sm:text-base mb-2">Neumorphism Card</h3>
                <p className="text-xs sm:text-sm text-gray-400">Efect 3D subtil</p>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="glass-card mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Paletă de Culori</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="w-full h-12 sm:h-16 bg-blue-600 rounded-lg mb-2"></div>
              <span className="text-xs sm:text-sm font-medium">Blue 600</span>
            </div>
            <div className="text-center">
              <div className="w-full h-12 sm:h-16 bg-green-600 rounded-lg mb-2"></div>
              <span className="text-xs sm:text-sm font-medium">Green 600</span>
            </div>
            <div className="text-center">
              <div className="w-full h-12 sm:h-16 bg-purple-600 rounded-lg mb-2"></div>
              <span className="text-xs sm:text-sm font-medium">Purple 600</span>
            </div>
            <div className="text-center">
              <div className="w-full h-12 sm:h-16 bg-yellow-600 rounded-lg mb-2"></div>
              <span className="text-xs sm:text-sm font-medium">Yellow 600</span>
            </div>
            <div className="text-center">
              <div className="w-full h-12 sm:h-16 bg-red-600 rounded-lg mb-2"></div>
              <span className="text-xs sm:text-sm font-medium">Red 600</span>
            </div>
            <div className="text-center">
              <div className="w-full h-12 sm:h-16 bg-gray-600 rounded-lg mb-2"></div>
              <span className="text-xs sm:text-sm font-medium">Gray 600</span>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="glass-card mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tipografie</h2>
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Heading 1 - Titlu Principal</h1>
            <h2 className="text-xl sm:text-2xl font-bold">Heading 2 - Subtitlu</h2>
            <h3 className="text-lg sm:text-xl font-bold">Heading 3 - Secțiune</h3>
            <p className="text-sm sm:text-base text-gray-300">
              Acesta este un paragraf normal cu text de dimensiune medie. Ar trebui să fie ușor de citit.
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Acesta este un text mai mic, folosit pentru informații secundare sau note.
            </p>
          </div>
        </div>

        {/* Form Elements */}
        <div className="glass-card mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Elemente de Formular</h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Input Field</label>
              <input 
                type="text" 
                placeholder="Scrie aici..." 
                className="input-field w-full text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Field</label>
              <select className="input-field w-full text-sm sm:text-base">
                <option value="">Alege o opțiune</option>
                <option value="1">Opțiunea 1</option>
                <option value="2">Opțiunea 2</option>
                <option value="3">Opțiunea 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Textarea</label>
              <textarea 
                placeholder="Scrie un mesaj..." 
                className="input-field w-full h-24 sm:h-32 resize-none text-sm sm:text-base"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="glass-card mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Butoane</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <button className="btn-primary text-sm sm:text-base py-2 sm:py-3">
              Primary
            </button>
            <button className="btn-secondary text-sm sm:text-base py-2 sm:py-3">
              Secondary
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              Success
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              Danger
            </button>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="glass-card">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Grid Responsive</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="neumorphism p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-blue-400 mb-1">1</div>
              <div className="text-xs sm:text-sm text-gray-400">Coloană</div>
            </div>
            <div className="neumorphism p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-green-400 mb-1">2</div>
              <div className="text-xs sm:text-sm text-gray-400">Coloane</div>
            </div>
            <div className="neumorphism p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-purple-400 mb-1">3</div>
              <div className="text-xs sm:text-sm text-gray-400">Coloane</div>
            </div>
            <div className="neumorphism p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-yellow-400 mb-1">4</div>
              <div className="text-xs sm:text-sm text-gray-400">Coloană</div>
            </div>
            <div className="neumorphism p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-red-400 mb-1">5</div>
              <div className="text-xs sm:text-sm text-gray-400">Coloană</div>
            </div>
            <div className="neumorphism p-3 sm:p-4 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-gray-400 mb-1">6</div>
              <div className="text-xs sm:text-sm text-gray-400">Coloană</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 