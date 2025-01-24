"use client";

import { useEffect } from "react";
import { renderSocials } from "@/app/components/layout/utils/renderSocials";

export const Footer = () => {
  useEffect(() => {
    // Dynamically add the script for the chatbot
    const div = document.createElement("div");
    div.id = "aichatbot";
    document.body.appendChild(div);

    const script = document.createElement("script");
    script.defer = true;
    script.type = "module";
    script.src = "https://aichatbot.sendbird.com/index.js";

    // Pass chatbot config to the global scope
    window.chatbotConfig = [
      "DE440E09-5C5C-49A7-A842-C1A90344D5C3",
      "5Tn9EKJZJIHVl4Oz4P_Ya",
      {
        apiHost: "https://api-cf-ap-5.sendbird.com",
      },
    ];

    document.body.appendChild(script);
  }, []);

  return (
    <footer className="footer flex flex-wrap w-[95%] mx-auto gap-2 items-center justify-between py-6 border-t-[1px] border-border mt-12">
      {/* Socials Section */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          <ul className="menu menu-horizontal gap-1">{renderSocials()}</ul>
        </div>
      </nav>
    </footer>
  );
};
