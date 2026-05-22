import { Link } from "react-router-dom"

export default function Trial() {
  return (
    <section className="min-h-[70vh] bg-white py-19">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#1c2b1d] mb-6">Trial Pack</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Try our premium cereal flakes with our special trial pack. Get a sample of our best-selling varieties at a discounted price.
        </p>
        <div className="bg-[#f8f9f8] p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-[#275227] mb-4">What's Included</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>3 sample packs of our most popular cereal flakes</li>
            <li>Free shipping on your trial order</li>
            <li>30-day money-back guarantee</li>
            <li>Exclusive discount code for future purchases</li>
          </ul>
          <Link
  to="/trial-selection"
  onClick={() => window.scrollTo(0, 0)}
  className="inline-block mt-6 bg-[#275227] text-white px-6 py-3 rounded-lg hover:bg-[#1d3a1d] transition"
>

  Order Trial Pack

</Link>
        </div>
      </div>
    </section>
  );
}
