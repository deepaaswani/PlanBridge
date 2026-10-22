PlanBridge Product Requirements

> **V1 scope update (22 October 2026):** Email verification is deferred by product decision. Sign-up sends no verification email; users log in immediately with their password. Existing accounts need no verification step. Password recovery remains email-based. This supersedes verification requirements below, including verification prerequisites for wedding creation/joining and workspace access. Email matching and all membership/role checks still apply; an address must not be represented as verified without proof.

Version 1.0 | 19 October 2026 | Product owner: Deepa Aswani

Purpose: define the behaviour, scope and acceptance criteria for a wedding planning SaaS built for couples and their families. This document guides design, development and testing of a working pilot followed by a commercial release.

## Product direction

PlanBridge gives a wedding family one shared record of responsibilities, decisions, spending and guest coordination. Each person signs in separately and collaborates within one wedding. Guests respond and upload photos through limited links without creating accounts.

The first pilot must complete the planning loop: create a wedding, invite family, create functions, assign tasks, submit work and record an admin decision. The commercial release extends that foundation with finances, guests, publishing, photos and paid packages.

## Problem and outcome

The target problems are unclear responsibility, missed deadlines, delayed design approvals, uncertainty about vendor payments, and fragmented guest attendance records. Success means multiple family members use PlanBridge to update real work and make decisions without the creator manually maintaining every record.

## Release boundaries

| **Stage**           | **Required scope**                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P Working pilot     | Accounts, wedding setup, memberships, functions, tasks, attachments, approvals, dashboard and essential notifications.                                            |
| C Commercial launch | All P features plus expenses, vendor records, guests, email invitations, RSVP, three website themes, moderated photos, package purchase and operational controls. |
| L Later release     | Curated photographer and event-manager discovery.                                                                                                                 |
| F Future roadmap    | Planner portfolio workspaces, multiple weddings per account, private planner finances and WhatsApp integration.                                                   |

P and C requirements are mandatory for their respective releases. Newly specified edge-case behaviour is a proposed implementation default in this PRD, not a claim that every detail has already been approved. Commercial values still requiring decisions are listed at the end.

## Explicit exclusions

Native live streaming, vendor booking or payouts, vendor self-service accounts, native mobile apps, a full invitation design editor, advanced seating, accommodation and transport management are outside this release. No AI feature is required.

# 1 Users and access

Primary users are the couple and participating family members. Manager means family collaborator, not professional event manager. Guests have limited link access and are not members.

| **Capability**                            | **Admin**      | **Manager** | **Guest**      |
| ----------------------------------------- | -------------- | ----------- | -------------- |
| View and edit planning records            | Yes            | Yes         | No             |
| View and record all wedding expenses      | Yes            | Yes         | No             |
| Manage guest lists and send invitations   | Yes            | Yes         | No             |
| Edit and publish guest website            | Yes            | Yes         | No             |
| Invite or remove members and assign roles | Yes            | No          | No             |
| Decide assigned planning approvals        | Assigned admin | No          | No             |
| Moderate gallery submissions              | Yes            | No          | No             |
| Upload photos                             | Yes            | Yes         | Upload link    |
| RSVP and view relevant guest content      | Can manage     | Can manage  | Household link |
| Billing and whole-wedding deletion        | Owner only     | No          | No             |

## ACC-01 Membership permissions P

Enforce the permission matrix on the server for records, files, exports and notifications. One active wedding membership per account at launch; keep users separate from wedding memberships. The creator is the first admin and designated owner.

**Acceptance:** A manager calling an admin endpoint is denied. A member of wedding A cannot access wedding B by changing an identifier. A second-wedding invitation is blocked with a clear explanation; no automatic transfer occurs.

## ACC-02 Safe membership changes P

Only admins can invite, remove or change roles. The owner cannot be removed or demoted until ownership is transferred to an existing admin who accepts. Never allow zero admins. Proposed default: only the current owner initiates ownership transfer.

**Acceptance:** Permission removal takes effect on subsequent requests and pending invitations can be revoked. Outstanding assignments remain visible as requiring reassignment. Approval requests assigned to a removed or demoted admin cannot be decided by that person.

Removing a member preserves their authorship and decision history. Removing an account from a wedding does not delete shared wedding records. An admin may approve their own submission in this family workflow; the activity history identifies both actions.

# 2 Product model and record rules

