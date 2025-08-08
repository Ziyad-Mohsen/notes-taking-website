import { useState } from "react";

interface ColorPickerProps {
  value?: string | null;
  onChange?: (color: string) => void;
  disabled?: boolean;
}

export default function ColorPicker({
  value,
  onChange,
  disabled,
}: ColorPickerProps) {
  const [color, setColor] = useState(value || "#000000");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div
        className="w-4 h-4 rounded border border-zinc-300"
        style={{ backgroundColor: color }}
      />
      <input
        type="color"
        disabled={disabled}
        value={color}
        onChange={handleChange}
        className="w-0 h-0 opacity-0 overflow-hidden"
      />
    </label>
  );
}
