export { metadata } from "@/app/layout";

export default function Home() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Hey,</h1>
        <h2>It&apos;s Sumeet Darekar</h2>
      </div>

      <p className="text-sm">
        Security student 🙲 Programmer
        <br />
        <br />I am a security professional focused on client-side, API and web related vulnerabilities,
         currently learning Android security. I enjoy identifying and mitigating vulnerabilities-basically,
          I break things to make them stronger (and maybe to impress my cat)
        . 
        <br />
        <br />If you want to contact me, let’s contact via{" "}
        <a className="link" href="mailto:sumeetdarekar2003.com">
          email.
        </a>
      </p>
    </div>
  );
}