Wedding is the tenant and ownership boundary. Each child record belongs to exactly one wedding, directly or through a validated parent. Records must not reference another wedding's members, functions, vendors or guests.

| **Entity**                | **Relationship and purpose**                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| User and membership       | User has a wedding membership carrying Admin or Manager role; wedding records its designated owner.                          |
| Wedding and function      | Wedding has many functions; tasks and expenses may be wedding-wide or linked to one function.                                |
| Task and submission       | Task has one accountable member, comments and files; versioned submissions carry decision requests.                          |
| Approval request          | Belongs to a task submission or proposed expense commitment; references one admin and an immutable submission snapshot.      |
| Vendor and expense        | Wedding-local vendor may have many expenses; expense has estimated and agreed amounts plus installments and payment records. |
| Household and guest       | Household contains individual guests; one guest belongs to one household within a wedding.                                   |
| Invitation and RSVP       | One unique guest–function invitation; RSVP belongs to that invitation. A household link groups permitted responses.          |
| Website and theme         | Wedding has one guest site with draft and published content, selected theme and limited guest-facing fields.                 |
| Photo submission          | Belongs to wedding, optionally function; tracks uploader-provided name, storage asset and moderation state.                  |
| Package and entitlement   | Package defines commercial terms; purchase activates a wedding entitlement. Billing is separate from vendor payments.        |
| Activity and notification | Activity records mutations; notifications point authorised recipients to the relevant record.                                |

## Shared invariants

Use Asia/Kolkata as the proposed wedding timezone default; display function and deadline times consistently. INR is the proposed launch currency, stored with exact decimal precision. Store timestamps consistently and preserve original actor identities in history.

Never silently overwrite concurrent changes. Detect stale edits and ask the member to refresh or resolve the conflict. Destructive changes require confirmation and preserve meaningful history. Linked records must not disappear through accidental cascading deletion.

Operational defaults: archive referenced functions and vendors rather than deleting their history; hide archived items from new selections. Unreferenced draft items may be deleted. This is product behaviour; database tables and technology choices belong in the technical design.

# 3 Accounts onboarding and functions

## AUTH-01 Email accounts P

Provide sign-up, email verification, sign-in, sign-out and password recovery. Proposed default: email and password authentication through a managed identity service. Invitations require sign-in using the invited email.

**Acceptance:** Duplicate accounts for the same normalised email are prevented. Verification and reset links expire and cannot be reused. Failed sign-in does not reveal whether a private wedding account exists.

## INV-01 Family invitation P

Admin enters email and role. Show pending, accepted, expired and revoked states; support resend and revoke. Proposed link validity is seven days. Resending invalidates the older link. Sending is an explicit admin action.

**Acceptance:** Accepting a valid invitation creates one membership in that wedding without creating another wedding. Repeated acceptance is safe. A revoked or expired link grants no access. Existing active membership in another wedding prevents acceptance.

## WED-01 Create and edit wedding P

Collect couple names, city, timezone and wedding date or date-not-decided. Budget and cover image are optional initially. Setup can be saved and resumed. Invite members after the wedding exists.

**Acceptance:** Creator sees the dashboard even with no functions or tasks. Missing optional information does not block setup. An unknown wedding date shows no misleading countdown. Dates display in the wedding timezone.

## FUN-01 Multiple functions P

Create custom functions or start from editable names such as Haldi, Mehendi, Sangeet, ceremony and reception. Fields include name, description, date/time or undecided, optional end time, venue, address/map link, responsible member and guest instructions.

**Acceptance:** End time cannot precede start time. Overlapping functions trigger a warning rather than a block. Function edits update current planning views. Archiving a referenced function preserves its linked records and flags affected website or guest information for review.

## DASH-01 Action dashboard P then C

P displays wedding countdown, upcoming functions, my tasks, overdue tasks and pending approvals. C adds budget/commitment/payment summaries, upcoming installments, invitation/RSVP counts and admin moderation counts. Provide direct navigation to the underlying records.

**Acceptance:** Counts respect archived/cancelled records and the current member's permissions. A task is overdue only when its deadline has passed and it is neither Done nor Cancelled. Empty states provide the relevant next action.

## Happy path

Creator verifies email, creates the wedding and adds functions. An admin invites relatives as managers. Each relative accepts with their own email and immediately sees shared planning information and their assigned work. No billing action is required of invited family members.

