"use client";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const { isSignedIn, user, isLoaded } = useUser()
    return (
        <div>

            <div className="flex justify-between px-8 align-middle items-center ">
                <div className="flex align-middle items-center">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-[38px] w-[38px]"
                            }
                        }} />
                    <h1 className="text-gray-300 text-2xl px-2">{isLoaded ? user?.firstName : "Loading..."}</h1>
                </div>

                <Link href={"/admin/add-event"}>
                    Add Event
                </Link>
            </div>

            {children}
        </div>
    )
}