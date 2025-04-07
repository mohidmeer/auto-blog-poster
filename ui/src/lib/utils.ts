import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getUsername(){

  const token = localStorage.getItem("blogger-api-auth-token")

  return JSON.parse(atob(token!.split(".")[1])).username; // Decode JWT payload


}
