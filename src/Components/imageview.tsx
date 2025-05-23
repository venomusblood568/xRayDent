import { useEffect, useRef, useState } from "react";
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
  rotation,
  hflip,
  vflip,
  invert,
}: {
  brightness: number;
  zoom: number;
  rotation: number;
  hflip: boolean;
  vflip: boolean;
  invert: boolean;
}) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const initialVoiRef = useRef<{
    windowCenter: number;
    windowWidth: number;
  } | null>(null);

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

        const enabledElement = cornerstone.getEnabledElement(element);
        if (enabledElement?.viewport?.scale !== undefined) {
          initialScaleRef.current = enabledElement.viewport.scale;
        }

        const viewport = cornerstone.getViewport(element);
        if (viewport && initialVoiRef.current) {
          viewport.voi.windowCenter = initialVoiRef.current.windowCenter;
          viewport.voi.windowWidth = initialVoiRef.current.windowWidth;
          cornerstone.setViewport(element, viewport);
        }

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
    if (!viewport) return;

    const brightnessRange = initialVoiRef.current.windowWidth * 0.5;
    viewport.voi.windowCenter =
      initialVoiRef.current.windowCenter + brightness * brightnessRange;
    cornerstone.setViewport(element, viewport);
  }, [brightness]);

  // Update zoom scale
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const viewport = cornerstone.getViewport(element);
    if (!viewport) return;

    viewport.scale = (initialScaleRef.current ?? 1) * zoom;
    cornerstone.setViewport(element, viewport);
  }, [zoom]);

  // Update rotation
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const viewport = cornerstone.getViewport(element);
    if (!viewport) return;

    viewport.rotation = rotation;
    cornerstone.setViewport(element, viewport);
    cornerstone.fitToWindow(element);
  }, [rotation]);

  // Flip horizontal and vertical
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const viewport = cornerstone.getViewport(element);
    if (!viewport) return;

    viewport.hflip = hflip;
    viewport.vflip = vflip;
    cornerstone.setViewport(element, viewport);
    cornerstone.fitToWindow(element);
  }, [hflip, vflip]);

  // Invert
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const viewport = cornerstone.getViewport(element);
    if (!viewport) return;

    viewport.invert = invert;
    cornerstone.setViewport(element, viewport);
  }, [invert]);

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
            style={{ minHeight: "450px", minWidth: "100%" }}
          />
        )}
      </div>
    </div>
  );
}
