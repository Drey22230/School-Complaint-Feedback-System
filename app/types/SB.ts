import { StaticImageData } from "next/image";
export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  plsp: StaticImageData;
};