# 4 Tasks submissions and approvals

## TASK-01 Task planning P

Create, edit, assign, filter and cancel tasks. Fields: title, description, optional function, one accountable owner, priority, due date/time and approval-required flag. Allow unassigned tasks but expose them clearly. Progress states are To do, In progress, Done and Cancelled.

**Acceptance:** Both roles can update progress. Filters combine owner, function, status and due date. A task requiring approval cannot become Done without an approved current submission. Cancelled tasks stop reminders and remain in history.

## TASK-02 Comments and attachments P

Members comment and attach supported images or PDFs to tasks. Preserve uploader and timestamp. Submission versions reference fixed files and text rather than a mutable file link. Apply size/type limits and authenticated file access.

**Acceptance:** Uploading a new design creates a new version and never changes a previously approved version. Unsupported files fail with a clear message. Failed uploads do not create usable broken attachments.

## APR-01 Request and decide approval P

A member submits the current version to one admin. States are Awaiting approval, Approved, Changes requested and Withdrawn; no request is represented as Not requested. Only the currently assigned admin may decide. Any admin can reassign with history.

**Acceptance:** An assigned admin can approve or request changes with a comment. A manager cannot decide. The record retains version, actor and decision time. Changing assignee does not alter previous decisions. Duplicate decision requests do not produce conflicting outcomes.

## APR-02 Revision and completion P

A revised submission creates a new approval request and supersedes the prior active request. Editing the submitted scope, files or proposed amount invalidates approval for the new version. Assignment or due-date edits alone do not invalidate content approval.

**Acceptance:** After changes are requested, the owner can revise and resubmit. A changed approved deliverable cannot remain Done without an explicit reopening/reapproval flow. Historical approvals remain visible against their original versions.

## Example acceptance scenario

A manager submits invitation design V1 to Admin A. Admin A requests changes. V2 is submitted and approved. The task remains In progress until printing/distribution work is complete. If V3 changes the design, V2's approval is retained as history but cannot authorise V3.

## Scope boundary

No mandatory multi-admin voting, dependency engine or automated task templates are required at launch. Manual tasks and one accountable owner keep responsibility clear. Proposed default: approval flags on tasks with submission history can only be removed by an admin, with a recorded reason.

# 5 Expenses vendors and payments

## VEN-01 Wedding vendor records C

Both roles add vendors with name, category, contact information, notes, documents, linked functions and booking status. Proposed statuses: Considering, Contacted, Booked and Cancelled. No vendor account is required.

**Acceptance:** A manually added vendor can be linked to multiple wedding expenses. Archiving the vendor preserves prior expenses. No other wedding can access its private contact notes or documents.

## FIN-01 Budget and commitments C

Set overall wedding budget. Expenses include category, optional function/vendor, estimate, agreed amount, description and attachments. Both roles see and edit all expenses. Approval of proposed commitments is optional and uses a versioned amount/scope snapshot.

**Acceptance:** Routine entries need no approval. An unapproved proposal is not counted as an agreed commitment. Explicitly accepting an amount without approval records that action. A changed amount on an approval-controlled commitment requires fresh approval.

## FIN-02 Installments and payment records C

Define installment amount and due date. Record actual payments with payer, amount, date, method/reference and receipt; allocate payments to installments when applicable. These are records, not money transfers.

**Acceptance:** Partial payments reduce the unpaid installment amount. Recording payment twice is prevented for a retried request. Payers can be named even when they have no membership. Corrections and refunds retain an audit trail rather than silently erasing the original payment.

| **Metric**                | **Calculation**                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Committed total           | Sum of active agreed amounts; exclude cancelled entries and unapproved proposals.                                   |
| Forecast total            | For each active expense use agreed amount if present, otherwise estimate; sum once per expense.                     |
| Net paid                  | Recorded payments less recorded refunds/reversals.                                                                  |
| Outstanding               | Agreed amount minus net paid; show negative balances as overpayment/credit, not zero.                               |
| Forecast budget remaining | Overall budget minus forecast total; may be negative.                                                               |
| Overdue installments      | Unpaid portion of installments whose due dates have passed; do not equate all outstanding money with overdue money. |

Example: a photographer estimate of INR 180,000 becomes an agreed INR 200,000. A recorded INR 50,000 advance produces INR 200,000 committed, INR 50,000 net paid and INR 150,000 outstanding. The estimate is not added again.

