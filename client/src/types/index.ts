import React from "react";

export interface Layout {
  children: React.ReactNode;
}

export interface IconProps {
  className?: string;
  color: string;
}

export interface Sidebar {
  icons: Function;
  title: string;
  href: string;
}
