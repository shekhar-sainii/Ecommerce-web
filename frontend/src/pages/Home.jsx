import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import Latestcollection from "../components/LatestCollection"
import { NewsLetterBox } from "../components/NewsLetterBox"
import { OurPolicy } from "../components/OurPolicy"

const Home = () => {
  return (
    <div>
        <Hero/>
        <Latestcollection/>
        <BestSeller/>
        <OurPolicy/>
        <NewsLetterBox/>
    </div>
  )
}

export default Home