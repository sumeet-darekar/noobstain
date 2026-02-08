"use client";
import { useRef, useState } from "react";

type DorkKey = keyof typeof dorkQueries;

const dorkQueries = {
    basic: 'site:{domain} ext:php inurl:?',
    wildcardOne: 'site:"*<{domain}>*"',
    api: 'site:{domain} inurl:api | site:*/rest | site:*/v1 | site:*/v2 | site:*/v3',
    extensions: 'site:"{domain}" ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:json',
    inurl: 'inurl:conf | inurl:env | inurl:cgi | inurl:bin | inurl:etc | inurl:root | inurl:sql | inurl:backup | inurl:admin | inurl:php site:{domain}',
    errors: 'inurl:"error" | intitle:"exception" | intitle:"failure" | intitle:"server at" | inurl:exception | "database error" | "SQL syntax" | "undefined index" | "unhandled exception" | "stack trace" site:{domain}',
    xss: 'inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:lang= inurl:& site:{domain}',
    redirect: 'inurl:url= | inurl:return= | inurl:next= | inurl:redirect= | inurl:redir= | inurl:ret= | inurl:r2= | inurl:page= inurl:& inurl:http site:{domain}',
    sqli: 'inurl:id= | inurl:pid= | inurl:category= | inurl:cat= | inurl:action= | inurl:sid= | inurl:dir= inurl:& site:{domain}',
    ssrf: 'inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:& site:{domain}',
    lfi: 'inurl:include | inurl:dir | inurl:detail= | inurl:file= | inurl:folder= | inurl:inc= | inurl:locate= | inurl:doc= | inurl:conf= inurl:& site:{domain}',
    rce: 'inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:& site:{domain}',
    upload: 'site:{domain} "choose file"',
    apidocs: 'inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer site:"{domain}"',
    login: 'site:{domain} inurl:signup | inurl:register | intitle:Signup | inurl:admin | inurl:login | inurl:adminlogin | inurl:cplogin | inurl:weblogin | inurl:quicklogin | inurl:wp-admin | inurl:wp-login | inurl:portal | inurl:userportal | inurl:loginpanel | inurl:memberlogin | inurl:remote | inurl:dashboard | inurl:auth | inurl:exchange | inurl:ForgotPassword',
    test: 'inurl:test | inurl:env | inurl:dev | inurl:staging | inurl:sandbox | inurl:debug | inurl:temp | inurl:internal | inurl:demo site:{domain}',
    docs: 'site:{domain} ext:txt | ext:pdf | ext:xml | ext:xls | ext:xlsx | ext:ppt | ext:pptx | ext:doc | ext:docx intext:"confidential" | intext:"Not for Public Release" | intext:"internal use only" | intext:"do not distribute"',
    params: 'inurl:email= | inurl:phone= | inurl:password= | inurl:secret= inurl:& site:{domain}',
    aem: 'inurl:/content/usergenerated | inurl:/content/dam | inurl:/jcr:content | inurl:/libs/granite | inurl:/etc/clientlibs | inurl:/content/geometrixx | inurl:/bin/wcm | inurl:/crx/de site:{domain}',
    disclosed: 'site:openbugbounty.org inurl:reports intext:"{domain}"',
    groups: 'site:groups.google.com "{domain}"',
    // New dorks
    gitFolders: 'inurl:"/.git" {domain} -github',
    backupFiles: 'site:{domain} ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup',
    exposedDocs: 'site:{domain} ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv | filetype:doc | filetype:docx | filetype:xls | filetype:xlsx | filetype:ppt | filetype:pptx | filetype:mdb | filetype:pdf | filetype:sql | filetype:txt | filetype:rtf | filetype:csv | filetype:xml | filetype:conf | filetype:dat | filetype:ini | filetype:log',
    confidential: 'inurl:{domain} not for distribution | confidential | "employee only" | proprietary | top secret | classified | trade secret | internal | private filetype:xls OR filetype:csv OR filetype:doc OR filetype:pdf',
    configFiles: 'site:{domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:env | ext:ini',
    databaseFiles: 'site:{domain} ext:sql | ext:dbf | ext:mdb',
    otherFiles: 'site:{domain} intitle:index.of | ext:log | ext:php intitle:phpinfo "published by the PHP Group" | inurl:shell | inurl:backdoor | inurl:wso | inurl:cmd | shadow | passwd | boot.ini | inurl:readme | inurl:license | inurl:install | inurl:setup | inurl:config | inurl:"/phpinfo.php" | inurl:".htaccess" | ext:swf',
    sqlErrors: 'site:{domain} intext:"sql syntax near" | intext:"syntax error has occurred" | intext:"incorrect syntax near" | intext:"unexpected end of SQL command" | intext:"Warning: mysql_connect()" | intext:"Warning: mysql_query()" | intext:"Warning: pg_connect()"',
    phpErrors: 'site:{domain} "PHP Parse error" | "PHP Warning" | "PHP Error"',
    wordpress: 'site:{domain} inurl:wp-content | inurl:wp-includes',
    projectMgmt: [
        'site:trello.com "{domain}"',
        'site:*.atlassian.net "{domain}"'
    ],
    subdomains: 'site:*.{domain}',
    subSubdomains: 'site:*.*.{domain}',
    directoryListing: '"{domain}" intitle:"index of" "parent directory" | intitle:"index of" "DCIM" | intitle:"index of" "ftp" | intitle:"index of" "backup" | intitle:"index of" "mail" | intitle:"index of" "password" | intitle:"index of" "pub" | intitle:"index of" ".git"',
    gitRepos: [
        'site:github.com "{domain}"',
        'site:gitlab.com "{domain}"',
        'site:bitbucket.org "{domain}"'
    ],
    traefik: 'intitle:traefik inurl:8080/dashboard "{domain}"',
    jenkins: 'intitle:"Dashboard [Jenkins]" "{domain}"',
    openRedirects: 'site:{domain} inurl:redir | inurl:url | inurl:redirect | inurl:return | inurl:src=http | inurl:r=http',
    codeShare: [
        'site:sharecode.io "{domain}"',
        'site:controlc.com "{domain}"',
        'site:codepad.co "{domain}"',
        'site:ideone.com "{domain}"',
        'site:jsdelivr.com "{domain}"',
        'site:codeshare.io "{domain}"',
        'site:repl.it "{domain}"'
    ],
    thirdParty: [
        'site:gitter.im "{domain}"',
        'site:papaly.com "{domain}"',
        'site:productforums.google.com "{domain}"',
        'site:coggle.it "{domain}"',
        'site:ycombinator.com "{domain}"',
        'site:libraries.io "{domain}"',
        'site:npm.runkit.com "{domain}"',
        'site:npmjs.com "{domain}"',
        'site:scribd.com "{domain}"'
    ],
    stackoverflow: 'site:stackoverflow.com "{domain}"',
    pastebinSites: [
        'site:justpaste.it "{domain}"',
        'site:heypasteit.com "{domain}"',
        'site:pastebin.com "{domain}"'
    ],
    apacheStruts: 'site:{domain} ext:action | ext:struts | ext:do',
    linkedinEmployees: 'site:linkedin.com employees {domain}',
    leaks: [
        'site:pastebin.com "{domain}"',
        'site:jsfiddle.net "{domain}"',
        'site:codebeautify.org "{domain}"',
        'site:codepen.io "{domain}"'
    ],
    cloud: [
        'site:s3.amazonaws.com "{domain}"',
        'site:blob.core.windows.net "{domain}"',
        'site:googleapis.com "{domain}"',
        'site:storage.googleapis.com "{domain}"',
        'site:drive.google.com "{domain}"',
        'site:dev.azure.com "{domain}"',
        'site:onedrive.live.com "{domain}"',
        'site:digitaloceanspaces.com "{domain}"',
        'site:sharepoint.com "{domain}"',
        'site:s3-external-1.amazonaws.com "{domain}"',
        'site:s3.dualstack.us-east-1.amazonaws.com "{domain}"',
        'site:dropbox.com/s "{domain}"',
        'site:box.com/s "{domain}"',
        'site:docs.google.com inurl:"/d/" "{domain}"',
        'site:amazonaws.com "{domain}"'
    ],
    jfrog: 'site:jfrog.io "{domain}"',
    firebase: 'site:firebaseio.com "{domain}"',
    securitytxt: 'site:*/security.txt "bounty"'
};

