// ============================================
// Cayo — AI Chat
// Live Claude API integration for the Ask AI panel.
// Uses APP_CONTEXT (from data/app-context.js) as the system prompt.
// ============================================

// ── AI Chat ──
async function sendChat() {
  const inp = document.getElementById('chatInp');
  const val = inp.value.trim();
  if (!val) return;

  const msgs = document.getElementById('chatMsgs');
  inp.value = '';

  // User message — use textContent for XSS safety
  const userDiv = document.createElement('div');
  userDiv.className = 'msg msg-right';
  const userAv = document.createElement('div');
  userAv.className = 'msg-av av-user';
  userAv.textContent = 'AB';
  const userBub = document.createElement('div');
  userBub.className = 'msg-bub bub-user';
  userBub.textContent = val; // textContent — safe from XSS
  userDiv.appendChild(userAv);
  userDiv.appendChild(userBub);
  msgs.appendChild(userDiv);
  msgs.scrollTop = msgs.scrollHeight;

  // Loader
  const loaderDiv = document.createElement('div');
  loaderDiv.className = 'msg';
  loaderDiv.innerHTML = `<div class="msg-av av-ai">⬡</div><div class="msg-bub bub-ai"><div class="chat-loader"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(loaderDiv);
  msgs.scrollTop = msgs.scrollHeight;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: APP_CONTEXT,
        messages: [{ role: 'user', content: val }]
      })
    });

    const data = await res.json();
    const reply = data?.content?.[0]?.text || 'I could not process that request. Please try again.';

    loaderDiv.remove();

    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg';
    const aiAv = document.createElement('div');
    aiAv.className = 'msg-av av-ai';
    aiAv.textContent = '⬡';
    const aiBub = document.createElement('div');
    aiBub.className = 'msg-bub bub-ai';
    aiBub.textContent = reply; // textContent — safe from XSS
    aiDiv.appendChild(aiAv);
    aiDiv.appendChild(aiBub);
    msgs.appendChild(aiDiv);
    msgs.scrollTop = msgs.scrollHeight;

  } catch (err) {
    loaderDiv.remove();
    const errDiv = document.createElement('div');
    errDiv.className = 'msg';
    errDiv.innerHTML = `<div class="msg-av av-ai">⬡</div><div class="msg-bub bub-ai" style="color:var(--danger)">Connection error — check API configuration.</div>`;
    msgs.appendChild(errDiv);
    msgs.scrollTop = msgs.scrollHeight;
  }
}
