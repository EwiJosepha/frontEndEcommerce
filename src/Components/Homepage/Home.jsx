import Filtertypes from "../FilterbyTypes/Filtertypes"
import Grab from "../Grapbuy/Grab"
import Mealcard from "../Mealcards/Mealcard"
import Footer from "./Footer"
// import Pagination from "../Pagination/Pagination"

function Home () {
    return(
      <>
      <Grab />
      <Filtertypes />
      <Mealcard />
      {/* <Pagination /> */}
      <Footer />

      </>
    )
}
 export default Home