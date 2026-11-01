SHADOW BECOMES ME — PLAYTEST ROUND 3 / 試玩第 3 輪
Build / 版本: r3-5c7c6e926759
Runtime source commit: ed2ca26a9fca3fdd45eecab15d542597c1959d23
Archive: shadow-becomes-me-r3-5c7c6e926759.zip
Branch: dev/recovery-art-pipeline

LOCAL LAUNCH (free Python 3 required)
1. Extract ALL files into a new folder; do not overlay an old version.
2. Stop older local servers. Open a terminal in this folder.
3. Run: python3 serve.py
   Windows: py serve.py
4. Open http://127.0.0.1:8080/ (HTTP, not file://).
   Another port: python3 serve.py --port 8081 then open the matching URL.
5. The footer Build ID, BUILD.json and this ZIP name must match.
   Use Check build after replacing a served folder. Refresh the tab with
   Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac). If an old tab persists,
   close it, confirm the server's folder/port, then reopen the URL. Incognito
   is a diagnostic fallback, not required for normal version updates.

啟動：完整解壓縮至新資料夾，停止舊伺服器，在資料夾內執行
python3 serve.py（Windows：py serve.py），開啟 http://127.0.0.1:8080/。
請勿直接開啟 index.html。頁尾版本、BUILD.json 與 ZIP 名稱應一致。
更新後點「檢查版本」並重新整理（Ctrl+Shift+R／Cmd+Shift+R）。

CONTROLS
- C / Transform / 變形: Shadow → Box → Chair → Shadow.
  Current form is shown below the scene; the accessible button name also
  gives the current and next form. Moving exposes any disguise as before.
- 1/2 or Box/Chair buttons: direct selection. Q/E: previous/next disguise
  only (Box/Chair), retained for existing players. These do not include normal.
- Hold A/D, arrows or touch arrows to slide. X or Spike/尖刺 attacks.
- Pause/help, restart R, live English/Traditional Chinese remain available.

DEVOUR WALKTHROUGH (unchanged rules and accepted animation)
Enter, move right behind the guard toward the first boxes, release movement,
then C/Transform once to become Box. Wait for the unaware guard within range,
press X or Spike/尖刺 once, and remain still for at least 0.56 seconds.
Then move right to exit. Chair is unfitting here. Moving before attacking
prevents disguise eligibility; moving immediately afterward cancels Devour's
presentation. Ordinary attacks still use Spike. Cooldown 1.2s, range 105.

HEALTH / CACHE
The guard's compact scene health bar appears only while wounded and alive.
Exact health remains in the text readout; ? / ! awareness cues are preserved.
The bundled local server disables caching and conditional 304 responses.
Assets also use a build-specific directory, so another ordinary static HTTP
server gets versioned references. Such servers control their own HTML caching:
use the bundled launcher and refresh when changing versions. An already open
tab does not auto-update. No service worker, telemetry or online dependency.

This is a local owner-review POC, not a release or deployed website.
Physical phones and independent screen-reader testing remain unverified.
