"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  src,
  name,
  size = 40,
  className = "",
}: UserAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full bg-accent shrink-0",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src || "/avatars/default-1.jpg"}
          alt={name || "User avatar"}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <span
          className="text-accent-foreground font-semibold"
          style={{ fontSize: size / 2.5 }}
        >
          {name?.split("")[0].toUpperCase()}
        </span>
      )}
    </div>
  );
}
