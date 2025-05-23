import mockup from "../../assets/mockup-smartphone.png";

export default function MockupSmartphone() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute block min-h-[200px] min-w-[200px] rounded-full animate-grow-shrink bg-gradient-to-r from-green-300 to-green-700 shadow-3d-bottom"></span>
      <img
        src={mockup.src}
        alt="mockup smartphone"
        className="relative z-10 animate-custom-bounce "
      />
    </div>
  );
}
