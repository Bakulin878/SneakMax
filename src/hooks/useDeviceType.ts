import { useEffect, useState } from "react";

export enum DeviceType {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
}

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const updateWindowSize = () => {
      setDeviceType(getDeviceType);
    };
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);
  return deviceType;
};

export default useDeviceType;

const getDeviceType = () => {
  const width = window.innerWidth;

  if (width < 768) {
    return DeviceType.MOBILE;
  } else if (width > 768 && width < 1024) {
    return DeviceType.TABLET;
  } else {
    return DeviceType.DESKTOP;
  }
};
