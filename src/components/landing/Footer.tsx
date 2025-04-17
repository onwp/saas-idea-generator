import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 md:py-12 border-t bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SaaS Idea Generator. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/usage"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Usage Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
