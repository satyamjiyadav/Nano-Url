import logo from "../images/white2.jpg";

export default function Header() {
  return (
    <header className="header padding-xy">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
}
