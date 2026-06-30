import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
}

const BrandMark = ({ className }: BrandMarkProps) => {
  return (
    <img
      src={siteConfig.logoUrl}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("h-10 w-auto max-w-[12rem] shrink-0 object-contain", className)}
    />
  );
};

export default BrandMark;