Acceptance: totals use exact monetary arithmetic; currency is consistent. Warn when installment totals differ from the agreed amount. Cancelling a booking retains paid amounts and flags any refund or remaining settlement for explicit recording. No automated tax advice or family settlement ledger is included.

# 6 Guest records and RSVP

## GST-01 Households and individuals C

Create household groups with a primary contact and named individual guests. Store contact details, side/custom group, adult/child classification and optional dietary notes. Invite individual members to selected functions. Allow placeholder household members until names are known.

**Acceptance:** Each guest–function pair has at most one invitation. A household response cannot add unallocated people or access uninvited functions. Members may update invited headcounts explicitly. No public guest search or guest directory is exposed.

## GST-02 Spreadsheet import and export C

Provide a documented CSV template and import preview with field mapping, row-level errors and duplicate warnings. Export guests, invitation selections and responses. Match duplicates cautiously; never merge solely on a shared name.

**Acceptance:** Invalid rows are identified before commit. Users can correct or exclude them. Repeating the same import does not silently duplicate all records. Exports contain only the current wedding and safely escape spreadsheet formulas in text fields.

## RSVP-01 Household response without login C

Generate an unguessable, revocable household link. Show only the household's invited people and functions. Per-person/per-function states are No response, Accepted and Declined. Submit with a confirmation and allow later edits.

**Acceptance:** One person may accept the ceremony and decline reception. Partial household answers leave untouched guests as No response. Repeated submission updates existing responses rather than adding attendance. Another household's identifiers cannot be substituted to access its data.

## RSVP-02 Organiser corrections and totals C

Admins and managers may record phone responses or corrections. Identify whether a response came through a household link or from a member. Count confirmed individuals, with adult/child breakdown where supplied.

**Acceptance:** Function totals are calculated from individual invitation responses, not household count. Removing an invitation excludes it from current counts but retains history. Changing an event's time does not automatically reset RSVPs; members see a prompt to review communication.

## Guest access boundary

Possession of a household link permits that household's response actions. It is not verified identity and can be forwarded. State this clearly in organiser settings. Revoking or regenerating a link disables the prior link. Wedding planning, finances, family account details and other households remain inaccessible.

## Edge cases

Guests without email can be added and tracked manually. Email invitations are optional per household. No extra guest account is created. Plus-ones must be represented as allocated guest slots; unrestricted attendee entry is outside launch scope.

# 7 Guest website and email invitations

## WEB-01 Three prebuilt themes C

One shared content model supports three fixed layouts, with selectable styling and editable text/images. Include couple names, welcome, cover image, wedding date, relevant function schedule, venue links, uploaded invitation, RSVP entry and approved gallery access.

**Acceptance:** Switching themes preserves content and invitation permissions. All three support mobile widths and accessible form controls. Preview uses the same visibility rules as the published view. No arbitrary script or HTML editing is exposed.

## WEB-02 Publish and audience control C

Admins and managers edit a draft and explicitly publish it. Generic wedding links show only deliberately published common information. Household links show functions assigned to that household. Guest-facing fields are allowlisted separately from internal notes.

**Acceptance:** Draft edits do not appear before publication. An uninvited function is absent from both the household screen and its network response. Unpublishing removes public site access. Link-only pages request no search indexing; this is not a security guarantee.

## MAIL-01 Send guest invitations C

A member selects households, previews the email and explicitly sends. Include the personalised household link and relevant invitation content. Show queued, sent/provider-accepted and failed states; show delivered only when reliable provider evidence exists.

**Acceptance:** A provider accepting an email is never labelled Read. Retries avoid duplicate sends for the same operation. Sending failures remain visible with a retry action. Missing/invalid addresses are flagged without blocking valid recipients.

## MAIL-02 Guest reminders C

Provide a filtered view of nonresponding invitations and user-initiated reminder sending. Proposed launch default: no automatic guest reminder campaign. Recheck response state when a reminder is sent and honour email opt-out/suppression records.

**Acceptance:** Guests who have answered all invited functions are excluded. Partially responding households receive reminders only for outstanding responses. Unsubscribing from optional reminders does not delete RSVP records. Revoked links are never used in new emails.

## Publication and invitation independence

Publishing the site does not send invitations. Changing function details does not silently send a bulk email. The member reviews affected guests and chooses whether to send an update. Members can copy a household link for manual sharing; this is not a WhatsApp integration.

