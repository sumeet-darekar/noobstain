"use client";
import { useRef } from "react";

export default function ReconLauncher() {
  const inputRef = useRef<HTMLInputElement>(null);

  // Add base64 encoding function
  function toBase64(str: string) {
    if (typeof window !== "undefined") {
      return window.btoa(unescape(encodeURIComponent(str)));
    }
    return "";
  }

  function launchRecon() {
    const domain = inputRef.current?.value.trim();
    if (!domain) {
      alert("Please enter a domain name");
      return;
    }

    const cleanDomain = domain
      .replace(/^https?:\/\//i, "")
      .replace(/\/.*$/, "");

    const domainNameOnly = cleanDomain.split(".").slice(-2, -1)[0] || cleanDomain.split(".")[0];
    const searchUrls = [
      `https://www.google.com/search?q=site:${cleanDomain}`,
      `https://index.commoncrawl.org/collinfo.json#format=https://index.commoncrawl.org/<id>?url=${cleanDomain}/*`,
      `https://github.com/search?q=${cleanDomain}&type=code`,
      `https://web.archive.org/cdx/search/cdx?url=${cleanDomain}/*&collapse=urlkey&fl=original`,
      `https://www.shodan.io/search?query=hostname:${cleanDomain}`,
      `https://securitytrails.com/domain/${cleanDomain}/dns`,
      `https://search.censys.io/search?resource=hosts&q=${cleanDomain}`,
      `https://crt.sh/?q=${cleanDomain}`,
      `https://intelx.io/?s=${cleanDomain}`,
      `https://otx.alienvault.com/api/v1/indicators/domain/${cleanDomain}/url_list`,
      `https://urlscan.io/api/v1/search/?q=domain:${cleanDomain}&size=10000`,
      `https://fofa.so/result?qbase64=${toBase64(cleanDomain)}`,
      `https://faviconhasher.codejavu.tech/`,
      `https://www.virustotal.com/vtapi/v2/domain/report?apikey=34a90170989b555d1de605607d99bc7242d35674a763fb64abc3eb9ba694c97f&domain=${cleanDomain}`,
      `https://chatgpt.com/?q=Search the web for anything interesting, suspicious, or security-related about the domain ${cleanDomain}. Look for exposed endpoints, API keys, open directories, misconfigured services, GitHub leaks, pastes, archived content, or anything that might be useful for bug bounty hunting or OSINT.`,
      `https://leakix.net/search?scope=service&q=${cleanDomain}`,
      `https://www.zoomeye.ai/searchResult?q=${toBase64(cleanDomain)}`,
      `https://hub.docker.com/search?q=${domainNameOnly}`
    ];

    searchUrls.forEach((url) => {
      window.open(url, "_blank");
    });
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Recon Launcher</h2>
        <h5>
          This tool is a target reconnaissance launcher designed to assist security researchers, bug bounty hunters, and penetration testers in quickly gathering publicly available intelligence about a target domain .
      
        </h5>
      </div>
      <div className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter domain (e.g. example.com)"
          className="input input-bordered w-full font-mono"
        />
        <button
          onClick={launchRecon}
          className="w-full py-2 px-4 rounded font-semibold bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 transition"
        >
          Launch Recon
        </button>
      </div>
      <section className="prose dark:prose-invert mb-6">
        <h3>What this tool does</h3>
        <p>
          When you enter a domain and click <strong>Launch Recon</strong>, this tool will open multiple tabs with searches across various platforms:
        </p>
        <ul>
          <li>Google site search (more on <a href="https://addons.mozilla.org/en-US/firefox/addon/dorkme/" target="blank">DorkMe</a> tool).</li>
          <li>GitHub domain search</li>
          <li>Wayback Machine (historical snapshots)</li>
          <li>Shodan (exposed services)</li>
          <li>SecurityTrails (DNS history and subdomains)</li>
          <li>Censys (certificates and infrastructure)</li>
          <li>crt.sh (certificates)</li>
          <li>IntelX (OSINT search engine)</li>
          <li>AlienVault OTX (threat intelligence)</li>
          <li>Common Crawl (web archive data)</li>
          <li>Phonebook.cz (passive DNS data)</li>
          <li>urlscan.io (domain-level scans and links)</li>
          <li>FOFA (open source threat intelligence)</li>
          <li>Favicon Hasher (hash lookup to detect reused icons across services)</li>
          <li>VirusTotal (domain reputation and security checks)</li>
          <li>ChatGPT (search for any interesting, suspicious, or security-related information)</li>
            <li>LeakIX (search for leaks related to the domain)</li>
            <li>ZoomEye (search for exposed services and vulnerabilities)</li>
          <li>Docker Hub (search for Docker images related to the domain)</li>
        </ul>
        <div className="prose dark:prose-invert mb-6">
          <strong>Note:</strong> Your browser may block pop-ups the first time you use this tool.<br />
          You’ll need to allow pop-ups for this site for the tool to work properly.<br />
          Also, Shodan and FOFA may not show full results unless you’re logged in.<br />
          This tool works best on desktop and may not function fully on mobile browsers.
        </div>
      </section>
      <div className="mt-8 text-sm text-muted text-center">
        This tool was inspired by <a href="https://x.com/rez0__">rez0__</a> <a href="https://josephthacker.com/subdomain_link_launcher" target="black">Subdomain Link Launcher</a>.
      </div>
    </div>
  );
}