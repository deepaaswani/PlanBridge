"use client";

import { useState } from "react";
import { Icon } from "./icon";

const instructions = [
  {
    title: "First, add your function.",
    text: "Let’s make a space for the Mehendi afternoon.",
    action: "Add Mehendi function",
  },
  {
    title: "Next, share the responsibility.",
    text: "Priya is helping with decorations. Give her this task so everyone knows who’s taking care of it.",
    action: "Assign decorations to Priya",
  },
  {
    title: "Now, keep the decision clear.",
    text: "In this example, Priya has shared a design. Aanya, the assigned family admin, reviews and approves it.",
    action: "Try Aanya’s design approval",
  },
  {
    title: "That’s a shared plan in action.",
    text: "The design is approved and Priya still owns the decoration task. Approval is one step; setting everything up comes next.",
    action: "Try again",
  },
];

export function PlanningExample() {
  const [step, setStep] = useState(0);
  const current = instructions[step];

  return (
    <div className="demo-card">
      <div className="demo-topline">
        <span className="example-tag">Practice example</span>
        <span>{step === 3 ? "All 3 steps explored" : `Step ${step + 1} of 3`}</span>
      </div>
      <ol className="demo-progress" aria-label="Example progress">
        {["Add a function", "Assign a task", "Approve a design"].map((label, index) => (
          <li
            key={label}
            data-reached={step >= index}
            aria-current={step === index ? "step" : undefined}
          >
            <span aria-hidden="true">{step > index ? "✓" : index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="demo-plan" aria-label="Your practice plan">
        <div className="demo-function">
          <span className="story-icon gold">
            <Icon name="calendar" />
          </span>
          <div>
            <p className="small-label">YOUR EXAMPLE FUNCTION</p>
            <h3>{step > 0 ? "Mehendi afternoon" : "A lovely place to begin"}</h3>
          </div>
          {step > 0 && <span className="status-badge">Added</span>}
        </div>
        <div className="demo-task">
          <div>
            <p className="small-label">THE TASK</p>
            <h4>Choose the decorations</h4>
          </div>
          <div className="task-meta">
            <span className="task-owner">
              {step >= 2 ? (
                <>
                  <span className="avatar" aria-hidden="true">
                    P
                  </span>{" "}
                  Assigned to Priya
                </>
              ) : (
                "Not assigned yet"
              )}
            </span>
            <span className={step === 3 ? "status-badge" : "pending-badge"}>
              {step === 3 ? "Design approved" : "To do"}
            </span>
          </div>
        </div>
      </div>
      <div className="demo-instruction" aria-live="polite" aria-atomic="true">
        <h3>{current.title}</h3>
        <p>{current.text}</p>
      </div>
      <button
        className="button demo-button"
        type="button"
        onClick={() => setStep((previous) => (previous + 1) % instructions.length)}
      >
        {current.action}
        <Icon name="arrow" />
      </button>
      <noscript>
        <p>
          This example needs JavaScript. The steps are: add a function, assign a task to a family
          member, then ask the assigned admin to review a design.
        </p>
      </noscript>
    </div>
  );
}
