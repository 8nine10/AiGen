import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Image from "next/image"
import Link from "next/link"

function Topbar() {
    return (
        <nav className="topbar">
            <Link href='/' className="flex items-center gap-4">
                <Image src='/assets/logoai.jpg' alt='logo' width={35} height={35} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">AIGen</p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src='/assets/logout.svg' alt="logout" width={24} height={24} />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher appearance={{
                    baseTheme: dark,
                }} />
            </div>
        </nav>
    )
}

export default Topbar