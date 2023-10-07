import { Route } from "react-router-dom";
import ProductOrUserDetailsBelow767 from "../components/componentBelow767/ProductOrUserDetailsBelow767";
import ProductAboutBelow767 from "../components/componentBelow767/ProductAboutBelow767";


const ProductRoutesBelow767 = () => (
      <Route path="/product/:productName" element={<ProductOrUserDetailsBelow767 />} >
             <Route index element={<ProductAboutBelow767 />} />
      </Route>
)


export default ProductRoutesBelow767;