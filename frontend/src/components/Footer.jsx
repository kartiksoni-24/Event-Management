const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content px-4 py-10 mt-auto w-full border-t border-base-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: Logo and About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EventHub</h2>
          <p className="text-sm leading-relaxed">
            Discover, create, and join amazing campus events. Built for
            students, by students.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#" className="">
              <i className="fab fa-twitter"></i> X
            </a>
            <a href="#" className="hover:text-secondary">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Gradient Text */}
      <div className="text-center mt-10">
        <p className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse font-mono">
          Created by Kartik
        </p>
      </div>
    </footer>
  );
};

export default Footer;
