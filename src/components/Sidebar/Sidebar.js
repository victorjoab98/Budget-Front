import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";


function Sidebar({ color, image, routes }) {
  
  const location = useLocation();
  
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <h3>Budget-Wallet</h3>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect && prop.sidebar)
              return (
                <li
                  className={ activeRoute(prop.layout + prop.path) }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
