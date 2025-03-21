import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Logout failed: " + error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar
      style={{ backgroundColor: "#811619" }}
      variant="dark"
      expand="lg"
      className="w-100"
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/logo.png" alt="شعار النادي" className="logo" />
          نظام إحصائيات اللاعبين
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/stats" activeClassName="active">
              الصفحة الرئيسية
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" activeClassName="active">
              اتصل بنا
            </Nav.Link>
            {isLoggedIn && (
              <Button
                variant="link"
                className="nav-link"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
