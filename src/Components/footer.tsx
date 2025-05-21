export default function Footer() {
  return (
    <footer className="w-full bg-gray-600 text-gray-200 py-2 shadow-inner">
      <div className="px-4 text-sm text-center sm:text-left">
        &copy; {new Date().getFullYear()} xRayDent. All rights reserved.
        <br />
        <a
          href="https://gourav-duck.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          Build with cup of coffee{" "}
        </a>
      </div>
    </footer>
  );
}
