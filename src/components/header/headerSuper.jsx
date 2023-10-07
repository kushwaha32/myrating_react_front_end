import "../../assets/css/header.css";

const HeaderSuper = (props) => {
  return (
    <header className="header-super">
      <div className="container h-main header-super-a">{props.children}</div>
    </header>
  );
};

export default HeaderSuper;
