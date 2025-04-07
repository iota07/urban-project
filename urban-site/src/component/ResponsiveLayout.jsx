import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileWorkspaceNav from "./MobileWorkspaceNav";

const ResponsiveLayout = ({ children }) => {
  // Detect if the width is larger than 1024px
  const isLargeScreen = useMediaQuery({ minWidth: 1025 });

  // Detect if the device is in landscape mode
  const isLandscape = useMediaQuery({ orientation: "landscape" });

  // Detect if the device is a tablet
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 });

  // Determine the layout
  const shouldUseMobileLayout = isTabletOrMobile && isLandscape;

  return shouldUseMobileLayout || !isLargeScreen ? (
    <>
      {children}
      <MobileWorkspaceNav />
    </>
  ) : (
    <>{children}</>
  );
};

export default ResponsiveLayout;
