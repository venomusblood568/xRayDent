import xray from "../assets/x-ray_colour.png"; 
export default function Header() {
  return (
    <>
      <div className="flex items-center gap-4 p-2 bg-gray-600">
        <img
          src={xray}
          alt="Dental X-ray"
          className="w-20 h-20 object-contain rounded-md p-1"
        />
        <div>
          <h1 className="text-3xl font-bold dm-mono-medium text-white">
            xRayDent
          </h1>
          <p className="text-sm dm-mono-light text-gray-300">
            Your Digital DICOM viewer
          </p>
        </div>
      </div>
    </>
  );
}