const dorkDescriptions: Record<DorkKey, string> = {
    basic: "Basic PHP endpoints with parameters",
    wildcardOne: "Wildcard subdomain search",
    api: "API endpoints (REST, versioned APIs)",
    extensions: "Sensitive file extensions (logs, configs, backups)",
    inurl: "Sensitive paths in URL (config, admin, backup)",
    errors: "Error messages and stack traces",
    xss: "Potential XSS parameters",
    redirect: "Open redirect parameters",
    sqli: "Potential SQL injection parameters",
    ssrf: "Potential SSRF parameters",
    lfi: "Local File Inclusion parameters",
    rce: "Remote Code Execution parameters",
    upload: "File upload pages",
    apidocs: "API documentation (Swagger, API Explorer)",
    login: "Login, signup, admin, and auth pages",
    test: "Test, dev, staging environments",
    docs: "Confidential documents",
    params: "Sensitive parameter names",
    aem: "Adobe Experience Manager paths",
    disclosed: "Previously disclosed bugs (OpenBugBounty)",
    groups: "Google Groups mentions",
    gitFolders: "Exposed .git folders",
    backupFiles: "Backup files (bkf, bkp, bak, old)",
    exposedDocs: "All exposed document types",
    confidential: "Confidential/proprietary documents",
    configFiles: "Configuration files (xml, conf, ini, etc.)",
    databaseFiles: "Database files (sql, dbf, mdb)",
    otherFiles: "Phpinfo, shells, backdoors, sensitive files",
    sqlErrors: "SQL syntax errors and warnings",
    phpErrors: "PHP parse errors and warnings",
    wordpress: "WordPress files (wp-content, wp-includes)",
    projectMgmt: "Project management (Trello, Atlassian)",
    subdomains: "Subdomains search",
    subSubdomains: "Sub-subdomains search",
    directoryListing: "Directory listing / index of",
    gitRepos: "GitHub, GitLab, Bitbucket repos",
    traefik: "Traefik dashboard exposure",
    jenkins: "Jenkins dashboard exposure",
    openRedirects: "Open redirect vulnerabilities",
    codeShare: "Code sharing sites",
    thirdParty: "Third party sites (npm, scribd, etc.)",
    stackoverflow: "Stack Overflow mentions",
    pastebinSites: "Pastebin-like sites",
    apacheStruts: "Apache Struts files",
    linkedinEmployees: "LinkedIn employee profiles",
    leaks: "Code paste sites (Pastebin, JSFiddle, etc.)",
    cloud: "Cloud storage leaks (S3, Azure, GCS, etc.)",
    jfrog: "JFrog Artifactory leaks",
    firebase: "Firebase database leaks",
    securitytxt: "Security.txt files with bounty programs"
};

