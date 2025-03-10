import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Menu } from "lucide-react";
  import { useState } from "react";
  import { usePathname, useRouter } from "next/navigation";
  import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
  
  interface SideBarItemProps {
    href: string;
    text: string;
    onClick?: () => void;
  }
  
  const SideBarItem = ({ href, text, onClick }: SideBarItemProps) => {
    const router = usePathname();
    const isActive = router === href;
  
    return (
      <Link href={href} onClick={() => onClick ? onClick() : console.log('')}>
        <div
          className={`flex items-center gap-2 p-3 rounded-md cursor-pointer ${
            isActive ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <div className="text-lg font-bold">{text}</div>
        </div>
      </Link>
    );
  };
  
  const SideNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data:session} = useSession()
    const router = useRouter()
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Menu color={"black"} />
        </SheetTrigger>
        <SheetContent className="w-64">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">NUET AI</SheetTitle>
          </SheetHeader>
          <SheetContent className="flex flex-col gap-4">
            <SideBarItem href="/" text="Home" />
            <SideBarItem href="#features" text="Features" />
            <SideBarItem href="#about" text="About" />
            {session ? (
                <SideBarItem href="#" text="logout" onClick={signOut}/>) :
                (<SideBarItem href="/login" text="signIn" />)
            }
          </SheetContent>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default SideNavbar;
  
  