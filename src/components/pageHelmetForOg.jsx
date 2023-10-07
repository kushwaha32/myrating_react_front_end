import { Helmet } from "react-helmet";
const PageHelmetOg = ({ currentProduct, currentBrand }) => {
  if (!currentProduct && !currentBrand) {
    return null;
  }
  let title;
  let description;
  let image;
  if (currentProduct) {
    title = currentProduct?.productName;
    description = currentProduct?.productName;
    image = currentProduct?.proifleImg;
  }
  if (currentBrand) {
    title = currentBrand?.brandName;
    description = currentBrand?.brandName;
    image = currentBrand?.brandImage;
  }

  return (
    <Helmet>
      {console.log(currentProduct)}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        property="og:url"
        content={document?.URL?.split("/").splice(0, 5).join("/")}
      />
    </Helmet>
  );
};

export default PageHelmetOg;
