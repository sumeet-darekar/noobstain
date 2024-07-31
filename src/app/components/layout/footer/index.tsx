"use client";

import { renderSocials } from "@/app/components/layout/utils/renderSocials";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="footer flex flex-wrap w-[95%] mx-auto gap-2 items-center justify-between py-6  border-t-[1px] border-border mt-12">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <ul className="menu menu-horizontal gap-1">{renderSocials()}</ul>
        </div>
      </nav>
    </footer>
  );
};
