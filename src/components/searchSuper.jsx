const SearchSuper = (props) => {
  return (
    <>
      <div className={`search-all ${props.cclass}`} >{props.children}</div>
    </>
  );
};

export default SearchSuper;
