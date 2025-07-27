import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/dashboard" className="block">
      <Image
        src="/home.png"
        alt="Home"
        fill
        priority
        className="object-cover w-full h-[3911px]"
      />
    </Link>
  );
}
