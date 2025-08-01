import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <span>Developed by Melvin Sillah</span>
      <p>{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;

// import React from 'react';

// function Footer() {
//   return (
//     <footer className="footer">
//       <p>© {new Date().getFullYear()} Weather Wardrobe App</p>
//     </footer>
//   );
// }

// export default Footer;