Digital invitation means uploading an image or PDF, not an in-product card designer. The guest site is free to view and respond to; the wedding owner pays for the planning package.

# 8 Photo uploads and moderation

## PHO-01 Upload link and QR code C

Generate a wedding-specific upload link and downloadable QR code pointing to it. Guests upload without login; members upload from their workspace. Allow multiple images, optional name and optional function association.

**Acceptance:** The QR opens the upload page on mobile. Guests receive per-file progress and success/failure feedback. They cannot browse pending submissions or access planning records. Duplicate retries do not consume storage twice.

## PHO-02 Validate and hold submissions C

All uploads, including those by organisers, start Pending. Validate actual file type, file size, wedding storage allowance and upload rate; accepted launch formats are proposed as JPEG, PNG and WebP. Sanitise processed images and strip location metadata from shared derivatives.

**Acceptance:** An unsupported or oversized file is rejected before publication with an actionable explanation. Reaching storage allowance stops new uploads without deleting existing files. Pending originals and derivatives are inaccessible through guest gallery endpoints.

## PHO-03 Admin moderation C

Admins can approve, reject and remove photos individually or in selected batches. Managers can see the moderation state but cannot publish photos. Record moderator, time and decision.

**Acceptance:** Only Approved photos appear in the gallery. Rejected photos remain unavailable to guests. Removing an approved photo removes its gallery access, including invalidating cached access as designed. Concurrent admin actions produce one final state and preserved history.

## PHO-04 Link control and gallery C

Provide separate upload and gallery access scopes. Admins can disable/regenerate the upload link; the regenerated QR uses the new link. Gallery is accessible through the wedding link and requests no indexing.

**Acceptance:** An old upload link cannot accept further files after revocation. Revocation does not erase existing photos. Gallery viewers cannot derive pending photo access from sequential identifiers. Unpublishing the gallery disables its share view.

## Guest expectations

Explain on the upload page that submitted images are reviewed and may be shared with people who have the wedding link. Provide a contact/removal route. The gallery is not confined to verified invitees because link possession is the access mechanism; function invitations do not imply photo-level audience restrictions.

## Launch decisions

Per-file size, upload batch size, storage quota and retention period must be configured before paid launch. No unlimited photo storage promise is permitted. Video uploads, face recognition, native livestreaming and photo-selling workflows are excluded.

# 9 Notifications history and navigation

## NOT-01 Targeted notifications P then C

P provides in-app task assignments, approval requests and decisions, plus account/member invitation email. C adds opt-in email reminders for approaching task deadlines, upcoming unpaid installments and relevant guest delivery failures. Admins see moderation workload in-app.

**Acceptance:** Only authorised recipients receive details and links. No full-family email is sent for every edit. Reminder jobs recheck completion/payment and membership before sending. Retries are deduplicated and notification failure does not roll back saved work.

## HIS-01 Activity history P

Record actor, timestamp, record, action and relevant before/after values for member changes, task assignments, deadlines, submissions and approvals. Extend to finances, RSVP corrections, publishing and moderation in C.

**Acceptance:** Members cannot rewrite historical decisions. Removal of a member preserves attribution. Secrets and bearer tokens are never recorded in activity text. History distinguishes family-member actions from unauthenticated household-link responses.

## NAV-01 Workspace navigation P then C

P navigation contains Overview, Functions, Tasks, Approvals and Members/Settings. C adds Expenses, Vendors, Guests, Guest website and Photos. Billing appears to the owner. Task files and comments remain inside task details.

**Acceptance:** A member can reach an overdue task or pending approval directly from the dashboard. Mobile navigation exposes the same essential actions without a desktop-only workflow. Admin controls are absent for managers and still protected by server checks.

## Empty error and loading states

Every main screen needs a useful empty state, loading feedback and recoverable failure state. Failed forms preserve entered values. Errors identify the field or operation that failed. Long imports, uploads and sends expose progress and completion summaries rather than freezing the page.

## Proposed notification defaults

Task and payment email reminder timing is configurable and initially off until enabled by the recipient. Guest reminders require a member's explicit send action. Critical account security messages remain separate from optional planning emails. Moderation reminders may be batched to avoid one email per photo.

Email providers and background-job infrastructure are implementation dependencies. Their selection does not change the requirement to track failures, avoid duplicate sends and maintain recipient scope.

