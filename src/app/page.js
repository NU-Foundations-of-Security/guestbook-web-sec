"use client";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Auth () {
    const router = useRouter();
    useEffect(() => {
        router.replace("/home");
    })
}