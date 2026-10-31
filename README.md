# Connect WiFi Mobile App — V19 (Announcements & Offers)

## Customer-facing additions
- A visible **آخر الإشعارات** panel on the home page. It displays published news, alerts, and maintenance notices.
- A visible **أحدث العروض** panel. It displays active offers, optional banner images, details links, and expiry dates.
- Each panel shows the latest three entries and has **عرض الكل** when more entries exist.
- Data is loaded from `notifications.json` and `offers.json` without relying on the service-worker cache. It refreshes on page open, return to foreground, and every five minutes while visible.
- Empty states are shown until actual content is published; no fake sample offers or notices are inserted.

## Publish content using GitHub Actions
1. Upload the complete project to the repository and publishing branch used by GitHub Pages. Include the hidden `.github` folder.
2. In **Settings → Actions → General → Workflow permissions**, enable **Read and write permissions**.
3. Open **Actions → Publish Connect WiFi content → Run workflow**.
4. Choose `notification` or `offer`, then fill in the title and message. For offers, optional image URL, details URL, and expiry date (`YYYY-MM-DD`) are supported.
5. Run the workflow. It appends the content to the corresponding JSON file and commits the update. GitHub Pages publishes it according to the repository configuration.

The workflow runs on the branch from which it is started. Start it on the branch published by GitHub Pages.

## Important
This is a public in-app bulletin. Customers see updates when opening the page, refreshing it, returning to it, or while it remains open. It does not provide guaranteed operating-system push notifications while the app is closed. Do not publish private customer information.

## Design correction
Only the main brand heading `كونكت واي فاي` uses Changa. The animated advertising line keeps Lalezar, as requested.
