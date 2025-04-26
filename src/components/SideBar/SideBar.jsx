import "./sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
