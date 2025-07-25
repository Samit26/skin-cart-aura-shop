import { ReactNode } from "react";
import MobileHeader from "./MobileHeader";
import MobileBottomNav from "./MobileBottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showCart?: boolean;
}

const MobileLayout = ({
  children,
  title,
  showBackButton,
  onBackClick,
  showCart,
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <MobileHeader
        title={title}
        showBackButton={showBackButton}
        onBackClick={onBackClick}
        showCart={showCart}
      />
      <main className="pb-20 min-h-screen">{children}</main>
      <MobileBottomNav />
    </div>
  );
};

export default MobileLayout;
