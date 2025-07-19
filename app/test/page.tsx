export default function TestPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Test Tailwind CSS
        </h1>
        
        <div className="grid gap-6">
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Card Albastru</h2>
            <p>Acest card ar trebui să fie albastru cu text alb.</p>
          </div>
          
          <div className="bg-green-600 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Card Verde</h2>
            <p>Acest card ar trebui să fie verde cu text alb.</p>
          </div>
          
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-4">Glass Card</h2>
            <p>Acest card ar trebui să aibă efect glassmorphism.</p>
          </div>
          
          <div className="neumorphism p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Neumorphism</h2>
            <p>Acest card ar trebui să aibă efect neumorphism.</p>
          </div>
          
          <div className="space-y-4">
            <button className="btn-primary">Buton Primary</button>
            <button className="btn-secondary">Buton Secondary</button>
          </div>
          
          <input 
            type="text" 
            placeholder="Input field test" 
            className="input-field w-full"
          />
        </div>
      </div>
    </div>
  );
} 