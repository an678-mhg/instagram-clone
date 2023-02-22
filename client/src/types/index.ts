import React from "react";

export interface Layout {
  children: React.ReactNode;
}

export interface IconProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

export interface Sidebar {
  icons: Function;
  title: string;
  href: string;
  hiddenIconWhenMobile?: boolean;
}

export interface SignInFormValue {
  email: string;
  password: string;
}
