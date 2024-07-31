"use client";

import type { Schema } from "./schema";
import type { DataTableFilterField, Option } from "./types";

// export const tagsColor = {
//   science: {
//     badge:
//       "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10",
//     dot: "bg-[#10b981]",
//   },
//   math: {
//     badge:
//       "text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10",
//     dot: "bg-[#0ea5e9]",
//   },
//   literature: {
//     badge:
//       "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10",
//     dot: "bg-[#ec4899]",
//   },
//   history: {
//     badge:
//       "text-[#eab308] bg-[#eab308]/10 border-[#eab308]/20 hover:bg-[#eab308]/10",
//     dot: "bg-[#eab308]",
//   },
// } as Record<string, Record<"badge" | "dot", string>>;


export const tagsColor = {
  science: {
    badge: "badge me-1",
    textColor: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.2)"
  },
  math: {
    badge: "badge me-1",
    textColor: "#0ea5e9",
    bgColor: "rgba(14, 165, 233, 0.1)",
    borderColor: "rgba(14, 165, 233, 0.2)"
  },
  literature: {
    badge: "badge me-1",
    textColor: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
    borderColor: "rgba(236, 72, 153, 0.2)"
  },
  history: {
    badge: "badge me-1",
    textColor: "#eab308",
    bgColor: "rgba(234, 179, 8, 0.1)",
    borderColor: "rgba(234, 179, 8, 0.2)"
  }
} as Record<string, {
  badge: string,
  textColor: string,
  bgColor: string,
  borderColor: string
}>;

export const data = [
  {
    name: "Biology",
    public: true,
    active: true,
    regions: ["HS", "MS", "ES"],
    tags: ["science"],
  },
  {
    name: "Chemistry",
    public: true,
    active: true,
    regions: ["HS", "MS"],
    tags: ["science"],
  },
  {
    name: "Physics",
    public: false,
    active: false,
    regions: ["HS"],
    tags: ["science", "math"],
  },
  {
    name: "Algebra",
    public: false,
    active: true,
    regions: ["HS", "MS"],
    tags: ["math"],
  },
  {
    name: "Geometry",
    public: true,
    active: true,
    regions: ["HS", "MS"],
    tags: ["math"],
  },
  {
    name: "English",
    public: false,
    active: true,
    regions: ["HS", "MS", "ES"],
    tags: ["literature"],
  },
  {
    name: "World History",
    public: true,
    active: true,
    regions: ["HS"],
    tags: ["history"],
  },
  {
    name: "American Literature",
    public: true,
    active: true,
    regions: ["HS"],
    tags: ["literature"],
  },
  {
    name: "Calculus",
    public: true,
    active: false,
    regions: ["HS"],
    tags: ["math"],
  },
  {
    name: "Earth Science",
    public: false,
    active: true,
    regions: ["MS", "ES"],
    tags: ["science"],
  },
  {
    name: "Creative Writing",
    public: false,
    active: true,
    regions: ["HS", "MS"],
    tags: ["literature"],
  },
  {
    name: "Ancient Civilizations",
    public: true,
    active: true,
    regions: ["MS"],
    tags: ["history"],
  },
] satisfies Schema[];

export const filterFields = [
  {
    label: "Public",
    value: "public",
    options: [
      { label: "true", value: true },
      { label: "false", value: false },
    ],
  },
  {
    label: "Active",
    value: "active",
    options: [
      { label: "true", value: true },
      { label: "false", value: false },
    ],
  },
  {
    label: "School Level",
    value: "regions",
    options: [
      { label: "ES", value: "ES" },
      { label: "MS", value: "MS" },
      { label: "HS", value: "HS" },
    ],
  },
  {
    label: "Subject Area",
    value: "tags",
    // REMINDER: "use client" needs to be declared in the file - otherwise getting serialization error from Server Component
    component: (props: Option) => {
      if (typeof props.value === "boolean") return null;
      return (
        <div className="flex w-full items-center justify-between gap-2">
          <span className="truncate font-normal">{props.value}</span>
          <span
            className={`h-2 w-2 rounded-full`}
          />
        </div>
      );
    },
    options: [
      { label: "Math", value: "math" },
      { label: "Science", value: "science" },
      { label: "Literature", value: "literature" },
      { label: "History", value: "history" },
    ],
  },
] satisfies DataTableFilterField<Schema>[];