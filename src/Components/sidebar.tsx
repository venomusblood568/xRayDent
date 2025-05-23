import Brightness from "./tools_com/brightness";
import Flip from "./tools_com/flip";
import Invert from "./tools_com/invert";
import Measurement from "./tools_com/measurement";

import Rotate from "./tools_com/Rotate";
import Zoom from "./tools_com/zoom";

export default function Sidebar({
  onBrightnessChange,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onRotate,
  onFlipHorizontal,
  onFlipVertical,
  onInvertToggle,
  captureRef,
}: {
  onBrightnessChange: (value: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onRotate: (angle: number) => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onInvertToggle: () => void;
  captureRef: React.RefObject<HTMLDivElement | null>;
  zoom: number;
}) {
  const handleDownload = () => {
    if (!captureRef.current) {
      alert("Nothing to capture.");
      return;
    }

    const canvases = captureRef.current.querySelectorAll("canvas");
    if (canvases.length === 0) {
      alert("No canvas found.");
      return;
    }

    const baseCanvas = canvases[0];
    const overlayCanvas = canvases[1]; // might be undefined

    // Create a merged canvas with same dimensions as base
    const mergedCanvas = document.createElement("canvas");
    mergedCanvas.width = baseCanvas.width;
    mergedCanvas.height = baseCanvas.height;

    const ctx = mergedCanvas.getContext("2d");
    if (!ctx) {
      alert("Failed to get canvas context.");
      return;
    }

    // Draw base image canvas
    ctx.drawImage(baseCanvas, 0, 0);

    // Draw overlay markers canvas, if exists
    if (overlayCanvas) {
      ctx.drawImage(overlayCanvas, 0, 0);
    }

    // Save merged canvas as PNG file
    mergedCanvas.toBlob((blob) => {
      if (!blob) {
        alert("Failed to export image.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "screenshot_with_markers.png";
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="flex flex-col rounded-2xl border-2 border-white text-gray-500 p-4 w-72">
      <div className="flex-1 flex flex-col justify-start gap-2">
        <Brightness onChange={onBrightnessChange} />
        <Zoom
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onResetZoom={onResetZoom}
        />
        <Rotate onRotate={onRotate} />
        <Flip
          onFlipHorizontal={onFlipHorizontal}
          onFlipVertical={onFlipVertical}
        />
        <Invert onInvertToggle={onInvertToggle} />
        <Measurement />
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-xl text-white"
      >
        Download
      </button>
    </div>
  );
}
