import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-farm-green text-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Free Shipping on Orders Above ₱359</h2>
        <p className="mb-8 text-lg">Subscribe to get exclusive offers and nutrition tips!</p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded text-gray-800"
            required
          />
          <button type="submit" className="bg-farm-accent text-white px-6 py-3 rounded hover:bg-orange-600 font-semibold">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
