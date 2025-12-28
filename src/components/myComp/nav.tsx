"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

// import { useIsMobile } from "@/hooks/use-mobile"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



export function Nav() {
//   const isMobile = useIsMobile()

  return (
    <NavigationMenu className="bg-slate-400 w-screen my-4" >
      <NavigationMenuList className="flex-wrap">
        
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Channel</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/channel/ARY">ARY</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/channel/GEO">GEO</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/channel/HUM">HUM</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Year</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/year/2025">2025</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/year/2024">2024</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/year/2023">2023</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/year/2022">2022</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/year/2021">2021</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

         <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">To Vote</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
