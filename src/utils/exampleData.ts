// * This data is for testing purpose. Will be replaced by data coming from Web socket.
import { clock, cog, creditCard, documentReport, home, questionMarkCircle, scale, shieldCheck, userGroup } from "@amoutonbrady/solid-heroicons/outline";
import { statusStyles } from "./styles";

export const primaryNavigation = [
  { name: "Home", href: "#", icon: home, current: true },
  { name: "History", href: "#", icon: clock, current: false },
  { name: "Balances", href: "#", icon: scale, current: false },
  { name: "Cards", href: "#", icon: creditCard, current: false },
  { name: "Recipients", href: "#", icon: userGroup, current: false },
  { name: "Reports", href: "#", icon: documentReport, current: false },
];

export const secondaryNavigation = [
  { name: "Settings", href: "#", icon: cog },
  { name: "Help", href: "#", icon: questionMarkCircle },
  { name: "Privacy", href: "#", icon: shieldCheck },
];

export const people = [
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Super Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Zone Controller",
    title: "Manager",
  },
  {
    name: "ABC Léonard",
    email: "mathy@mail.com",
    role: "Vice President",
    title: "Manager",
  },
  {
    name: "D Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Artist Executive",
    title: "President",
  },
  {
    name: "Manoj Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Designer",
  },
  {
    name: "Mahesh Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Developer",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "XZ Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Lead",
  },
  {
    name: "ZXZX Léonard",
    email: "b@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Artist",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "nv@mail.com",
    role: "Senior Executive",
    title: "Zone Manager",
  },
  {
    name: "Mathys Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Graphics",
  },
  {
    name: "Rajesh Léonard",
    email: "mathy@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
  {
    name: "Mathys Léonard",
    email: "hf@mail.com",
    role: "Senior Executive",
    title: "Manager",
  },
];

export const location = [
  {
    name: "Ahmedabad",
    people: [
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
    ],
  },
  {
    name: "Mumbai",
    people: [
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
    ],
  },
  {
    name: "Delhi",
    people: [
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
    ],
  },
  {
    name: "Bangalore",
    people: [
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
      {
        name: "Mathys Léonard",
        email: "mathy@mail.com",
        role: "Senior Executive",
        title: "Manager",
      },
    ],
  },
];

export const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success" as keyof typeof statusStyles,
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
