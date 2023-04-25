import "nprogress/nprogress.css";
import { useEffect } from "react";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const TopLoading = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

export default TopLoading;