export default function GoogleDorkLauncher() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedDorks, setSelectedDorks] = useState<Set<DorkKey>>(new Set(Object.keys(dorkQueries) as DorkKey[]));

    function buildGoogleSearchUrl(query: string, domain: string): string {
        const processedQuery = query.replace(/\{domain\}/g, domain);
        return `https://www.google.com/search?q=${encodeURIComponent(processedQuery)}`;
    }

    function toggleDork(key: DorkKey) {
        const newSelected = new Set(selectedDorks);
        if (newSelected.has(key)) {
            newSelected.delete(key);
        } else {
            newSelected.add(key);
        }
        setSelectedDorks(newSelected);
    }

    function selectAll() {
        setSelectedDorks(new Set(Object.keys(dorkQueries) as DorkKey[]));
    }

    function deselectAll() {
        setSelectedDorks(new Set());
    }

    function launchDorks() {
        const domain = inputRef.current?.value.trim();
        if (!domain) {
            alert("Please enter a domain name");
            return;
        }

        const cleanDomain = domain
            .replace(/^https?:\/\//i, "")
            .replace(/\/.*$/, "");

        const urls: string[] = [];

        selectedDorks.forEach((key) => {
            const query = dorkQueries[key];
            if (Array.isArray(query)) {
                query.forEach((q) => {
                    urls.push(buildGoogleSearchUrl(q, cleanDomain));
                });
            } else {
                urls.push(buildGoogleSearchUrl(query, cleanDomain));
            }
        });

        if (urls.length === 0) {
            alert("Please select at least one dork category");
            return;
        }

        urls.forEach((url) => {
            window.open(url, "_blank");
        });
    }

    const allKeys = Object.keys(dorkQueries) as DorkKey[];

    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Google Dork Launcher</h2>
                <h5>
                    This tool helps security researchers, bug bounty hunters, and penetration testers quickly run Google dorks against a target domain to discover sensitive endpoints, exposed files, and potential vulnerabilities.
                </h5>
            </div>
            <div className="flex flex-col gap-4 max-w-4xl">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter domain (e.g. example.com)"
                    className="input input-bordered w-full font-mono"
                />

                <div className="flex gap-2 mb-2">
                    <button
                        onClick={selectAll}
                        className="py-1 px-3 rounded text-sm font-medium transition"
                        style={{
                            backgroundColor: 'var(--bg-2)',
                            color: 'var(--text)',
                            border: '1px solid var(--border)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--border)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                        }}
                    >
                        Select All
                    </button>
                    <button
                        onClick={deselectAll}
                        className="py-1 px-3 rounded text-sm font-medium transition"
                        style={{
                            backgroundColor: 'var(--bg-2)',
                            color: 'var(--text)',
                            border: '1px solid var(--border)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--border)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                        }}
                    >
                        Deselect All
                    </button>
                    <span className="self-center ml-2" style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                        ({selectedDorks.size} of {allKeys.length} selected)
                    </span>
                </div>

                <div
                    className="dork-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '0.5rem',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        padding: '0.75rem',
                        border: '1px solid var(--border)',
                        borderRadius: '0.5rem',
                        backgroundColor: 'var(--bg-2)',
                    }}
                >
                    {allKeys.map((key) => (
                        <label
                            key={key}
                            className="dork-item"
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                                padding: '0.625rem',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                backgroundColor: selectedDorks.has(key) ? 'var(--bg)' : 'transparent',
                                border: selectedDorks.has(key) ? '1px solid var(--border)' : '1px solid transparent',
                                opacity: selectedDorks.has(key) ? 1 : 0.6,
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedDorks.has(key)}
                                onChange={() => toggleDork(key)}
                                style={{
                                    marginTop: '0.25rem',
                                    accentColor: 'var(--accent)',
                                }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{key}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{dorkDescriptions[key]}</span>
                            </div>
                        </label>
                    ))}
                </div>

                <button
                    onClick={launchDorks}
                    className="w-full py-2 px-4 rounded font-semibold transition"
                    style={{
                        backgroundColor: 'var(--bg-2)',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--border)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                    }}
                >
                    Launch Google Dorks
                </button>
            </div>

            <section className="prose dark:prose-invert mb-6">

                <ul>
                    <li><strong>Sensitive files</strong> - Config files, logs, backups, environment files</li>
                    <li><strong>API endpoints</strong> - REST APIs, Swagger docs, versioned endpoints</li>
                    <li><strong>Vulnerability indicators</strong> - XSS, SQLi, SSRF, LFI, RCE parameters</li>
                    <li><strong>Error pages</strong> - Stack traces, database errors, exceptions</li>
                    <li><strong>Authentication pages</strong> - Login forms, admin panels</li>
                    <li><strong>Cloud storage leaks</strong> - S3 buckets, Azure blobs, Google Cloud Storage</li>
                    <li><strong>Code leaks</strong> - Pastebin, JSFiddle, CodePen</li>
                    <li><strong>Third-party references</strong> - OpenBugBounty, Google Groups</li>
                    <li><strong>CMS-specific paths</strong> - Adobe Experience Manager endpoints</li>
                </ul>
                <div className="prose dark:prose-invert mb-6">
                    <strong>Note:</strong> Your browser may block pop-ups the first time you use this tool.<br />
                    You&apos;ll need to allow pop-ups for this site for the tool to work properly.<br />
                    Google may rate-limit or show CAPTCHAs if too many searches are launched at once.<br />
                    Consider deselecting some categories if you encounter issues.
                </div>
            </section>

        </div>
    );
}
