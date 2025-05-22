import { useState, useEffect } from "react";
import { Pen } from "../../assets/icons/pen";
import { Cross } from "../../assets/icons/cross";

const DPI = 96;
const PX_TO_MM = 25.4 / DPI;

function pxToMm(px) {
  return px * PX_TO_MM;
}

export default function Measurement() {
  const [measuring, setMeasuring] = useState(false);
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(null);

  const clearMeasurement = () => {
    setPoints([]);
    setDistance(null);
    setMeasuring(false);
  };

  function handleOverlayClick(e) {
    if (!measuring) return;

    const { clientX, clientY } = e;

    setPoints((prevPoints) => {
      if (prevPoints.length >= 2) return prevPoints;
      const newPoints = [...prevPoints, { x: clientX, y: clientY }];

      if (newPoints.length === 2) {
        const dx = newPoints[1].x - newPoints[0].x;
        const dy = newPoints[1].y - newPoints[0].y;
        const distPx = Math.sqrt(dx * dx + dy * dy);
        const distMm = pxToMm(distPx);
        setDistance(distMm.toFixed(2));
        setMeasuring(false);
      }

      return newPoints;
    });
  }

  useEffect(() => {
    if (measuring) {
      setPoints([]);
      setDistance(null);
    }
  }, [measuring]);

  const hasMeasurement = points.length === 2;
  const midX = hasMeasurement ? (points[0].x + points[1].x) / 2 : 0;
  const midY = hasMeasurement ? (points[0].y + points[1].y) / 2 : 0;

  return (
    <>
      <div className="relative flex items-center justify-between w-full h-12 px-4 rounded-xl border border-gray-700 text-sm text-white select-none">
        <span className="font-medium text-gray-300">Measurement</span>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setMeasuring(!measuring)}
            className={`flex items-center justify-center w-9 h-9 rounded-lg border ${
              measuring
                ? "border-blue-500 bg-blue-900/50"
                : "border-gray-600 hover:border-white hover:bg-gray-800"
            } transition-all duration-150`}
            title={measuring ? "Stop measurement" : "Start measurement"}
          >
            <Pen />
          </button>
          <button
            onClick={clearMeasurement}
            className={`flex items-center justify-center w-9 h-9 rounded-lg border ${
              points.length > 0 || distance
                ? "border-red-500 hover:border-red-400 hover:bg-red-900/20"
                : "border-gray-600 opacity-50 cursor-not-allowed"
            } transition-all duration-150`}
            title="Clear measurement"
            disabled={!points.length && !distance}
          >
            <Cross />
          </button>
        </div>
      </div>

      {/* Always show measurement when points exist */}
      {(points.length > 0 || distance) && (
        <div className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            style={{ overflow: "visible" }}
          >
            {/* Connection line */}
            {points.length === 2 && (
              <line
                x1={points[0].x}
                y1={points[0].y}
                x2={points[1].x}
                y2={points[1].y}
                stroke="#ff4444"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {/* Measurement dots */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#ff0000"
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}

            {/* Distance label */}
            {points.length === 2 && (
              <text
                x={midX}
                y={midY - 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="bold"
                style={{
                  paintOrder: "stroke",
                  stroke: "#000",
                  strokeWidth: "2px",
                }}
              >
                {distance} mm
              </text>
            )}
          </svg>
        </div>
      )}

      {/* Measurement overlay (click handling) */}
      {measuring && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 w-screen h-screen cursor-crosshair z-[9998]"
        />
      )}
    </>
  );
}
