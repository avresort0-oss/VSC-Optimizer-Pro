🚀 VSC Optimizer Pro
VSC Optimizer Pro হলো একটি শক্তিশালী টুল যা আপনার VS Code-এর পারফরম্যান্সকে একদম নেক্সট লেভেলে নিয়ে যায়। এটি অপ্রয়োজনীয় ব্যাকগ্রাউন্ড প্রসেস বন্ধ করে, টেলিমেট্রি ডিজেবল করে এবং আপনার হার্ডওয়্যার রিসোর্সকে অপ্টিমাইজ করে কোডিং অভিজ্ঞতাকে দ্রুততর করে।

✨ মূল ফিচারসমূহ
🛠️ Dev Mode: কোডিংয়ের জন্য প্রয়োজনীয় সব সেটিংস এবং এক্সটেনশনসহ একটি ব্যালেন্সড প্রোফাইল।

🔥 Boost Mode: এক ক্লিকে সব এক্সটেনশন এবং GPU রেন্ডারিং বন্ধ করে সর্বোচ্চ গতি নিশ্চিত করা।

🛡️ Resource Watchdog: ব্যাকগ্রাউন্ডে CPU এবং RAM মনিটর করে এবং কোনো প্রসেস লিমিট ক্রস করলে তা অটো-কিল করে।

📊 Sidebar Dashboard: সরাসরি এডিটরের সাইডবার থেকে সব কন্ট্রোল করার সুবিধা।

🧹 Deep Cache Cleaner: ভিউএস কোড ক্যাশে এবং টেম্পোরারি ফাইল ক্লিন করার শর্টকাট।
📸 স্ক্রিনশট
(এখানে তোমার এক্সটেনশনের সাইডবার স্ক্রিনশট যুক্ত করো)

🚀 কীভাবে ব্যবহার করবেন?
১. এক্সটেনশনটি ইনস্টল করার পর বাম পাশের Activity Bar-এ Optimizer আইকনে ক্লিক করুন।
২. Power Panel থেকে আপনার পছন্দের প্রোফাইল (Dev/Boost) সিলেক্ট করুন।
৩. পিসি স্লো মনে হলে 🛡️ Start Watchdog বাটনটি অন করে দিন।

⚙️ সেটিংস কনফিগারেশন
এই এক্সটেনশনটি নিচের সেটিংসগুলো অটোমেটিক অপ্টিমাইজ করতে পারে:

telemetry.enableTelemetry: false

editor.minimap.enabled: false (Boost Mode-এ)

files.watcherExclude: node_modules এবং .git ফোল্ডার বাদ দেয়।

🛠️ ডেভেলপমেন্ট সেটআপ
আপনি যদি এই এক্সটেনশনটি নিজে বিল্ড করতে চান:

Bash

# রিপোজিটরি ক্লোন করুন

git clone <https://github.com/yourusername/vsc-optimizer.git>

# ডিপেন্ডেন্সি ইনস্টল করুন

npm install

# এক্সটেনশন কম্পাইল করুন

npm run compile

# F5 প্রেস করে 'Extension Development Host' উইন্ডোতে টেস্ট করুন।

📝 লাইসেন্স
এই প্রজেক্টটি MIT License এর অধীনে লাইসেন্সপ্রাপ্ত।

Developed with ❤️ by  Bijoy

## 🗺️ Roadmap

### Phase 1: Core Performance Engine (The "Heart")

* **Smart Setting Injection:** ইউজার যখন "Boost Mode" অন করবে, তখন `files.watcherExclude` এ `node_modules`, `dist`, এবং `temp` ফোল্ডার অটোমেটিক অ্যাড হবে। (Target: 30-40% CPU reduction).
* **Memory Leak Watcher:** ব্যাকগ্রাউন্ড লুপ যা `vscode.languages.getLanguages()` এবং অন্যান্য ইন্টারনাল প্রসেস মনিটর করবে।
* **GPU Toggle:** লো-এন্ড পিসির জন্য সেটিংসের মাধ্যমে `disable-hardware-acceleration` কন্ট্রোল।

### Phase 2: Sidebar UI/UX (The "Face")

* **Interactive Dashboard:** নিওন বা ডার্ক থিমযুক্ত WebView ড্যাশবোর্ড।
* **Live Resource Graph:** সাইডবারে লাইভ RAM ইউসেজ গ্রাফ।
* **One-Click Profiles:** Dev Mode, Performance Mode, SmartSafe Mode.

### Phase 3: Automation & Cleanup (The "Janitor")

* **Cache Purge:** CachedData এবং User/workspaceStorage ক্লিন করার টুল।
* **Extension Manager:** অব্যবহৃত এক্সটেনশন ডিসেবল করার সাজেশন।
* **Process Manager:** হ্যাং হওয়া টার্মিনাল/প্রসেস কিল করার অপশন।

### Phase 4: Customization & Portability

* **Profile Sync:** ক্লাউড সেটিংস সিঙ্ক।
* **Command Palette Integration:** `Ctrl+Shift+P` দিয়ে কমান্ড সাপোর্ট।
