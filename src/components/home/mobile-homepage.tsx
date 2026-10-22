import Image from "next/image";
import Link from "next/link";
import { AvailabilityLink, MenuToggle } from "@/components/home/homepage-controls";

export function MobileHomepage() {
  return (
    <div className="homepage-mobile">
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(81,45,70,0.05)]">
        <div className="h-16 px-gutter-mobile flex items-center justify-between">
          <div className="homepage-mobile-brand flex items-center gap-space-sm">
            <Image
              alt="PlanBridge Logo"
              className="h-8 w-auto object-contain"
              src="/images/home/logo.png"
              width="512"
              height="512"
              unoptimized
            ></Image>
            <span className="font-display-lg text-title-md text-primary tracking-tight">
              {"PlanBridge"}
            </span>
          </div>
          <span className="hidden">{"Marketing Home"}</span>
          <div className="homepage-mobile-header-actions">
            <nav className="homepage-auth-actions" aria-label="Account">
              <Link className="homepage-auth-link" href="/login">
                Log in
              </Link>
              <Link className="homepage-auth-link homepage-auth-signup" href="/signup">
                Sign up
              </Link>
            </nav>
            <MenuToggle />
          </div>
        </div>
      </header>
      <main
        className="flex flex-col relative w-full pt-16 pb-20 bg-surface flex-grow"
        id="mobile-main"
      >
        <div className="flex flex-col w-full">
          <details
            className="w-full bg-surface-container-high px-gutter-mobile py-space-md transition-all duration-300"
            id="mobile-navigation"
            open
          >
            <summary className="flex items-center justify-between py-space-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider min-h-[44px]">
              {"Navigation Menu"}
              <span className="material-symbols-outlined faq-chevron" aria-hidden="true">
                {"expand_more"}
              </span>
            </summary>
            <div
              className="flex flex-col gap-space-xs font-label-lg text-label-lg text-on-surface"
              id="mobile-nav-links-container"
            >
              <a
                className="min-h-[44px] flex items-center px-space-sm rounded-lg hover:bg-surface-container-lowest transition-colors"
                href="#mobile-how-it-works"
              >
                {"How it works"}
              </a>
              <a
                className="min-h-[44px] flex items-center px-space-sm rounded-lg hover:bg-surface-container-lowest transition-colors"
                href="#mobile-features"
              >
                {"Features"}
              </a>
              <a
                className="min-h-[44px] flex items-center px-space-sm rounded-lg hover:bg-surface-container-lowest transition-colors"
                href="#mobile-faqs"
              >
                {"FAQs"}
              </a>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <AvailabilityLink
                  className="flex-1 min-h-[44px] flex items-center justify-center rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg transition-colors hover:bg-surface-container"
                  kind="login"
                >
                  {"Log in"}
                </AvailabilityLink>
                <AvailabilityLink
                  className="flex-1 min-h-[44px] flex items-center justify-center rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg transition-colors hover:bg-primary shadow-sm"
                  kind="signup"
                >
                  {"Start planning"}
                </AvailabilityLink>
              </div>
            </div>
          </details>
          <div className="px-gutter-mobile flex flex-col gap-space-xl">
            <section className="flex flex-col pt-space-lg">
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-low shadow-sm mb-3">
                  <span
                    className="material-symbols-outlined text-primary text-[14px]"
                    aria-hidden="true"
                  >
                    {"family_restroom"}
                  </span>
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                    {"One wedding. Everyone in sync."}
                  </span>
                </div>
                <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary leading-tight mb-4">
                  {" Plan your wedding together."}
                  <br />
                  <span className="italic font-normal">{"Enjoy every celebration."}</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                  {
                    " Bring your family, events, tasks, expenses and guest lists together in one shared space—so everyone knows what needs to happen next. "
                  }
                </p>
                <div className="w-full flex flex-col gap-3">
                  <AvailabilityLink
                    className="w-full min-h-[48px] py-3.5 px-space-md rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg text-center flex items-center justify-center shadow-md transition-colors hover:bg-primary"
                    kind="signup"
                  >
                    {" Start planning your wedding "}
                  </AvailabilityLink>
                  <a
                    className="w-full min-h-[48px] py-3.5 px-space-md rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg text-center flex items-center justify-center shadow-sm transition-colors hover:bg-surface-container"
                    href="#mobile-how-it-works"
                  >
                    {" See how it works "}
                  </a>
                </div>
                <p className="w-full text-center font-body-sm text-body-sm text-on-surface-variant mt-3 mb-6">
                  {" Built for couples and the people helping them plan. "}
                </p>
              </div>
              <div className="w-full rounded-2xl overflow-hidden shadow-md mb-6 relative">
                <Image
                  className="w-full h-72 object-cover"
                  src="/images/home/photo-2.png"
                  alt="A candid, warm editorial medium shot of an Indian bride and groom smiling tenderly at each other in festive beige and gold wedding attire in an outdoor courtyard decorated with floral garlands and warm ambient light, surrounded by joyful smiling extended family."
                  width="512"
                  height="384"
                  unoptimized
                ></Image>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex items-end p-space-md">
                  <span className="font-label-caps text-label-caps text-on-primary bg-primary-container/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                    {" Heritage Courtyard · Jaipur "}
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-lowest p-space-md rounded-2xl shadow-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                    {"Example wedding workspace"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-md text-label-md text-on-tertiary-fixed bg-tertiary-fixed px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    {" Live Sync "}
                  </span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary">
                    {"Ananya & Rohan’s wedding"}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {"14 February 2027 · 4 Days · 400 Guests"}
                  </p>
                </div>
                <div className="flex gap-space-xs overflow-x-auto pb-1 no-scrollbar">
                  <span
                    className="px-3 py-1.5 rounded-full font-label-caps text-label-caps bg-surface-container text-on-surface-variant whitespace-nowrap preview-control"
                    aria-label="Illustrative workspace preview"
                  >
                    {"Mehendi"}
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full font-label-caps text-label-caps bg-surface-container text-on-surface-variant whitespace-nowrap preview-control"
                    aria-label="Illustrative workspace preview"
                  >
                    {"Sangeet"}
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full font-label-caps text-label-caps bg-primary text-on-primary whitespace-nowrap shadow-sm preview-control"
                    aria-label="Illustrative workspace preview"
                  >
                    {"Wedding (Active)"}
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full font-label-caps text-label-caps bg-surface-container text-on-surface-variant whitespace-nowrap preview-control"
                    aria-label="Illustrative workspace preview"
                  >
                    {"Reception"}
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <span
                        className="material-symbols-outlined text-secondary text-[20px]"
                        aria-hidden="true"
                      >
                        {"palette"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-title-md text-body-md text-on-surface truncate">
                          {"Finalize invitation design"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Assigned to Mira Kapoor"}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-caps text-label-caps px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container whitespace-nowrap">
                      {"Waiting approval"}
                    </span>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <span
                        className="material-symbols-outlined text-primary text-[20px]"
                        aria-hidden="true"
                      >
                        {"photo_camera"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-title-md text-body-md text-on-surface truncate">
                          {"Confirm photographer"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Studio Luminary Contract"}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-caps text-label-caps px-2 py-1 rounded-full bg-surface-container-highest text-primary whitespace-nowrap">
                      {"In progress"}
                    </span>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <span
                        className="material-symbols-outlined text-secondary text-[20px]"
                        aria-hidden="true"
                      >
                        {"payments"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-title-md text-body-md text-on-surface truncate">
                          {"Photographer advance"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Scheduled installment"}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-caps text-label-caps px-2 py-1 rounded-full bg-surface-container text-primary whitespace-nowrap">
                      {"Due Friday: ₹50,000"}
                    </span>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <span
                        className="material-symbols-outlined text-primary text-[20px]"
                        aria-hidden="true"
                      >
                        {"mark_email_read"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-title-md text-body-md text-on-surface truncate">
                          {"Reception RSVP"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Digital invites delivered"}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-caps text-label-caps px-2 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed whitespace-nowrap">
                      {"126 accepted"}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex flex-col">
              <div className="mb-4">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                  {"Clarity over chaos"}
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary leading-tight">
                  {" Everyone wants to help."}
                  <br />
                  <span className="italic font-normal">{"Give everyone a clear next step."}</span>
                </h2>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs text-error">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {"chat_bubble_outline"}
                    </span>
                    <p className="font-title-md text-title-md text-on-surface">
                      {"“Who is following up with the decorator?”"}
                    </p>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary pl-space-lg">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {"arrow_forward"}
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                      {"Assign a person and a deadline."}
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs text-error">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {"chat_bubble_outline"}
                    </span>
                    <p className="font-title-md text-title-md text-on-surface">
                      {"“Which invitation design did we approve?”"}
                    </p>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary pl-space-lg">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {"arrow_forward"}
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                      {"Keep submissions and decisions together."}
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs text-error">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {"chat_bubble_outline"}
                    </span>
                    <p className="font-title-md text-title-md text-on-surface">
                      {"“Has the photographer’s advance been paid?”"}
                    </p>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary pl-space-lg">
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {"arrow_forward"}
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                      {"See recorded payments and what remains due."}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="bg-surface-container-high p-space-lg rounded-2xl flex flex-col gap-space-lg shadow-sm"
              id="mobile-how-it-works"
            >
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                  {"Methodology"}
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                  {" A shared plan in three simple steps. "}
                </h2>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="flex gap-space-md items-start bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display-lg-mobile text-title-md shrink-0">
                    {" 1 "}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-title-md text-title-md text-primary">
                      {"Create your wedding."}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      {
                        " Add your date and the celebrations you’re planning across each auspicious day. "
                      }
                    </p>
                  </div>
                </div>
                <div className="flex gap-space-md items-start bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-display-lg-mobile text-title-md shrink-0">
                    {" 2 "}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-title-md text-title-md text-primary">
                      {"Invite your family."}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      {
                        " Bring the people helping you into one shared workspace with bespoke access levels. "
                      }
                    </p>
                  </div>
                </div>
                <div className="flex gap-space-md items-start bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-display-lg-mobile text-title-md shrink-0">
                    {" 3 "}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-title-md text-title-md text-primary">
                      {"Plan and track together."}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      {
                        " Assign tasks, review decisions and keep everyone informed without messy message threads. "
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-space-xl" id="mobile-features">
              <div className="flex flex-col gap-space-md">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                    {"Collaboration"}
                  </span>
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                    {" Keep responsibilities clear. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                    {" Give every task an owner, a deadline and a clear next step. "}
                  </p>
                  <ul className="flex flex-col gap-space-xs mt-3 font-body-md text-body-md text-on-surface">
                    <li className="flex items-center gap-space-xs">
                      <span
                        className="material-symbols-outlined text-secondary text-[18px]"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      {" Assign to immediate & extended family "}
                    </li>
                    <li className="flex items-center gap-space-xs">
                      <span
                        className="material-symbols-outlined text-secondary text-[18px]"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      {" Share drafts and sample files for approval "}
                    </li>
                    <li className="flex items-center gap-space-xs">
                      <span
                        className="material-symbols-outlined text-secondary text-[18px]"
                        aria-hidden="true"
                      >
                        {"check_circle"}
                      </span>
                      {" Track progress without daily phone calls "}
                    </li>
                  </ul>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      {"Stationery & Print"}
                    </span>
                    <span className="font-label-caps text-label-caps bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                      {"Proof Round 2"}
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md text-primary">
                    {"Digital Invitation Design v2"}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {"Gold foil e-card proof uploaded by Rohan"}
                  </p>
                  <div className="rounded-xl overflow-hidden shadow-sm mt-1">
                    <Image
                      className="w-full h-36 object-cover"
                      src="/images/home/photo-3.png"
                      alt="A high-end editorial graphic preview of a luxurious Indian wedding digital invitation card displaying refined serif typography with subtle gold motifs on an ivory paper texture."
                      width="512"
                      height="384"
                      unoptimized
                    ></Image>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container">
                      <span className="font-body-sm text-body-sm text-on-surface">
                        {"Submission:"}
                      </span>
                      <span className="font-label-md text-label-md text-primary font-semibold">
                        {"Awaiting Admin Approval"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {"Status:"}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        {"Printing Not Started"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-md">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                    {"Multi-Event Architecture"}
                  </span>
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                    {" Coordinate every celebration. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                    {" Keep each function’s schedule, invitations and guest responses organized. "}
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between pb-space-xs">
                    <span className="font-title-md text-title-md text-primary">
                      {"Malhotra Family (4 Guests)"}
                    </span>
                    <span className="font-label-caps text-label-caps bg-surface-container text-primary px-2.5 py-1 rounded-full">
                      {"RSVP Recorded"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs">
                    <div className="p-space-sm bg-surface-container-low rounded-xl flex flex-col gap-1">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        {"Wedding Ceremony"}
                      </span>
                      <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                          {"check_circle"}
                        </span>
                        <span className="font-label-md text-label-md font-semibold">
                          {"Accepted (4)"}
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {"Traditional attire required"}
                      </span>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded-xl flex flex-col gap-1">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        {"Evening Reception"}
                      </span>
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                          {"cancel"}
                        </span>
                        <span className="font-label-md text-label-md font-semibold">
                          {"Declined (0)"}
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {"Early travel constraints"}
                      </span>
                    </div>
                  </div>
                  <div className="p-space-xs px-space-sm rounded-lg bg-surface-container flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {"Dietary Preference:"}
                    </span>
                    <span className="font-label-md text-label-md text-primary">
                      {"Pure Vegetarian (Jain prep)"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-md">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                    {"Financial Transparency"}
                  </span>
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                    {" Know where the budget stands. "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                    {
                      " See agreed costs, upcoming installments and recorded payments in one place. "
                    }
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        {"Vendor Account"}
                      </span>
                      <h3 className="font-title-md text-title-md text-primary">
                        {"Studio Luminary · Cinematography"}
                      </h3>
                    </div>
                    <span className="font-label-caps text-label-caps bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                      {"Installment 1 of 3"}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-primary w-1/4 h-full"></div>
                    <div className="bg-surface-container-highest w-3/4 h-full"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-space-xs pt-space-xs text-center">
                    <div className="p-space-xs bg-surface-container-low rounded-lg">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        {"Agreed"}
                      </span>
                      <span className="font-title-md text-body-md text-on-surface font-semibold">
                        {"₹2,00,000"}
                      </span>
                    </div>
                    <div className="p-space-xs bg-surface-container-low rounded-lg">
                      <span className="font-label-caps text-label-caps text-tertiary block">
                        {"Recorded Paid"}
                      </span>
                      <span className="font-title-md text-body-md text-primary font-semibold">
                        {"₹50,000"}
                      </span>
                    </div>
                    <div className="p-space-xs bg-surface-container-low rounded-lg">
                      <span className="font-label-caps text-label-caps text-secondary block">
                        {"Outstanding"}
                      </span>
                      <span className="font-title-md text-body-md text-secondary font-semibold">
                        {"₹1,50,000"}
                      </span>
                    </div>
                  </div>
                  <div className="p-space-xs px-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
                    <span
                      className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      {"info"}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {" PlanBridge records payment records; it does not transfer money. "}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-high p-space-lg rounded-2xl flex flex-col gap-space-md shadow-sm">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                  {"Effortless for loved ones"}
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                  {" A simple invitation experience for every guest. "}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                  {
                    " Share the celebration details and collect responses through a link—without asking guests to create an account. "
                  }
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-md flex flex-col items-center text-center gap-space-sm">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                  {"Formal Nuptial Invitation"}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  {"Ananya & Rohan"}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {" Cordially invite you to celebrate the joyous union of their families. "}
                </p>
                <div className="w-full bg-surface-container-low p-space-sm rounded-xl text-left flex flex-col gap-1">
                  <p className="font-label-md text-label-md text-primary font-semibold">
                    {"Main Wedding Ceremony"}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {"Sunday, 14 February 2027 · 4:00 PM onwards"}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {"The Royal Palms Pavilion, Delhi NCR"}
                  </p>
                </div>
                <div className="w-full flex gap-space-sm pt-space-xs">
                  <span
                    className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm preview-control"
                    aria-label="Illustrative workspace preview"
                  >
                    {" Accept "}
                  </span>
                  <span
                    className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg preview-control"
                    aria-label="Illustrative workspace preview"
                  >
                    {" Decline "}
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-center gap-space-md">
                <div className="w-16 h-16 bg-surface-container rounded-xl flex items-center justify-center shrink-0 p-2">
                  <svg
                    className="w-full h-full text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v4h-4v-4zm-4 4h4v4h-4v-4zm4 4h4v4h-4v-4zm-4-8h4v4h-4v-4z"></path>
                  </svg>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {
                    " Guests can also upload wedding photos through a shared link or QR code. Photos appear in the gallery after admin approval. "
                  }
                </p>
              </div>
            </section>
            <section className="flex flex-col gap-space-md" id="mobile-faqs">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider block mb-1">
                  {"Answers"}
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                  {" Frequently asked questions. "}
                </h2>
              </div>
              <div className="flex flex-col gap-space-xs" id="mobile-faq-accordion">
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"Who can help plan our wedding?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon  faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md block font-body-md text-body-md text-on-surface-variant faq-answer">
                    {
                      " Invite family members with their own email accounts so everyone can work from the same plan. "
                    }
                  </div>
                </details>
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"What is the difference between an admin and a manager?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md  font-body-md text-body-md text-on-surface-variant faq-answer">
                    {
                      " Both can manage shared planning and expenses. Admins also manage members and approve submissions and gallery photos. "
                    }
                  </div>
                </details>
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"Can we plan multiple wedding functions?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md  font-body-md text-body-md text-on-surface-variant faq-answer">
                    {
                      " Yes. Organize events such as Mehendi, Sangeet, the wedding ceremony and reception within one wedding. "
                    }
                  </div>
                </details>
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"Do guests need an account?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md  font-body-md text-body-md text-on-surface-variant faq-answer">
                    {" No. Guests can view their invitation and respond through a link. "}
                  </div>
                </details>
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"Can guests see our budget and tasks?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md  font-body-md text-body-md text-on-surface-variant faq-answer">
                    {
                      " No. Guest links provide limited access to invitation, RSVP or photo features—not your planning workspace. "
                    }
                  </div>
                </details>
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"Are uploaded photos visible immediately?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md  font-body-md text-body-md text-on-surface-variant faq-answer">
                    {
                      " No. Gallery photos must be approved by an admin before they appear to gallery viewers. "
                    }
                  </div>
                </details>
                <details
                  className="faq-item bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
                  name="mobile-faq"
                >
                  <summary className="faq-toggle w-full min-h-[48px] p-space-md flex items-center justify-between text-left">
                    <span className="font-title-md text-body-lg text-primary font-semibold pr-2">
                      {"Can we plan from our phones?"}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary transform transition-transform duration-200 faq-icon faq-chevron"
                      aria-hidden="true"
                    >
                      {"expand_more"}
                    </span>
                  </summary>
                  <div className="faq-content px-space-md pb-space-md  font-body-md text-body-md text-on-surface-variant faq-answer">
                    {" Design the experience to work comfortably on mobile as well as desktop. "}
                  </div>
                </details>
              </div>
            </section>
            <section className="bg-primary-container p-space-lg rounded-2xl shadow-xl flex flex-col text-center items-center">
              <h2 className="font-display-lg-mobile text-headline-lg-mobile text-on-primary mb-2">
                {" Make room for the celebration. "}
              </h2>
              <p className="font-body-md text-body-md text-on-primary/90 max-w-xs mb-6">
                {" Give your wedding plans a shared home, and give everyone a clear next step. "}
              </p>
              <AvailabilityLink
                className="w-full min-h-[48px] py-4 px-space-md rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold shadow-md transition-colors hover:bg-surface-container"
                kind="signup"
              >
                {" Start planning your wedding "}
              </AvailabilityLink>
              <p className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider mt-4">
                {" One wedding. Everyone in sync. "}
              </p>
            </section>
          </div>
        </div>
        <footer className="w-full bg-surface-container-low px-gutter-mobile py-space-xl mt-space-xl flex flex-col gap-space-lg shadow-[0_1px_8px_rgba(81,45,70,0.03)]">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <Image
                alt="PlanBridge Logo"
                className="h-6 w-auto object-contain"
                src="/images/home/logo.png"
                width="512"
                height="512"
                unoptimized
              ></Image>
              <span className="font-display-lg text-title-md text-primary tracking-tight">
                {"PlanBridge"}
              </span>
            </div>
            <p className="font-body-md text-body-sm text-on-surface-variant max-w-xs">
              {
                "Modern editorial wedding planning architecture for multifaceted Indian celebrations."
              }
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-space-md gap-y-space-sm font-label-lg text-body-sm text-on-surface-variant">
            <a
              className="py-space-xs transition-colors hover:text-primary"
              href="#mobile-how-it-works"
            >
              {"How it works"}
            </a>
            <a className="py-space-xs transition-colors hover:text-primary" href="#mobile-features">
              {"Features"}
            </a>
            <a className="py-space-xs transition-colors hover:text-primary" href="#mobile-faqs">
              {"FAQs"}
            </a>
            <AvailabilityLink
              className="py-space-xs transition-colors hover:text-primary"
              kind="information"
            >
              {"Contact"}
            </AvailabilityLink>
            <AvailabilityLink
              className="py-space-xs transition-colors hover:text-primary"
              kind="information"
            >
              {"Privacy"}
            </AvailabilityLink>
            <AvailabilityLink
              className="py-space-xs transition-colors hover:text-primary"
              kind="information"
            >
              {"Terms"}
            </AvailabilityLink>
            <AvailabilityLink
              className="py-space-xs transition-colors hover:text-primary font-label-lg text-label-lg text-primary"
              kind="login"
            >
              {"Log in"}
            </AvailabilityLink>
          </div>
          <div className="pt-space-md font-body-sm text-body-sm text-outline">
            <p>{"© PlanBridge Nuptial Technologies. All rights reserved."}</p>
          </div>
        </footer>
      </main>
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(81,45,70,0.06)]">
        <div className="flex justify-around items-center h-16 px-gutter-mobile">
          <a
            aria-current="page"
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] gap-space-xs transition-colors text-primary font-semibold"
            href="#mobile-main"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {"auto_awesome"}
            </span>
            <span className="font-label-caps text-label-caps">{"Overview"}</span>
          </a>
          <a
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] gap-space-xs text-on-surface-variant transition-colors hover:text-on-surface"
            href="#mobile-how-it-works"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {"timeline"}
            </span>
            <span className="font-label-caps text-label-caps">{"Process"}</span>
          </a>
          <a
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] gap-space-xs text-on-surface-variant transition-colors hover:text-on-surface"
            href="#mobile-features"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {"celebration"}
            </span>
            <span className="font-label-caps text-label-caps">{"Features"}</span>
          </a>
          <a
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] gap-space-xs text-on-surface-variant transition-colors hover:text-on-surface"
            href="#mobile-faqs"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {"help"}
            </span>
            <span className="font-label-caps text-label-caps">{"FAQs"}</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
