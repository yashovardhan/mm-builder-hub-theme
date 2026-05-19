# Admin content guide (Phases 7–8)

Changes below are made in **Discourse Admin** on production, not in the theme repo.

## Phase 7 — Global notice (Office Hours banner)

**Where:** Admin → **Customize** → **Themes** → your site theme, or **Admin → What's new** / banner settings (depending on Discourse version).

**Recommended short copy** (markdown):

```markdown
**MetaMask Developer Office Hours** — monthly on the second Thursday.

[Register & add to calendar](https://lu.ma/metamask-dev-office-hours) · [Submit questions ahead of time](https://forms.gle/your-form-id)
```

Replace the Luma and form URLs with your live links. Keep to 2–3 sentences so the banner stays readable on mobile after theme contrast fixes.

**Tips:**

- Avoid duplicating “Zoom” and “Luma” if one calendar link is enough.
- Do not paste HTML entities in the banner; use straight apostrophes (`'`).

---

## Phase 8 — Fix HTML entities in topic titles

**Known issue:** Titles showing `Can&rsquo;t` instead of `Can't`.

**Steps:**

1. Admin → search topics for `&rsquo;`, `&quot;`, `&amp;`.
2. Edit each topic → change the **title** to normal Unicode (e.g. `Can't log in after entering OTP`).
3. Re-check **404**, **/latest**, and category lists.

**Guideline for moderators:** When creating topics, type apostrophes directly; do not copy from HTML exports.

**Example fixes:**

| Current title | Corrected title |
|---------------|-----------------|
| `Can&rsquo;t log in after entering OTP` | `Can't log in after entering OTP` |
