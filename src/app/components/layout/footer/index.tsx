"use client";

import { useEffect } from "react";
import { renderSocials } from "@/app/components/layout/utils/renderSocials";
import Image from "next/image";

export const Footer = () => {
  useEffect(() => {
    // Add chatbot script dynamically
    const script = document.createElement("script");
    script.defer = true;
    script.type = "module";
    script.src = "https://aichatbot.sendbird.com/index.js";

    const div = document.createElement("div");
    div.id = "aichatbot";
    document.body.appendChild(div);

    window.chatbotConfig = [
      "DE440E09-5C5C-49A7-A842-C1A90344D5C3",
      "5Tn9EKJZJIHVl4Oz4P_Ya",
      {
        apiHost: "https://api-cf-ap-5.sendbird.com",
      },
    ];

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  }, []);

  const handleBotClick = () => {
    // Trigger chatbot popup
    const botElement = document.getElementById("aichatbot");
    if (botElement) {
      botElement.style.display = botElement.style.display === "none" ? "block" : "none";
    }
  };

  return (
    <footer className="footer flex flex-wrap w-[95%] mx-auto gap-2 items-center justify-between py-6 border-t-[1px] border-border mt-12">
      {/* Bot Icon */}
      <button
        onClick={handleBotClick}
        className="bot-icon fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-500"
      >
        🤖
      </button>

      {/* Socials Section */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          <ul className="menu menu-horizontal gap-1">{renderSocials()}</ul>
        </div>
      </nav>
    </footer>
  );
};
