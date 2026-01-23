export { metadata } from "@/app/layout";

export default function Home() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Hey,</h1>
        <h2>It&apos;s Sumeet Darekar</h2>
      </div>

      <p className="text-m">
        
        <br />
     
    A security researcher from India with about 1 years of experience in the field. I work full-time in application security and spend my free time doing bug bounties, mainly on <a href="https://hackerone.com/noobstain" target="blank">HackerOne</a>, and hold CEH and CNSP certifications.
<br />   <br />
    I also work on finding issues in open-source codebases to improve my code review skills.
        
        If you want to contact me, let’s contact via{" "}
        <a className="link" href="mailto:noobstain@wearehackerone.com">
          email.
        </a>
      </p>
    </div>
  );
}
