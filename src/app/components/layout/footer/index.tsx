"use client";

import { renderSocials } from "@/app/components/layout/utils/renderSocials";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="footer flex flex-wrap w-[95%] mx-auto gap-2 items-center justify-between py-6  border-t-[1px] border-border mt-12">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <ul className="menu menu-horizontal gap-1">{renderSocials()}</ul>
          <iframe
src="https://aichatbot.sendbird.com/playground/index.html?app_id=DE440E09-5C5C-49A7-A842-C1A90344D5C3&bot_id=5Tn9EKJZJIHVl4Oz4P_Ya&region=ap-5"
width="100%"
style="height: 100%; min-height: 700px"
frameborder="0"
></iframe>

        </div>
      </nav>
    </footer>
  );
};
