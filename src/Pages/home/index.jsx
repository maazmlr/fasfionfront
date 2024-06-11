import { Navbar } from "@nextui-org/react"
import Carousel from "./Carousel"
import FeaturedItem from "./Featured"
import Example from "./MostPopular"
import NewColection from "./NewColection"


const Home = () => {
  return (
    <div>
   <Carousel/>
   {/* <Example/> */}
   {/* <FeaturedItem/> */}
   <NewColection/>
   
    </div>

  )
}

export default Home