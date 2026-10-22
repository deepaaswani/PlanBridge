import Image from "next/image";
import Link from "next/link";
import { AvailabilityLink } from "@/components/home/homepage-controls";

export function DesktopHomepage() {
  return (
    <div className="homepage-desktop">
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant">
        <div className="h-20 max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <Image
              alt="PlanBridge Logo"
              className="h-8 w-auto object-contain"
              src="/images/home/logo.png"
              width="512"
              height="512"
              unoptimized
            ></Image>
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              {"PlanBridge"}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-space-xl">
            <a
              aria-current="page"
              className="transition-colors text-primary font-bold"
              href="#desktop-how-it-works"
            >
              {"How it works"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              href="#desktop-features"
            >
              {"Features"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              href="#desktop-faqs"
            >
              {"FAQs"}
            </a>
          </nav>
          <nav className="homepage-auth-actions" aria-label="Account">
            <Link className="homepage-auth-link" href="/login">
              Log in
            </Link>
            <Link className="homepage-auth-link homepage-auth-signup" href="/signup">
              Sign up
            </Link>
          </nav>
        </div>
      </header>
      <main
        className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)] max-w-[1200px] mx-auto px-6"
        id="desktop-main"
      >
        <div className="flex flex-col w-full text-on-surface">
          <section className="w-full bg-surface pt-8 pb-16 lg:pb-24">
            <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-6 flex flex-col justify-center space-y-space-md">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                    <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                      {"One wedding. Everyone in sync."}
                    </span>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-[1.12]">
                    {" Plan your wedding together."}
                    <br />
                    <span className="italic font-normal text-primary">
                      {"Enjoy every celebration."}
                    </span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    {
                      " Bring your family, events, tasks, expenses and guest lists together in one shared space—so everyone knows what needs to happen next. "
                    }
                  </p>
                  <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                    <AvailabilityLink
                      className="inline-flex items-center justify-center font-label-lg text-label-lg bg-primary-container text-on-primary hover:bg-primary transition-colors px-7 py-3.5 rounded-xl shadow-sm"
                      kind="signup"
                    >
                      {" Start planning your wedding "}
                    </AvailabilityLink>
                    <a
                      className="inline-flex items-center justify-center font-label-lg text-label-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors px-6 py-3.5 rounded-xl"
                      href="#desktop-how-it-works"
                    >
                      {" See how it works "}
                    </a>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant opacity-80 pt-1">
                    {" Built for couples and the people helping them plan. "}
                  </p>
                </div>
                <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
                  <div className="bg-surface-container rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps tracking-wider uppercase text-on-surface-variant bg-surface-container-lowest px-2.5 py-1 rounded-md">
                        {" Example wedding workspace "}
                      </span>
                      <span className="flex items-center gap-1 font-body-sm text-body-sm text-secondary">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                          {"verified"}
                        </span>
                        {" Verified Workspace "}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-b border-surface-container-highest pb-3">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          {"Ananya & Rohan’s wedding"}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"14 February 2027 · Umaid Bhawan Palace, Jodhpur"}
                        </p>
                      </div>
                      <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                        {" 5 Events Scheduled "}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-label-md font-label-md">
                      <span className="bg-surface-container-lowest text-on-surface-variant px-3 py-1.5 rounded-full whitespace-nowrap cursor-default shadow-xs">
                        {"Mehendi (Feb 12)"}
                      </span>
                      <span className="bg-surface-container-lowest text-on-surface-variant px-3 py-1.5 rounded-full whitespace-nowrap cursor-default shadow-xs">
                        {"Sangeet (Feb 13)"}
                      </span>
                      <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full whitespace-nowrap cursor-default shadow-sm font-semibold">
                        {"Wedding (Feb 14 - Active)"}
                      </span>
                      <span className="bg-surface-container-lowest text-on-surface-variant px-3 py-1.5 rounded-full whitespace-nowrap cursor-default shadow-xs">
                        {"Reception (Feb 15)"}
                      </span>
                    </div>
                    <div className="space-y-2.5 pt-1">
                      <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-label-caps text-label-caps">
                            {" KB "}
                          </div>
                          <div>
                            <p className="font-title-md text-body-md text-on-surface font-medium leading-snug">
                              {"Finalize invitation design"}
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {"Assignee: Kabir (Brother) · Due Feb 20"}
                            </p>
                          </div>
                        </div>
                        <span className="font-label-caps text-label-caps bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded-full whitespace-nowrap">
                          {" Waiting for approval "}
                        </span>
                      </div>
                      <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-label-caps text-label-caps">
                            {" RN "}
                          </div>
                          <div>
                            <p className="font-title-md text-body-md text-on-surface font-medium leading-snug">
                              {"Confirm photographer"}
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {"Assignee: Rohan (Groom) · Due Mar 1"}
                            </p>
                          </div>
                        </div>
                        <span className="font-label-caps text-label-caps bg-surface-container-highest text-on-surface-variant px-2.5 py-1 rounded-full whitespace-nowrap">
                          {" In progress "}
                        </span>
                      </div>
                      <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                            <span
                              className="material-symbols-outlined text-[18px]"
                              aria-hidden="true"
                            >
                              {"payments"}
                            </span>
                          </div>
                          <div>
                            <p className="font-title-md text-body-md text-on-surface font-medium leading-snug">
                              {"Photographer advance"}
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {"Amount: ₹50,000 recorded"}
                            </p>
                          </div>
                        </div>
                        <span className="font-label-caps text-label-caps text-error bg-error-container px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
                          {" Due Friday "}
                        </span>
                      </div>
                      <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                            <span
                              className="material-symbols-outlined text-[18px]"
                              aria-hidden="true"
                            >
                              {"how_to_reg"}
                            </span>
                          </div>
                          <div>
                            <p className="font-title-md text-body-md text-on-surface font-medium leading-snug">
                              {"Reception RSVP tracking"}
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {"180 invited · Grand Ball Room"}
                            </p>
                          </div>
                        </div>
                        <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full whitespace-nowrap">
                          {" 126 accepted "}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center gap-3 bg-surface-container-low p-2.5 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          className="w-full h-full object-cover"
                          src="/images/home/photo-1.png"
                          alt="A warm and joyful Indian couple at their courtyard wedding celebration laughing with extended family, natural golden hour sunlight, marigold flower garlands in the soft background, dressed in elegant ivory and beige traditional attire."
                          width="512"
                          height="384"
                          unoptimized
                        ></Image>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                          {"Collaborative clarity in action"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          {
                            "Coordinating parents, siblings, and 240 guests across 4 days seamlessly."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-16 lg:py-24">
            <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-6">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                  {" Everyone wants to help."}
                  <br />
                  <span className="italic font-normal text-primary">
                    {"Give everyone a clear next step."}
                  </span>
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  {
                    " When responsibilities live in family group chats and personal notes, simple questions become stressful. PlanBridge keeps clarity effortless. "
                  }
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm transition hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-5">
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                        {"person_pin"}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      {" “Who is following up with the decorator?” "}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {
                        " Avoid duplicated efforts or assumed ownership. Every milestone has a designated family lead. "
                      }
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container-high">
                    <span className="font-label-caps text-label-caps text-secondary block mb-1">
                      {"The Resolution"}
                    </span>
                    <p className="font-title-md text-body-md font-semibold text-primary">
                      {"Assign a person and a deadline."}
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm transition hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-5">
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                        {"drafts"}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      {" “Which invitation design did we approve?” "}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {
                        " Eliminate lost attachments across multiple WhatsApp streams and buried email threads. "
                      }
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container-high">
                    <span className="font-label-caps text-label-caps text-secondary block mb-1">
                      {"The Resolution"}
                    </span>
                    <p className="font-title-md text-body-md font-semibold text-primary">
                      {"Keep submissions and decisions together."}
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm transition hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-5">
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                        {"receipt_long"}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 leading-snug">
                      {" “Has the photographer’s advance been paid?” "}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {
                        " Prevent awkward double payments or forgotten deposits during multi-day celebrations. "
                      }
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container-high">
                    <span className="font-label-caps text-label-caps text-secondary block mb-1">
                      {"The Resolution"}
                    </span>
                    <p className="font-title-md text-body-md font-semibold text-primary">
                      {"See recorded payments and what remains due."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="w-full bg-surface-container py-16 lg:py-20 my-6"
            id="desktop-how-it-works"
          >
            <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-6">
              <div className="text-center max-w-xl mx-auto mb-14">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                  {"Effortless Structure"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                  {" A shared plan in three simple steps. "}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col">
                  <div className="font-display-lg text-display-lg text-secondary-fixed-dim font-bold mb-4">
                    {"01"}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    {"1. Create your wedding."}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {" Add your date and the celebrations you’re planning. "}
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col">
                  <div className="font-display-lg text-display-lg text-secondary-fixed-dim font-bold mb-4">
                    {"02"}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    {"2. Invite your family."}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {" Bring the people helping you into one shared workspace. "}
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col">
                  <div className="font-display-lg text-display-lg text-secondary-fixed-dim font-bold mb-4">
                    {"03"}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    {"3. Plan and track together."}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {" Assign tasks, review decisions and keep everyone informed. "}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-16 lg:py-24 space-y-24" id="desktop-features">
            <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-24">
                <div className="lg:col-span-5 space-y-space-sm">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                    {"Accountability"}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    {" Keep responsibilities clear. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    {" Give every task an owner, a deadline and a clear next step. "}
                  </p>
                  <div className="space-y-3 pt-3">
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Assign tasks to family members."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Share files and request approval."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Follow progress without repeated follow-ups."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-surface-container rounded-2xl p-6 shadow-sm">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                          {"Design & Collateral"}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                          {"Digital Invitation Card Design v2"}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full">
                          {" Submission: Awaiting Admin Approval "}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-container-low p-4 rounded-xl">
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">
                          {"Assigned Lead"}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container">
                            {" PS "}
                          </div>
                          <span className="font-label-md text-label-md text-on-surface">
                            {"Priyal (Bride’s Sister)"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">
                          {"Due Date"}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface block mt-1">
                          {"Jan 28, 2027"}
                        </span>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">
                          {"Task Status"}
                        </span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-2 py-0.5 rounded block mt-1 w-max">
                          {" Printing Not Started "}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" aria-hidden="true">
                          {"picture_as_pdf"}
                        </span>
                        <div>
                          <p className="font-title-md text-body-md text-on-surface font-medium">
                            {"ananya_rohan_invite_gold_foil.pdf"}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {"14.2 MB · Uploaded yesterday by Priyal"}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-label-sm text-body-sm text-primary hover:underline font-semibold flex items-center gap-1 preview-control"
                        aria-label="Illustrative workspace preview"
                      >
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                          {"visibility"}
                        </span>
                        {" View File "}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <span
                        className="font-label-md text-label-md px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition preview-control"
                        aria-label="Illustrative workspace preview"
                      >
                        {" Review Submission "}
                      </span>
                      <span
                        className="font-label-md text-label-md px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition shadow-xs preview-control"
                        aria-label="Illustrative workspace preview"
                      >
                        {" Approve Design "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-24">
                <div className="lg:col-span-7 order-2 lg:order-1 bg-surface-container rounded-2xl p-6 shadow-sm">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">
                          {"Guest Attendance Matrix"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Multi-event RSVP tracker filtered by extended family"}
                        </p>
                      </div>
                      <div className="flex gap-1 bg-surface-container p-1 rounded-lg">
                        <span
                          className="px-2.5 py-1 text-label-sm font-label-sm rounded bg-surface-container-lowest shadow-xs text-primary font-semibold preview-control"
                          aria-label="Illustrative workspace preview"
                        >
                          {"All Functions"}
                        </span>
                        <span
                          className="px-2.5 py-1 text-label-sm font-label-sm rounded text-on-surface-variant hover:text-on-surface preview-control"
                          aria-label="Illustrative workspace preview"
                        >
                          {"Mehendi"}
                        </span>
                        <span
                          className="px-2.5 py-1 text-label-sm font-label-sm rounded text-on-surface-variant hover:text-on-surface preview-control"
                          aria-label="Illustrative workspace preview"
                        >
                          {"Wedding"}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-surface-container-high text-on-surface-variant font-label-caps text-label-caps">
                            <th className="py-2.5 px-3">{"Guest Group"}</th>
                            <th className="py-2.5 px-3">{"Mehendi"}</th>
                            <th className="py-2.5 px-3">{"Sangeet"}</th>
                            <th className="py-2.5 px-3">{"Wedding"}</th>
                            <th className="py-2.5 px-3">{"Reception"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-high font-body-sm text-body-sm">
                          <tr>
                            <td className="py-3 px-3">
                              <span className="font-semibold text-on-surface block">
                                {"Vikram & Sunita Malhotra"}
                              </span>
                              <span className="text-on-surface-variant text-[11px]">
                                {"Family · Bride's Side"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-on-surface-variant">{"—"}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-on-surface-variant">{"—"}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Accepted (2)"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Declined"}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-3">
                              <span className="font-semibold text-on-surface block">
                                {"Aarav Sharma"}
                              </span>
                              <span className="text-on-surface-variant text-[11px]">
                                {"Friend · Groom's Side"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-on-surface-variant">{"—"}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Accepted (1)"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Accepted (1)"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Accepted (1)"}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-3">
                              <span className="font-semibold text-on-surface block">
                                {"Meera Sen"}
                              </span>
                              <span className="text-on-surface-variant text-[11px]">
                                {"Aunt · Maternal"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Accepted (2)"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-on-surface-variant">{"—"}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Accepted (2)"}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-label-caps text-label-caps bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full whitespace-nowrap">
                                {"Declined"}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2 space-y-space-sm">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                    {"Events & Attendees"}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    {" Coordinate every celebration. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    {" Keep each function’s schedule, invitations and guest responses organized. "}
                  </p>
                  <div className="space-y-3 pt-3">
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Plan multiple wedding events."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Invite different guests to different functions."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Track responses for each person and event."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-5 space-y-space-sm">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                    {"Financial Clarity"}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    {" Know where the budget stands. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    {
                      " See agreed costs, upcoming installments and recorded payments in one place. "
                    }
                  </p>
                  <div className="space-y-3 pt-3">
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Track estimates and commitments."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"Record payments and receipts."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">
                        {"See what is due and what remains unpaid."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-surface-container rounded-2xl p-6 shadow-sm">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider font-semibold">
                          {"Vendor Commitment"}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">
                          {"Wedding Photography & Cinematography"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Vendor Partner: Studio Luminary"}
                        </p>
                      </div>
                      <span className="font-label-caps text-label-caps bg-surface-container-high text-on-surface px-2.5 py-1 rounded">
                        {"Contract Signed"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 bg-surface-container-low p-4 rounded-xl text-center sm:text-left">
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">
                          {"Agreed Total"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold block mt-0.5">
                          {"₹2,00,000"}
                        </span>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">
                          {"Recorded Paid"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-primary font-semibold block mt-0.5">
                          {"₹50,000"}
                        </span>
                      </div>
                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant block">
                          {"Outstanding"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-error font-semibold block mt-0.5">
                          {"₹1,50,000"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-label-md font-label-md mb-2">
                        <span className="text-on-surface">{"25% Settled"}</span>
                        <span className="text-on-surface-variant">{"Advance Confirmed"}</span>
                      </div>
                      <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden flex">
                        <div className="bg-primary h-full w-1/4 rounded-full"></div>
                        <div className="bg-transparent h-full w-3/4"></div>
                      </div>
                    </div>
                    <div className="space-y-2 text-body-sm font-body-sm border-t border-surface-container-high pt-3">
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-[16px] text-tertiary-container"
                            aria-hidden="true"
                          >
                            {"check_circle"}
                          </span>
                          {" Advance payment: ₹50,000 (Receipt #REC-041 on Jan 10) "}
                        </span>
                        <span className="font-label-caps text-label-caps text-tertiary">
                          {"Verified"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-[16px] text-secondary"
                            aria-hidden="true"
                          >
                            {"pending"}
                          </span>
                          {" Installment 2: ₹1,00,000 due Feb 10 "}
                        </span>
                        <span className="font-label-caps text-label-caps text-secondary">
                          {"Upcoming"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant">
                        <span className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-[16px] text-outline"
                            aria-hidden="true"
                          >
                            {"schedule"}
                          </span>
                          {" Final installment: ₹50,000 due upon delivery "}
                        </span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                          {"On Delivery"}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-surface-container rounded-lg flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-on-surface-variant text-[18px]"
                        aria-hidden="true"
                      >
                        {"info"}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                        {
                          " PlanBridge records payment records and receipts; it does not process financial transfers. "
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface-container py-16 lg:py-20 my-6">
            <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-6">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                  {"Frictionless Hospitality"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 mb-3">
                  {" A simple invitation experience for every guest. "}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  {
                    " Share the celebration details and collect responses through a link—without asking guests to create an account. "
                  }
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
                <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-7 shadow-sm flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="text-center border-b border-surface-container-high pb-6">
                      <div className="w-14 h-14 mx-auto rounded-full bg-surface-container flex items-center justify-center font-display-lg text-headline-sm text-primary mb-2 italic">
                        {" A & R "}
                      </div>
                      <h3 className="font-display-lg text-headline-md text-on-surface">
                        {"Ananya & Rohan"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant tracking-wider uppercase mt-1">
                        {"Together with their families"}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-secondary mt-0.5"
                          aria-hidden="true"
                        >
                          {"calendar_month"}
                        </span>
                        <div>
                          <p className="font-title-md text-body-md text-on-surface font-semibold">
                            {"Sunday, 14 February 2027"}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {"Baraat at 4:00 PM · Pheras at 6:30 PM · Dinner at 8:00 PM"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-secondary mt-0.5"
                          aria-hidden="true"
                        >
                          {"location_on"}
                        </span>
                        <div>
                          <p className="font-title-md text-body-md text-on-surface font-semibold">
                            {"The Grand Courtyard, Umaid Bhawan"}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {"Circuit House Road, Jodhpur, Rajasthan 342006"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-surface-container p-4 rounded-xl space-y-3">
                      <p className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
                        {"Will you celebrate with us?"}
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className="flex-1 py-2.5 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-xs preview-control"
                          aria-label="Illustrative workspace preview"
                        >
                          {" Accept Invitation "}
                        </span>
                        <span
                          className="flex-1 py-2.5 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition preview-control"
                          aria-label="Illustrative workspace preview"
                        >
                          {" Decline with Regrets "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {"Shared private celebration link"}
                    </span>
                    <span
                      className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 hover:underline preview-control"
                      aria-label="Illustrative workspace preview"
                    >
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                        {"photo_library"}
                      </span>
                      {" View Wedding Gallery "}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm space-y-4">
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                      {"Guest Moments"}
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      {"Community photo sharing"}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {
                        " Guests can also upload wedding photos through a shared link or QR code. Photos appear in the gallery after admin approval. "
                      }
                    </p>
                    <div className="bg-surface-container p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                      <div className="w-32 h-32 bg-surface-container-lowest rounded-lg p-2 shadow-xs flex items-center justify-center">
                        <svg
                          className="w-28 h-28 text-primary"
                          fill="currentColor"
                          viewBox="0 0 100 100"
                        >
                          <path d="M10 10h30v30h-30z m10 10v10h10v-10z M60 10h30v30h-30z m10 10v10h10v-10z M10 60h30v30h-30z m10 10v10h10v-10z M50 20h10v10h-10z M60 50h10v10h-10z M80 50h10v20h-10z M50 70h20v10h-20z M80 80h10v10h-10z M50 90h10v10h-10z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md font-semibold text-on-surface">
                          {"Scan to upload guest moments"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Instant upload via smartphone camera"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-on-surface-variant">
                      <span
                        className="material-symbols-outlined text-[16px] text-secondary"
                        aria-hidden="true"
                      >
                        {"security"}
                      </span>
                      <p className="font-body-sm text-body-sm leading-tight">
                        {
                          " Photos submitted require Admin Approval before publishing to public gallery. "
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-high p-5 rounded-2xl flex items-center gap-4">
                    <span
                      className="material-symbols-outlined text-primary text-[28px]"
                      aria-hidden="true"
                    >
                      {"lock_reset"}
                    </span>
                    <div>
                      <p className="font-label-md text-label-md font-semibold text-on-surface">
                        {"Privacy Guaranteed"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {
                          "Your wedding budget, confidential tasks, and contracts are never visible to guests."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-16 lg:py-24" id="desktop-faqs">
            <div className="max-w-[900px] mx-auto px-margin-mobile lg:px-6">
              <div className="text-center mb-12">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                  {"Clarity & Assurance"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                  {" Frequently asked questions "}
                </h2>
              </div>
              <div className="space-y-4" id="desktop-faq-accordion">
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                  open
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">{"Who can help plan our wedding?"}</span>
                    <span
                      className="material-symbols-outlined text-primary transition-transform duration-200  faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md faq-answer">
                    {
                      " Invite family members with their own email accounts so everyone can work from the same plan. "
                    }
                  </div>
                </details>
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">
                      {"What is the difference between an admin and a manager?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md  faq-answer">
                    {
                      " Both can manage shared planning and expenses. Admins also manage members and approve submissions and gallery photos. "
                    }
                  </div>
                </details>
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">{"Can we plan multiple wedding functions?"}</span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md  faq-answer">
                    {
                      " Yes. Organize events such as Mehendi, Sangeet, the wedding ceremony and reception within one wedding. "
                    }
                  </div>
                </details>
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">{"Do guests need an account?"}</span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md  faq-answer">
                    {" No. Guests can view their invitation and respond through a link. "}
                  </div>
                </details>
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">{"Can guests see our budget and tasks?"}</span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md  faq-answer">
                    {
                      " No. Guest links provide limited access to invitation, RSVP or photo features—not your planning workspace. "
                    }
                  </div>
                </details>
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">{"Are uploaded photos visible immediately?"}</span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md  faq-answer">
                    {
                      " No. Gallery photos must be approved by an admin before they appear to gallery viewers. "
                    }
                  </div>
                </details>
                <details
                  className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
                  name="desktop-faq"
                >
                  <summary className="w-full flex items-center justify-between text-left font-headline-sm text-headline-sm text-on-surface ">
                    <span className="">{"Can we plan from our phones?"}</span>
                    <span
                      className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-surface-container-high text-on-surface-variant font-body-md text-body-md  faq-answer">
                    {" Design the experience to work comfortably on mobile as well as desktop. "}
                  </div>
                </details>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface pb-16 lg:pb-24">
            <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-6">
              <div className="bg-primary text-on-primary rounded-3xl py-16 px-8 text-center shadow-md relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-fixed/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <h2 className="font-display-lg text-display-lg text-on-primary">
                    {" Make room for the celebration. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-primary/90 max-w-xl mx-auto">
                    {
                      " Give your wedding plans a shared home, and give everyone a clear next step. "
                    }
                  </p>
                  <div className="pt-2">
                    <AvailabilityLink
                      className="inline-flex items-center justify-center font-title-md text-title-md bg-surface-container-lowest text-primary hover:bg-surface-bright px-8 py-4 rounded-xl font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                      kind="signup"
                    >
                      {" Start planning your wedding "}
                    </AvailabilityLink>
                  </div>
                  <p className="font-label-caps text-label-caps tracking-widest text-secondary-fixed uppercase pt-4 block">
                    {" One wedding. Everyone in sync. "}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low border-t border-outline-variant py-space-xl">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start pb-space-xl border-b border-outline-variant">
            <div className="md:col-span-5 space-y-space-sm">
              <div className="flex items-center gap-space-sm mb-space-xs">
                <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
                  {"PlanBridge"}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                {
                  "One wedding. Everyone in sync. The shared planning workspace for couples and families coordinating Indian weddings."
                }
              </p>
            </div>
            <div className="md:col-span-7 flex flex-wrap gap-x-space-xl gap-y-space-md md:justify-end items-center pt-space-xs">
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                href="#desktop-how-it-works"
              >
                {"How it works"}
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                href="#desktop-features"
              >
                {"Features"}
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                href="#desktop-faqs"
              >
                {"FAQs"}
              </a>
              <AvailabilityLink
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                kind="information"
              >
                {"Contact"}
              </AvailabilityLink>
              <AvailabilityLink
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                kind="information"
              >
                {"Privacy"}
              </AvailabilityLink>
              <AvailabilityLink
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                kind="information"
              >
                {"Terms"}
              </AvailabilityLink>
              <AvailabilityLink
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                kind="login"
              >
                {"Log in"}
              </AvailabilityLink>
            </div>
          </div>
          <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <p className="">
              {"© 2025 PlanBridge Technologies Inc. Crafted for bespoke celebrations."}
            </p>
            <div className="flex items-center gap-space-sm mt-space-sm sm:mt-0">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                {"Warmth & Rigor"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
