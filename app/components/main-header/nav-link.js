"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname(); // /mesla בודק לי את השם האחרון של הכתובת באתר לדוגמא

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}` //הסימון הזה נותן לי לבצע שני עיצובים ביחד
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
