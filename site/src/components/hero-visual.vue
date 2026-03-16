<template>
  <div class="visual">
    <!-- Large dialog -->
    <svg class="card card-1" viewBox="0 0 240 170" fill="none">
      <rect x="1" y="1" width="238" height="168" rx="12" stroke="rgba(99,102,241,0.4)" stroke-width="1.5"/>
      <line x1="20" y1="30" x2="120" y2="30" stroke="rgba(99,102,241,0.35)" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="55" x2="200" y2="55" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="20" y1="70" x2="170" y2="70" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="20" y1="85" x2="130" y2="85" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="148" y="130" width="38" height="20" rx="6" stroke="rgba(255,255,255,0.1)" stroke-width="1.2"/>
      <rect x="194" y="130" width="38" height="20" rx="6" stroke="rgba(99,102,241,0.35)" stroke-width="1.2"/>
    </svg>

    <!-- Confirm dialog -->
    <svg class="card card-2" viewBox="0 0 200 140" fill="none">
      <rect x="1" y="1" width="198" height="138" rx="12" stroke="rgba(168,85,247,0.4)" stroke-width="1.5"/>
      <line x1="20" y1="30" x2="100" y2="30" stroke="rgba(168,85,247,0.3)" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="55" x2="165" y2="55" stroke="rgba(255,255,255,0.07)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="20" y1="70" x2="135" y2="70" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="110" y="102" width="35" height="18" rx="6" stroke="rgba(255,255,255,0.1)" stroke-width="1.2"/>
      <rect x="152" y="102" width="35" height="18" rx="6" stroke="rgba(168,85,247,0.3)" stroke-width="1.2"/>
    </svg>

    <!-- Small alert -->
    <svg class="card card-3" viewBox="0 0 160 110" fill="none">
      <rect x="1" y="1" width="158" height="108" rx="12" stroke="rgba(245,158,11,0.35)" stroke-width="1.5"/>
      <circle cx="80" cy="32" r="10" stroke="rgba(245,158,11,0.3)" stroke-width="1.5"/>
      <line x1="48" y1="58" x2="112" y2="58" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="58" y1="72" x2="102" y2="72" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="54" y="86" width="52" height="16" rx="6" stroke="rgba(245,158,11,0.25)" stroke-width="1.2"/>
    </svg>

    <!-- Toast -->
    <svg class="card card-4" viewBox="0 0 160 42" fill="none">
      <rect x="1" y="1" width="158" height="40" rx="10" stroke="rgba(34,197,94,0.35)" stroke-width="1.5"/>
      <circle cx="22" cy="21" r="5" stroke="rgba(34,197,94,0.4)" stroke-width="1.5"/>
      <line x1="36" y1="16" x2="90" y2="16" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="27" x2="125" y2="27" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
</template>

<style scoped>
.visual {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.card {
  position: absolute;
  animation: float-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.card-1 { animation-delay: 0.2s; }
.card-2 { animation-delay: 0.4s; }
.card-3 { animation-delay: 0.6s; }
.card-4 { animation-delay: 0.8s; }

@keyframes float-in {
  0% {
    opacity: 0;
    transform: scale(0.7) var(--rot);
  }
  60% {
    opacity: 1;
    transform: scale(1.03) var(--rot);
  }
  100% {
    opacity: 1;
    transform: scale(1) var(--rot);
  }
}

/* Dialog — top, largest */
.card-1 {
  --rot: rotate(-4deg);
  width: 62%;
  top: 0;
  left: 0;
  filter: drop-shadow(0 0 20px rgba(99,102,241,0.1));
  z-index: 1;
}

.card-2 {
  --rot: rotate(3deg);
  width: 52%;
  top: 18%;
  right: 0;
  filter: drop-shadow(0 0 20px rgba(168,85,247,0.1));
  z-index: 2;
}

.card-3 {
  --rot: rotate(2deg);
  width: 40%;
  bottom: 15%;
  left: 5%;
  filter: drop-shadow(0 0 16px rgba(245,158,11,0.08));
  z-index: 3;
}

.card-4 {
  --rot: rotate(-2deg);
  width: 42%;
  bottom: 5%;
  right: 8%;
  filter: drop-shadow(0 0 16px rgba(34,197,94,0.08));
  z-index: 4;
}
</style>
