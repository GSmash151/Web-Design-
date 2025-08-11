// src/contents/navigation.js
import { IoHome } from "react-icons/io5";
import { IoTvSharp } from "react-icons/io5";
import { ImFilm } from "react-icons/im";
import { IoSearchSharp } from "react-icons/io5";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <IoTvSharp />
  },
  {
    label: "Movies",
    href: "movies",
    icon: <ImFilm />
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <IoHome />
  },
  ...navigation,
  {
    label: "Search",
    href: "/search",
    icon: <IoSearchSharp />,
  }
];