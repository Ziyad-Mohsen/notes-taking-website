import Image from "next/image";

interface AuthHeaderProps {
  header: string;
  subtext: string;
}

function AuthHeader({ header, subtext }: AuthHeaderProps) {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      <Image src="/logo.svg" alt="Logo image" height={64} width={64} />
      <div>
        <h1 className="font-semibold text-2xl text-foreground">{header}</h1>
        <p className="text-lg text-muted-foreground">{subtext}</p>
      </div>
    </div>
  );
}

export default AuthHeader;
