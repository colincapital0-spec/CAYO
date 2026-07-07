// ============================================
// Cayo — UI Interactions
// Panel tabs, step accordion, toasts, 4-eyes sign-off, decisions.
// ============================================

// ── Panel switching ──
function switchRP(e, name) {
  document.querySelectorAll('.rp-tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById('rp-risk').style.display = 'none';
  document.getElementById('rp-activity').style.display = 'none';
  const ai = document.getElementById('rp-ai');
  ai.style.display = 'none';

  if (name === 'ai') {
    ai.style.display = 'flex';
    ai.style.flexDirection = 'column';
  } else {
    document.getElementById('rp-' + name).style.display = 'block';
  }
}

// ── Step toggle ──
function toggleStep(el) {
  el.classList.toggle('open');
}

// ── Toast ──
function showToast(msg, color) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.style.borderLeftColor = color || 'var(--gold)';
  t.style.borderLeft = `3px solid ${color || 'var(--gold)'}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Sign-off state ──
let signed1 = false, signed2 = false;

function signOff(n) {
  if (n === 1 && !signed1) {
    signed1 = true;
    document.getElementById('sign1').outerHTML = '<span class="signed-badge">✓ Signed · A. Baldeosingh · ' + new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) + '</span>';
    document.getElementById('sign2').disabled = false;
    document.getElementById('sign2').removeAttribute('data-tip');
    showToast('✓ Primary sign-off recorded to audit trail', 'var(--clear)');
  } else if (n === 2 && !signed2) {
    signed2 = true;
    document.getElementById('sign2').outerHTML = '<span class="signed-badge">✓ Signed · Sr. Reviewer · ' + new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) + '</span>';
    document.querySelectorAll('.dec-btn').forEach(b => b.classList.add('unlocked'));
    showToast('✓ Dual authorization complete — decision unlocked', 'var(--clear)');
  }
}

function handleApprove() {
  if (!document.getElementById('approveBtn').classList.contains('active-btn')) return;
  showToast('✓ Application approved and onboarded', 'var(--clear)');
}

function handleDecision(type) {
  const map = { approve: '✓ Application approved', reject: '✕ Application rejected', escalate: '↑ Escalated to MLRO' };
  const col = { approve: 'var(--clear)', reject: 'var(--danger)', escalate: 'var(--sky)' };
  showToast(map[type], col[type]);
}
