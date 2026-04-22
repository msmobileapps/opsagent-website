/**
 * Maya Widget — drop-in chat bubble for opsagents.agency.
 *
 * Embed:
 *   <script
 *     src="https://cdn.opsagents.agency/maya-widget.js"
 *     data-endpoint="https://maya-sdr-xxxxx.us-central1.run.app/v1/chat"
 *     data-accent="#111827"
 *     defer
 *   ></script>
 *
 * Or programmatically:
 *   <script src="maya-widget.js" defer></script>
 *   <script>
 *     window.MayaSDR = { endpoint: 'https://...', accent: '#111827', openOnLoad: false }
 *   </script>
 *
 * The widget auto-mounts on DOMContentLoaded. It stores sessionId in
 * sessionStorage so a refresh keeps context.
 */

(function () {
  if (window.__mayaWidgetLoaded) return
  window.__mayaWidgetLoaded = true

  // -------- Config --------
  const script = document.currentScript
  const cfg = Object.assign(
    {
      endpoint: 'https://maya-sdr.opsagents.agency/v1/chat',
      accent: '#111827',
      title: 'Maya · OpsAgent',
      subtitle: "Hi — I'm Maya. What's on your mind?",
      openOnLoad: false,
      placeholder: 'Type a message…',
      position: 'right',
      zIndex: 2147483000,
    },
    window.MayaSDR || {},
    script
      ? {
          ...(script.dataset.endpoint ? { endpoint: script.dataset.endpoint } : {}),
          ...(script.dataset.accent ? { accent: script.dataset.accent } : {}),
          ...(script.dataset.title ? { title: script.dataset.title } : {}),
          ...(script.dataset.openOnLoad ? { openOnLoad: script.dataset.openOnLoad === 'true' } : {}),
          ...(script.dataset.position ? { position: script.dataset.position } : {}),
        }
      : {},
  )

  // Sanitise accent to prevent CSS injection (P2-B)
  const SAFE_COLOR = /^#[0-9a-f]{3,8}$|^rgb\(|^rgba\(|^hsl\(/i
  if (!SAFE_COLOR.test(cfg.accent)) cfg.accent = '#111827'

  const SESSION_KEY = 'maya_sdr_session_id'
  const sessionId = sessionStorage.getItem(SESSION_KEY) || null

  // -------- Styles --------
  const css = `
    .maya-root { position: fixed; ${cfg.position === 'left' ? 'left' : 'right'}: 24px; bottom: 24px; z-index: ${cfg.zIndex}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif; }
    .maya-bubble { width: 56px; height: 56px; border-radius: 50%; background: ${cfg.accent}; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 24px rgba(0,0,0,.18); border: none; transition: transform .15s ease; }
    .maya-bubble:hover { transform: translateY(-2px); }
    .maya-bubble svg { width: 26px; height: 26px; }
    .maya-panel { position: absolute; bottom: 72px; ${cfg.position === 'left' ? 'left' : 'right'}: 0; width: min(380px, calc(100vw - 32px)); height: min(560px, calc(100vh - 120px)); background: #fff; border-radius: 16px; box-shadow: 0 24px 64px rgba(0,0,0,.22); display: none; flex-direction: column; overflow: hidden; border: 1px solid #e5e7eb; }
    .maya-panel[data-open="true"] { display: flex; }
    .maya-header { padding: 14px 16px; background: ${cfg.accent}; color: #fff; display: flex; align-items: center; justify-content: space-between; }
    .maya-title { font-weight: 600; font-size: 15px; line-height: 1.2; }
    .maya-subtitle { font-size: 12px; opacity: .8; margin-top: 2px; }
    .maya-close { background: transparent; border: none; color: #fff; cursor: pointer; font-size: 20px; line-height: 1; padding: 4px 8px; }
    .maya-body { flex: 1; overflow-y: auto; padding: 16px; background: #f9fafb; }
    .maya-msg { max-width: 82%; padding: 10px 12px; border-radius: 12px; margin-bottom: 10px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; word-wrap: break-word; }
    .maya-msg[data-role="assistant"] { background: #fff; border: 1px solid #e5e7eb; color: #111827; border-bottom-left-radius: 4px; }
    .maya-msg[data-role="user"] { background: ${cfg.accent}; color: #fff; margin-left: auto; border-bottom-right-radius: 4px; }
    .maya-msg[dir="rtl"] { text-align: right; }
    .maya-msg[data-role="user"][dir="rtl"] { margin-left: 0; margin-right: auto; border-bottom-left-radius: 12px; border-bottom-right-radius: 4px; }
    .maya-typing { display: inline-flex; gap: 4px; padding: 10px 14px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; border-bottom-left-radius: 4px; }
    .maya-typing span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: maya-blink 1.2s infinite ease-in-out; }
    .maya-typing span:nth-child(2) { animation-delay: .2s; }
    .maya-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes maya-blink { 0%, 80%, 100% { opacity: .3 } 40% { opacity: 1 } }
    .maya-footer { border-top: 1px solid #e5e7eb; background: #fff; padding: 10px 12px; display: flex; gap: 8px; }
    .maya-input { flex: 1; border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; font-size: 14px; outline: none; resize: none; font-family: inherit; max-height: 120px; }
    .maya-input:focus { border-color: ${cfg.accent}; }
    .maya-send { background: ${cfg.accent}; color: #fff; border: none; border-radius: 10px; padding: 0 14px; cursor: pointer; font-size: 14px; font-weight: 600; }
    .maya-send:disabled { opacity: .5; cursor: not-allowed; }
    .maya-legal { font-size: 10px; color: #9ca3af; text-align: center; padding: 4px 12px 10px; background: #fff; }
    .maya-legal a { color: #6b7280; text-decoration: underline; }
  `

  const styleEl = document.createElement('style')
  styleEl.textContent = css
  document.head.appendChild(styleEl)

  // -------- DOM --------
  const root = document.createElement('div')
  root.className = 'maya-root'
  root.innerHTML = `
    <div class="maya-panel" data-open="${cfg.openOnLoad ? 'true' : 'false'}"
         role="dialog" aria-modal="true" aria-labelledby="maya-dialog-title">
      <div class="maya-header">
        <div>
          <div class="maya-title" id="maya-dialog-title">${escapeHtml(cfg.title)}</div>
          <div class="maya-subtitle">${escapeHtml(cfg.subtitle)}</div>
        </div>
        <button class="maya-close" aria-label="Close chat"><span aria-hidden="true">×</span></button>
      </div>
      <div class="maya-body" role="log" aria-live="polite" aria-label="Chat messages"></div>
      <div class="maya-footer">
        <textarea class="maya-input" rows="1" placeholder="${escapeHtml(cfg.placeholder)}" aria-label="Message Maya"></textarea>
        <button class="maya-send" disabled>Send</button>
      </div>
      <div class="maya-legal">Powered by OpsAgent · You're chatting with an AI agent</div>
    </div>
    <button class="maya-bubble" aria-label="Open Maya chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
  `
  document.body.appendChild(root)

  const $panel = root.querySelector('.maya-panel')
  const $bubble = root.querySelector('.maya-bubble')
  const $close = root.querySelector('.maya-close')
  const $body = root.querySelector('.maya-body')
  const $input = root.querySelector('.maya-input')
  const $send = root.querySelector('.maya-send')

  // -------- State --------
  let currentSessionId = sessionId
  let inFlight = false

  // -------- Focus trap (P1-A fix) --------
  const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

  function trapFocus(e) {
    if (e.key !== 'Tab') return
    const focusable = Array.from($panel.querySelectorAll(FOCUSABLE))
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  function togglePanel(force) {
    const next = typeof force === 'boolean' ? force : $panel.dataset.open !== 'true'
    $panel.dataset.open = next ? 'true' : 'false'
    if (next) {
      $panel.addEventListener('keydown', trapFocus)
      $input.focus()
      if ($body.childElementCount === 0) greet()
    } else {
      $panel.removeEventListener('keydown', trapFocus)
      $bubble.focus() // Return focus to trigger on close
    }
  }

  $bubble.addEventListener('click', () => togglePanel())
  $close.addEventListener('click', () => togglePanel(false))

  $input.addEventListener('input', () => {
    $send.disabled = !$input.value.trim() || inFlight
    // Autosize
    $input.style.height = 'auto'
    $input.style.height = Math.min(120, $input.scrollHeight) + 'px'
  })

  $input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!$send.disabled) send()
    }
  })

  $send.addEventListener('click', send)

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  }

  function isHebrew(s) {
    return /[\u0590-\u05FF]/.test(s || '')
  }

  function appendMessage(role, content) {
    const el = document.createElement('div')
    el.className = 'maya-msg'
    el.dataset.role = role
    if (isHebrew(content)) el.setAttribute('dir', 'rtl')
    el.textContent = content
    $body.appendChild(el)
    $body.scrollTop = $body.scrollHeight
  }

  function showTyping() {
    const el = document.createElement('div')
    el.className = 'maya-typing'
    el.id = 'maya-typing'
    el.setAttribute('aria-hidden', 'true') // Don't announce typing dots to screen readers
    el.innerHTML = '<span></span><span></span><span></span>'
    $body.appendChild(el)
    $body.scrollTop = $body.scrollHeight
  }

  function hideTyping() {
    const el = $body.querySelector('#maya-typing')
    if (el) el.remove()
  }

  function greet() {
    appendMessage(
      'assistant',
      cfg.subtitle === "Hi — I'm Maya. What's on your mind?"
        ? "Hey — I'm Maya, the OpsAgent SDR. Want to tell me a bit about your team and where your back-office hurts most?"
        : cfg.subtitle,
    )
  }

  async function send() {
    const text = $input.value.trim()
    if (!text || inFlight) return
    inFlight = true
    $send.disabled = true
    appendMessage('user', text)
    $input.value = ''
    $input.style.height = 'auto'
    showTyping()

    try {
      const res = await fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSessionId,
          message: text,
        }),
      })
      hideTyping()
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.sessionId) {
        currentSessionId = data.sessionId
        sessionStorage.setItem(SESSION_KEY, currentSessionId)
      }
      appendMessage('assistant', data.reply || '…')
    } catch (err) {
      hideTyping()
      appendMessage(
        'assistant',
        "I hit a snag reaching the backend. Try again in a moment, or email info@opsagents.agency and we'll pick it up there.",
      )
      console.warn('[maya]', err)
    } finally {
      inFlight = false
      $send.disabled = !$input.value.trim()
    }
  }

  // Public API
  window.Maya = {
    open: () => togglePanel(true),
    close: () => togglePanel(false),
    reset: () => {
      sessionStorage.removeItem(SESSION_KEY)
      currentSessionId = null
      $body.innerHTML = ''
      greet()
    },
    config: cfg,
  }
})()
