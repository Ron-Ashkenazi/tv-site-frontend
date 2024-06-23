import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`app-root ${
        currentPath === "/sign-up" || currentPath === "/log-in"
          ? "auth-page"
          : ""
      }`}
      style={{ height: "100%" }}
    >
      {children}
      <div className="gap-div"></div>
    </div>
  );
}

export default Layout;
