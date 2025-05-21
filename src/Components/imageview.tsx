import React, { useEffect, useRef, useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import * as dicomParser from "dicom-parser";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import SelectButton from "../Components/select_button";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

export default function ImageView({
  brightness,
  zoom,
}: {
  brightness: number;
  zoom: number;
}) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const initialVoiRef = useRef<{ windowCenter: number; windowWidth: number }>();
  const initialScaleRef = useRef<number>(1);

  // Load image & enable tools
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !imageId) return;

    cornerstone.enable(element);

    cornerstone
      .loadAndCacheImage(imageId)
      .then((image) => {
        cornerstone.displayImage(element, image);

        // Store initial VOI values
        initialVoiRef.current = {
          windowCenter: Array.isArray(image.windowCenter)
            ? image.windowCenter[0]
            : image.windowCenter,
          windowWidth: Array.isArray(image.windowWidth)
            ? image.windowWidth[0]
            : image.windowWidth,
        };

        // Reset viewport and fit to window
        cornerstone.reset(element);
        cornerstone.fitToWindow(element);

        // Get initial scale after fitting to window
        const enabledElement = cornerstone.getEnabledElement(element);
        initialScaleRef.current = enabledElement.viewport.scale;

        // Apply initial VOI settings
        const viewport = cornerstone.getViewport(element);
        viewport.voi.windowCenter = initialVoiRef.current.windowCenter;
        viewport.voi.windowWidth = initialVoiRef.current.windowWidth;
        cornerstone.setViewport(element, viewport);

        // Initialize tools
        cornerstoneTools.init();
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 1 });
        cornerstoneTools.addTool(cornerstoneTools.PanTool);
        cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 2 });
      })
      .catch((err) => console.error("Error displaying DICOM", err));

    return () => {
      cornerstone.disable(element);
    };
  }, [imageId]);

  // Update brightness (window center)
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !initialVoiRef.current) return;

    const viewport = cornerstone.getViewport(element);
    const brightnessRange = initialVoiRef.current.windowWidth * 0.5;
    viewport.voi.windowCenter =
      initialVoiRef.current.windowCenter + brightness * brightnessRange;
    cornerstone.setViewport(element, viewport);
  }, [brightness]);

  // Update zoom scale
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !initialScaleRef.current) return;

    const viewport = cornerstone.getViewport(element);
    viewport.scale = initialScaleRef.current * zoom;
    cornerstone.setViewport(element, viewport);
  }, [zoom]);

  const handleFileSelect = (file: File) => {
    const localImageId =
      cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    setImageId(localImageId);
    setFileSelected(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-white text-gray-300 text-lg">
      <div className="flex-grow p-8 flex items-center justify-center">
        {!fileSelected && (
          <div className="text-center max-w-xl p-9 border-2 border-dashed rounded-2xl border-gray-600">
            <h1 className="text-white text-5xl font-bold mb-4 dm-mono-medium">
              xRayDent
            </h1>
            <p className="text-gray-300 text-lg mb-6 dm-mono-light">
              Crystal-clear imaging at your fingertips
            </p>
            <SelectButton onFileSelect={handleFileSelect} />
          </div>
        )}
        {fileSelected && (
          <div
            ref={elementRef}
            className="w-full h-full bg-black mx-auto rounded-xl cornerstone-container"
            style={{ minHeight: "450px" }}
          />
        )}
      </div>
    </div>
  );
}
