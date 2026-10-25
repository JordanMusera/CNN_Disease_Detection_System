import React from "react";
import { Link, useLocation } from "react-router-dom";
const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const onModels = location.pathname.startsWith("/conditions");
  const onTests = location.pathname === "/tests";
  return <div className="site-shell"><header className="site-header"><div className="header-inner"><Link to="/" className="brand">E-Afya <span>Imaging</span></Link><nav className="main-nav" aria-label="Main navigation"><Link to="/" className={!onModels && !onTests ? "nav-link active" : "nav-link"}>Home</Link><Link to="/conditions" className={onModels ? "nav-link active" : "nav-link"}>Models</Link><Link to="/tests" className={onTests ? "nav-link active" : "nav-link"}>Tests</Link></nav><Link to="/conditions" className="header-cta">View models</Link></div></header><main className="site-main">{children}</main><footer className="site-footer"><div className="footer-inner"><span className="footer-brand">E-Afya Imaging</span><p>Medical image classification project</p><span className="footer-local">Local model service</span></div></footer></div>;
};
export default AppShell;