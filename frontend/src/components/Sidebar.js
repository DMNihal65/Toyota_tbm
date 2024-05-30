import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { navBarSlice } from "../redux/navbarSlice";
import { Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const sidebarStyle = {
  width: "100vw",
  backgroundColor: "#f8f9fa",
  height: "100vh",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "999",
};

const menuTitleStyle = {
  fontSize: "1.2rem",
  marginTop: "0",
};

const menuItemStyle = {
  textDecoration: "none",
  color: "inherit",
  border: "none",
  outline: "none",
  cursor: "pointer",
  color: "white",
  width: "100%",
  padding: "12px 0px",
};

export function AppSidebar({ children }) {
  const { visible } = useSelector((state) => state.navBar);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const level = auth.user ? auth.user.level : 0;

  const handleClose = () => {
    dispatch(navBarSlice.actions.setVisible(false));
  };

  return (
    <>
      <Offcanvas show={visible} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <h2 style={menuTitleStyle}>Menu</h2>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {level >= 0 && (
            <Link to="/summaryAbnormality">
              <Button variant="dark" style={menuItemStyle}>
                <i className="bi bi-stack-overflow px-1"></i>Abnormality Summary
              </Button>
            </Link>
          )}
          {level >= 0 && (
            <Link to="/summaryCards">
              <Button variant="dark" style={menuItemStyle}>
                <i className="bi bi-stack-overflow px-1"></i>Cards Summary
              </Button>
            </Link>
          )}
          {level >= 20 && (
            <Link to="/addCheckItems">
              <Button variant="dark" style={menuItemStyle}>
                <i className="bi bi-plus-square"></i> CheckItems
              </Button>
            </Link>
          )}
          <Link to="/allMachine">
            <Button variant="dark" style={menuItemStyle}>
              All CheckItems
            </Button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>

      <div style={sidebarStyle}>{children}</div>
    </>
  );
}
