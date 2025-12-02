import { LogoName } from "@/constants";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <section className="bg-muted border-t py-5">
      <div className="container flex flex-col items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt={LogoName}
            loading="lazy"
            width={24}
            height={24}
          />
          <span>
            &#169; {new Date().getFullYear()} {LogoName}. All rights reserved.
          </span>
        </div>
        <div>
          Built by{" "}
          <Link href="https://github.com/Ziyad-Mohsen">Ziad Mohsen</Link>.
        </div>
      </div>
    </section>
  );
}

export default Footer;
