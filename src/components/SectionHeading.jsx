import React from "react";
import { cn } from "@/lib/utils";
import { formatContainerTitle } from "@/lib/catalogPresentation";

export default function SectionHeading({ title, description, align = "left", className }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">
        {typeof title === "string" ? formatContainerTitle(title) : title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
