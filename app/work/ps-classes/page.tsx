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
          area: "Infrastructure",
          detail:
            "Redis for live timer/session state and the rank cache; RabbitMQ decoupling scoring from the submit request.",
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
        "Redis-backed session state, sub-second answer writes",
        "RabbitMQ queue decouples scoring from submission",
        "Distributed lock stops a double-submit from two tabs",
      ]}
      complexity={[
        {
          problem:
            "Concurrent test-takers on a shared test series need a countdown nobody can extend by editing their system clock or letting the tab sit in the background — and with 500+ students starting a series at the same slot time, that timer state can't be a slow round trip to the primary database on every answer.",
          approach:
            "Made the server the source of truth for the timer, backed by Redis: each answer is written to a Redis-held session on selection (sub-second, no DB round trip) and periodically flushed to MongoDB, with the server auto-submitting the attempt once the deadline passes regardless of what the client believes the time is.",
        },
        {
          problem:
            "A flaky connection can make a student hit submit twice from two tabs — scoring the same attempt twice would double-count it in the rank aggregate.",
          approach:
            "A short-lived Redis lock (SETNX-style) on the attempt ID makes the first submit win; the second is rejected as already-processed instead of racing the first into the scoring queue — pessimistic by design, since a submit only happens once and losing a few milliseconds to the lock is cheaper than a corrupted rank.",
        },
        {
          problem:
            "All-India Rank and chapter-wise breakdowns need to reflect every attempt on a series without re-scanning every submission each time a student opens their result.",
          approach:
            "Submitted attempts go on a RabbitMQ queue; a scoring worker consumes them, updates the score/percentile rollup incrementally, and writes the result to Redis so rank and chapter-wise analytics are read from a fast cache instead of computed live per page view.",
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
            { label: "Redis session", note: "Answers, sub-second writes" },
            { label: "Auto-submit", note: "On deadline or manual submit" },
            { label: "RabbitMQ queue" },
            { label: "Scoring worker", note: "Updates Redis rank cache" },
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
      stack={[
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "RabbitMQ",
        "Auth",
        "Razorpay",
      ]}
    />
  )
}