# 10 Packages billing and wedding lifecycle

## BILL-01 Wedding package purchase C

Offer a one-time wedding package as the initial business hypothesis. Display price, duration, feature limits, storage and email allowances before checkout. Only the owner purchases/manages it; invited members and guests are not individually charged.

**Acceptance:** Entitlements activate only after trusted payment confirmation. Browser redirects alone cannot activate a plan. Duplicate payment notifications create one purchase/entitlement. Failed or abandoned checkout leaves an accurate state and offers retry.

## BILL-02 Entitlement and usage enforcement C

Apply configured feature and usage limits on the server. Show usage, approaching limits and the effect of expiry. Retain billing records separately from wedding expense records. Refunds, cancellations and manual adjustments must be traceable.

**Acceptance:** Exceeding a limit blocks only the relevant operation and explains the remedy. Package changes do not silently delete data. Only the owner accesses billing actions; ordinary members see relevant usage restrictions without payment credentials.

## LIFE-01 Expiry and export C

Proposed expiry default: planning becomes read-only, new uploads and outbound invitations pause, and the owner retains export access during a disclosed retention window. Existing RSVP/site/gallery access needs a published end date. Notify the owner before expiry and deletion.

**Acceptance:** A test-expired wedding cannot create new tasks or uploads. Stored content is not immediately deleted at expiry. Expiry notices and UI agree with the purchased terms. Exact durations are a launch decision, not hard-coded assumptions.

## LIFE-02 Close transfer and delete C

Only the designated owner may request whole-wedding deletion after explicit confirmation and recent authentication. Admins may manage ordinary records. Ownership transfer requires acceptance by another existing admin; the previous owner remains an admin unless separately changed.

**Acceptance:** Deletion disables member and guest access and schedules removal according to the disclosed policy. Financial/legal records requiring retention are handled under the published policy. Ownership transfer leaves exactly one owner and cannot strand billing control.

## OPS-01 Service operations C

Provide restricted product-operator tools to inspect wedding status, entitlements, usage and email/upload failures. Log support actions; minimise access to customer content. Establish backup, restore, incident and deletion procedures.

**Acceptance:** A restore drill succeeds before launch. Support access is separate from family membership and is audited. A failed background operation can be retried safely. No product operator is silently shown as a family admin.

Payment provider, exact package price/duration, taxes and refund policy must be resolved before collecting money. This PRD specifies product behaviour and does not prescribe legal or tax conclusions.

# 11 Quality security and delivery requirements

The following are proposed engineering acceptance targets. Validate them against the selected infrastructure and publish customer-facing guarantees only after they are supported operationally.

| **ID**                | **Requirement and verification**                                                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 Access         | Test cross-wedding access denial for every private resource, file and export. Recheck role changes on requests. Scope guest tokens narrowly and keep them out of logs, analytics and referrer leakage.     |
| NFR-02 Usability      | Core flows work at 360 px mobile width and on desktop. Keyboard navigation, visible focus, form labels, readable contrast and understandable validation meet a WCAG 2.2 AA design target.                  |
| NFR-03 Responsiveness | Provisional target: p95 normal record reads/writes under 1.5 seconds server-side at the agreed launch load; show progress for large uploads/imports. Specify a realistic test profile before signing off.  |
| NFR-04 Data integrity | Exact monetary arithmetic, unique guest–function invitations, atomic decisions, safe payment/event retries and conflict handling are required. No silent data loss on network failure.                     |
| NFR-05 Recovery       | Provisional backup objective: no more than 24 hours of recoverable data loss and restoration within 24 hours. Include database and file recovery, and demonstrate the process before launch.               |
| NFR-06 Privacy        | Private data stays out of guest pages and search indexes. Sanitise uploads; protect contact information and files. Publish retention, deletion and data-use disclosures before collecting production data. |
| NFR-07 Observability  | Track application errors, queue failures, storage usage and email outcomes without storing guest tokens or sensitive payloads. Alert on repeat failures affecting users.                                   |
| NFR-08 Compatibility  | Test current stable Chrome, Safari, Firefox and Edge, including Android Chrome and iOS Safari. Capture tested versions at release.                                                                         |
| NFR-09 Portability    | Provide guest CSV and financial record exports at commercial launch; owner can request a wedding archive of supported records/files. Define archive contents and file handling before launch.              |

