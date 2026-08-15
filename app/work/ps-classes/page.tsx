import type { Metadata } from "next"

import { CaseStudyPage } from "@/components/case-study"
import { PROJECTS } from "@/lib/content"

const project = PROJECTS.find((p) => p.title === "PS Classes")!

const title = "PS Classes — Case Study"
const description =
  "Pharmacy exam-prep platform for Drug Inspector aspirants. Full-stack work on the timed test engine, chapter-wise analytics, and All-India Rank."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/ps-classes" },
  openGraph: { title, description, url: "/work/ps-classes" },
}

export default function PSClasses(): React.ReactElement {
  return (
    <CaseStudyPage
      project={project}
      liveUrl="https://psclasses.in"
      liveLabel="Visit psclasses.in"
      roleFacts={[
        { k: "Role", v: "Full-stack Developer" },
        { k: "Focus", v: "Test engine & analytics" },
        { k: "Year", v: "2025" },
        { k: "Status", v: "Production" },
      ]}
      overview={
        <p>
          PS Classes is a pharmacy exam-prep platform built around Drug
          Inspector aspirants targeting UPSC and State PSC syllabi. Students
          drill down from exam category to exam to test series, sit timed
          mock tests with real-exam pacing, and see where they rank against
          every other student on that series — alongside a course library and
          a free-trial flow ahead of purchase.
        </p>
      }
      role={
        <p>
          I worked as a full-stack developer on PS Classes, building the
          platform end to end: student auth and free-trial gating, the
          course/test-series catalog with its category → exam → series
          drill-down, the timed test-taking engine itself, and the
          chapter-wise analytics and All-India Rank that get computed once a
          student submits. Payments run through Razorpay for course and
          test-series purchases.
        </p>
      }
      ownership={[
        {
          area: "API & data model",
          detail:
            "Attempt state, answer autosave, and the scoring pipeline that feeds rank and chapter analytics off one submission.",
        },
        {
          area: "Access control",
          detail:
            "Single entitlement middleware gating trial, purchased, and admin access across every test and course route.",
        },
        {
          area: "Frontend",
          detail:
            "Category → exam → series drill-down, the timed test-taking UI, and the result/analytics dashboard.",
        },
      ]}
      highlights={[
        "Server-owned exam timer, not client-trusted",
        "Per-question autosave survives refresh/disconnect",
        "Incremental rank & percentile rollups, not live scans",
        "One entitlement check, reused across every route",
      ]}
      complexity={[
        {
          problem:
            "Concurrent test-takers on a shared test series need a countdown nobody can extend by editing their system clock or letting the tab sit in the background.",
          approach:
            "Made the server the source of truth for the timer: each answer is submitted and persisted as it's chosen, and the server auto-submits the attempt once the deadline passes, regardless of what the client believes the time is.",
        },
        {
          problem:
            "All-India Rank and chapter-wise breakdowns need to reflect every attempt on a series without re-scanning every submission each time a student opens their result.",
          approach:
            "Score and percentile roll up incrementally as each attempt is scored, so rank and chapter-wise analytics are read from a precomputed aggregate instead of computed live per page view.",
        },
        {
          problem:
            "Free-trial students, paying students, and admin-authored content all sit behind the same auth — access needs checking on every test and course request without copy-pasting that check into each route.",
          approach:
            "Centralized the entitlement check (trial vs. purchased vs. admin) in one middleware layer every test/course endpoint routes through, instead of re-implementing access logic per feature.",
        },
      ]}
      flows={[
        {
          title: "Test attempt",
          steps: [
            { label: "Student client", note: "Category → exam → series" },
            { label: "Test session API", note: "Server-owned timer" },
            { label: "Answer store", note: "Autosaved per question" },
            { label: "Auto-submit", note: "On deadline or manual submit" },
            { label: "Scoring & rank aggregator" },
            { label: "Result dashboard", note: "All-India Rank + chapters" },
          ],
        },
        {
          title: "Access control",
          steps: [
            { label: "Request", note: "Test or course route" },
            { label: "Auth" },
            { label: "Entitlement check", note: "Trial / purchased / admin" },
            { label: "Allow", note: "Or 403 → upgrade prompt" },
          ],
        },
      ]}
      shipped={[
        "Category → exam → test-series drill-down browsing with real-exam pacing.",
        "Server-authoritative timed test engine with autosave and auto-submit.",
        "Chapter-wise analytics and All-India Rank per test series.",
        "Course library, student auth, free-trial gating, and Razorpay checkout.",
      ]}
      stack={["Next.js", "Node.js", "Express", "MongoDB", "Auth", "Razorpay"]}
    />
  )
}
