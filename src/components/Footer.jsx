import React from "react";

function Footer() {
  return (
    <footer className="bg-cyan-200 py-8 fixed bottom-0 left-0 right-0 h-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-center md:text-left text-sm text-gray-700">
        <div className="mb-4 md:mb-0 flex flex-row">
          <h2 className="font-bold mr-1">OSRB</h2>
          <p>© 2023 - 2024</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h2 className="font-bold">Contact</h2>
        </div>
        <div className="mb-4 md:mb-0">
          <h2 className="font-bold">Features</h2>
        </div>
        <div className="mb-4 md:mb-0">
          <h2 className="font-bold">Resources</h2>
        </div>
        <div>
          <h2 className="font-bold">Company</h2>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
