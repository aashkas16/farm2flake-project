import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import ShopByCategory from '../components/home/ShopByCategory'
import BestSellers from '../components/home/BestSellers'
import RealIngredients from '../components/home/RealIngredients'
import Testimonials from '../components/home/Testimonials'


function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <HowItWorks />
      <ShopByCategory />
      <BestSellers />
      <RealIngredients />
      <Testimonials />
    </div>
  )
}

export default Home