## Operational dependency checklist

Select email identity/delivery, authentication, database, object storage, background jobs, image processing, payment processing and monitoring services during technical design. Domain authentication and a sandbox payment flow are prerequisites for production sending and billing.

Design does not depend on a particular framework. Use the builder's React/TypeScript experience, but keep technology selection, API contracts and database migrations in the subsequent technical specification.

# 12 Acceptance journeys and release gates

| **Journey**               | **End to end acceptance**                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| J1 Family collaboration P | Create wedding, invite manager, accept invitation, add function, assign task, submit design, request changes, approve revision and complete task. Confirm history and notifications.                    |
| J2 Access change P        | Remove a member and attempt continued access. Demote an approver and reassign pending request. Attempt last-admin removal and cross-wedding record/file access; all forbidden actions fail.             |
| J3 Money tracking C       | Add vendor commitment, create installments, record a partial payment and refund, and inspect totals. Cancel a commitment without losing paid/refunded history. Verify optional approval behaviour.      |
| J4 Guest response C       | Import households, invite selected people to different functions, send email, RSVP without login and edit a response. Revoke link and verify previous link fails. Test organiser correction and totals. |
| J5 Guest publishing C     | Preview and publish each theme, switch without data loss, and verify generic versus household schedule access. Internal notes and uninvited functions must be absent from responses.                    |
| J6 Photo moderation C     | Scan QR, upload as guest, confirm Pending is private, approve as admin and see gallery. Reject another photo, remove published photo and revoke upload link. Test quota/type failures.                  |
| J7 Commercial lifecycle C | Complete sandbox purchase, replay confirmation, enforce limits, expire entitlement, export and request deletion. Test failed checkout and renewal/extension behaviour if offered.                       |

## Pilot exit gate

J1 and J2 pass. Recruit one self-planning family and one planner-assisted family using the same family roles; the planner participant does not receive a new role. Both use real tasks and at least one approval. Cross-wedding isolation and invitation revocation are verified before real private data is entered.

## Commercial launch gate

All P and C requirements and J1–J7 pass. Resolve all launch-blocking decisions, configure package limits, validate backup restoration, test email failures and billing retries, and establish a support route. Do not sell photo storage or package durations that the system cannot enforce.

## Implementation order

Build membership and wedding access first, then functions and tasks, submissions/approvals and dashboard. Pilot that loop. Add finances and vendor records, then guests/RSVP/email/site themes, then photos and commercial lifecycle. Security and usability checks accompany each slice rather than waiting for the final stage.

# 13 Measurement decisions and next work

## Product measurement

| **Metric**           | **Definition and initial evaluation**                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activation           | Wedding has a function, an accepted collaborator and an assigned task. Proposed pilot target: activate within seven days of creation.                    |
| Shared participation | Track weddings where a noncreator updates work or submits a response/decision each week. Proposed pilot goal: both pilot weddings demonstrate this.      |
| Approval completion  | Measure time from request to decision, resubmission count and outstanding requests. Each pilot should finish at least one genuine decision.              |
| Sustained use        | Observe use across several weeks, plus interviews on continued WhatsApp duplication. Do not infer demand from sign-ups alone.                            |
| Commercial evidence  | Track purchase conversion, support time per wedding, email/storage cost per wedding and explicit reasons for abandonment; targets follow pilot evidence. |

Collect product events without photo content, guest names, payment details or access tokens in analytics. Suggested events: wedding_created, member_joined, task_assigned, approval_requested, approval_decided, rsvp_submitted, photo_moderated and package_activated.

## Decisions required before commercial launch

| **Decision**                                | **Owner and timing**                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Package pricing and access duration         | Product owner; before checkout and purchase terms are finalised.                              |
| Members guests storage and email limits     | Product owner with infrastructure estimates; before entitlement implementation is signed off. |
| Photo and attachment limits                 | Product and engineering; before uploads are opened to guests.                                 |
| Expiry retention gallery and RSVP end dates | Product owner; before purchase terms, deletion jobs and lifecycle notices.                    |
| Refund invoicing and tax handling           | Product owner with relevant provider/adviser; before accepting payments.                      |
| Expected launch load and recovery targets   | Product and engineering; before performance and restore acceptance.                           |
| Theme visual design and final copy          | Product/design; before guest-site acceptance across three themes.                             |
