import React, { useRef, useState, useEffect } from "react";

interface BrightnessProps {
  onChange?: (value: number) => void;
}

export default function Brightness({ onChange }: BrightnessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const [brightness, setBrightness] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const separator = separatorRef.current;
    if (!container || !separator) return;

    let dragging = false;

    const updatePosition = (x: number) => {
      const styles = getComputedStyle(container);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const contentWidth = container.clientWidth - paddingLeft - paddingRight;
      const separatorWidth = separator.offsetWidth;

      // Clamp x inside content area accounting for separator width
      x = Math.min(Math.max(0, x), contentWidth - separatorWidth);

      // Calculate brightness value (-1 to 1)
      const value = (x / (contentWidth - separatorWidth) - 0.5) * 2;

      setBrightness(value);
      // Position separator with offset by paddingLeft to keep it inside container visually
      separator.style.left = `${x + paddingLeft}px`;

      if (onChange) onChange(value);
    };

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const styles = getComputedStyle(container);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;

      // Calculate mouse x relative to content area (inside padding)
      const contentX = e.clientX - rect.left - paddingLeft;

      updatePosition(contentX);
    };

    const onMouseUp = () => {
      dragging = false;
    };

    // Initialize separator position to center
    const styles = getComputedStyle(container);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const contentWidth = container.clientWidth - paddingLeft - paddingRight;
    const separatorWidth = separator.offsetWidth;
    const initialX = (contentWidth - separatorWidth) / 2;

    separator.style.left = `${initialX + paddingLeft}px`;
    setBrightness((initialX / (contentWidth - separatorWidth) - 0.5) * 2);

    separator.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      separator.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onChange]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between w-64 h-10 px-4 rounded-xl border border-gray-700  text-sm text-white select-none"
      style={{ userSelect: "none" }}
    >
      <span>Brightness</span>

      <div
        ref={separatorRef}
        className="absolute top-1 bottom-1 w-1 bg-gray-500 opacity-75 rounded cursor-ew-resize"
        style={{ left: "50%" }}
        title={`Brightness: ${brightness.toFixed(2)}`}
      />

      <span>
        {brightness >= 0
          ? `${(brightness * 10).toFixed(1)}`
          : `-${(Math.abs(brightness) * 10).toFixed(1)}`}
      </span>
    </div>
  );
}
