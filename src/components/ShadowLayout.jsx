const ShadowLayout = ({ children, styleLy, horizontal }) => {
  return (
    <>
      <div className="product-d-menu-a" style={styleLy && styleLy}>
        {children}
        {horizontal ? <hr /> : ""}
      </div>
    </>
  );
};

export default ShadowLayout;
