import { Accessor } from "solid-js";

export interface navigationProps {
  name: string;
  href: string;
  icon: any;
  current?: boolean;
}

export interface SideBarProps {
  isOpen: Accessor<boolean>;
  primaryNavigation: navigationProps[];
  secondaryNavigation: navigationProps[];
}
