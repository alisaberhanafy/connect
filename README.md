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


## V21 – مركز الشروحات
تمت إضافة قسم «مركز الشروحات والدعم الفني» إلى الصفحة الرئيسية، ويضم روابط فيديوهات لوحة العميل، واختبار سرعة الإنترنت، وإرسال الموقع عبر واتساب، بالإضافة إلى رابط تحميل Speedtest من Google Play.

الفيديوهات تفتح على YouTube في نافذة/تبويب خارجي، وصور المعاينة تُحمّل من YouTube. لا يلزم إعداد GitHub Actions إضافي لهذا القسم.


## الإصدار V22 – قائمة الاختصارات السريعة
أضيف شريط اختصارات ثابت أثناء التمرير أعلى الصفحة، ويتيح الانتقال المباشر إلى روابط وخدمات العملاء، والإشعارات، والعروض، ومركز الشروحات، والدعم الفني. تم تحديث إصدار Service Worker لتفادي الاحتفاظ بنسخة الصفحة القديمة.


## الإصدار V23 – شريط اختصارات مضغوط
- عرض الاختصارات الخمسة في صف واحد باستخدام شبكة ثابتة، دون تمرير أفقي.
- أيقونات SVG موحدة مع تسميات قصيرة وواضحة.
- الحفاظ على الروابط المباشرة للأقسام مع تمرير سلس.
- تحديث إصدار Service Worker لمسح النسخة المخزنة القديمة.

## تحديث التطبيق عند العملاء (V24)
أضيف زر **تحديث التطبيق** بجوار أزرار التثبيت وشكل التطبيق. يفحص إصدار Service Worker، ويحذف ملفات التخزين المؤقت القديمة، ثم يعيد تحميل الصفحة. كما أصبح تحميل الصفحة وملفات الإشعارات والعروض يعتمد على الشبكة أولًا لتقليل ظهور نسخة قديمة.

لا تطلب من العملاء حذف ملفات تعريف الارتباط (Cookies)؛ فهي ليست سبب تحديث ملفات التطبيق، وحذفها قد يؤدي إلى تسجيل خروجهم من مواقع أخرى. إذا لم يظهر التحديث بعد الضغط على الزر، أغلق التطبيق تمامًا وافتحه مرة أخرى مع اتصال الإنترنت.


## V25 — اختصارات التثبيت والتحديث في الهيدر
تم نقل زري **تحديث التطبيق** و**تثبيت التطبيق** إلى الهيدر كأيقونتين صغيرتين بجوار زر تغيير المظهر. تمت إزالة الزرين النصيين من أسفل الصفحة لتقليل الازدحام. الأيقونتان لهما تسميات وصول وعناوين توضيحية عند المرور/الضغط المطول.
