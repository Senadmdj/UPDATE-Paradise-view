document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
  if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"✕":"☰";});}
  // Google Translate provides visitor-selectable page translation when online.
  // The widget is loaded separately in each HTML page.
  const expButtons=document.querySelectorAll("[data-filter]");
  expButtons.forEach(btn=>btn.addEventListener("click",()=>{
    expButtons.forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const value=btn.dataset.filter;
    document.querySelectorAll(".experience-card").forEach(card=>card.classList.toggle("hidden",value!=="all"&&card.dataset.category!==value));
  }));
  const businessButtons=document.querySelectorAll("[data-business-filter]"), search=document.querySelector("#business-search"), cards=[...document.querySelectorAll(".directory-card")];
  let businessType="all";
  function filterBusinesses(){const q=(search?.value||"").toLowerCase();let count=0;cards.forEach(card=>{const matchesType=businessType==="all"||card.dataset.type===businessType;const matchesText=card.textContent.toLowerCase().includes(q);const show=matchesType&&matchesText;card.classList.toggle("hidden",!show);if(show)count++;});let empty=document.querySelector(".directory-empty");if(!count){if(!empty){empty=document.createElement("p");empty.className="directory-empty no-results";document.querySelector("#directory-grid")?.after(empty);}empty.textContent="No matching categories. Try another search.";}else if(empty)empty.remove();}
  businessButtons.forEach(btn=>btn.addEventListener("click",()=>{businessButtons.forEach(b=>b.classList.remove("active"));btn.classList.add("active");businessType=btn.dataset.businessFilter;filterBusinesses();}));
  if(search)search.addEventListener("input",filterBusinesses);
  const tripForm=document.querySelector("#trip-form");
  if(tripForm)tripForm.addEventListener("submit",e=>{e.preventDefault();const duration=document.querySelector("#duration").value,pace=document.querySelector("#pace").value,interests=[...tripForm.querySelectorAll('input[type="checkbox"]:checked')].map(x=>x.value);const out=document.querySelector("#itinerary-output");const names={nature:["Begin with a scenic walk","Leave time for the gardens"],culture:["Explore a cultural landmark","Notice the architecture and history"],food:["Make time for local dining","Explore regional flavours"],journal:["Follow a local story","Look for cultural details"]};let selected=interests.length?interests:["nature"];let steps=[];if(duration==="half")steps=selected.slice(0,2);else if(duration==="two")steps=[...selected,...selected.slice(0,2)];else steps=selected.slice(0,3);if(!steps.length)steps=["nature"];out.innerHTML='<span class="eyebrow">YOUR SUGGESTED JOURNEY</span><h3>'+({half:"A half-day to remember",full:"A day at your own pace",two:"Two days of discovery"}[duration])+'</h3><p class="muted">Demo outline · '+({slow:"Slow & relaxed",balanced:"Balanced",active:"Active & curious"}[pace])+' pace. Verify opening times, travel times and access before visiting.</p>'+steps.map((key,i)=>'<div class="itinerary-step"><span>'+String(i+1).padStart(2,"0")+'</span><div><strong>'+names[key][0]+'</strong><p>'+({nature:"Choose a verified lakeside route or scenic garden visit.",culture:"Check current visitor information for a cultural site.",food:"Find a dining option through verified local listings.",journal:"Add a museum, craft, community or destination story."}[key])+'</p></div></div>').join('')+'<a class="under-link" href="businesses.html">Explore local partner categories ↗</a>';});
  const partnerForm=document.querySelector("#partner-form");
  if(partnerForm)partnerForm.addEventListener("submit",e=>{e.preventDefault();const status=document.querySelector("#partner-status");status.textContent="Demo preview only — your details have not been sent or saved. A live version will need a secure submission service.";});
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("fade-in");observer.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll(".section-wrap,.experience-card,.local-card").forEach(el=>observer.observe(el));
  }
});

// Small, playful experience pop-ups on the Paradise View homepage.
const experienceDetails = {
  boat: {
    kicker: 'ON THE WATER', title: 'A boat ride kind of day.',
    fun: 'Your camera roll called. It wants lake views.',
    description: 'Make time for a waterside outing and enjoy a different perspective on Yangzhou’s bridges, gardens and calm scenery. Boat services and routes vary, so confirm what is available on the day.',
    link: 'experiences.html'
  },
  gardens: {
    kicker: 'SLOW DOWN A LITTLE', title: 'Take the scenic way.',
    fun: 'No rush. The best corners are worth finding.',
    description: 'Wander through traditional garden spaces, pause beside the water and look out for the details—stonework, pavilions, plants and views—that make Yangzhou memorable.',
    link: 'discover.html'
  },
  food: {
    kicker: 'TASTE YANGZHOU', title: 'Follow your appetite.',
    fun: 'One more local bite? That’s part of the plan.',
    description: 'Explore Yangzhou’s food culture, discover local dining options and make room in your itinerary for a relaxed meal. Check opening hours and menus directly with each venue.',
    link: 'businesses.html'
  },
  culture: {
    kicker: 'CULTURE & HERITAGE', title: 'Every place has a story.',
    fun: 'Come curious. Leave with a story of your own.',
    description: 'Explore Yangzhou’s traditional architecture, garden details and cultural character. Use verified visitor information to choose places that are open and suitable for your visit.',
    link: 'experiences.html#culture'
  }
};
const experienceModal = document.getElementById('experienceModal');
if (experienceModal) {
  const closeExperienceModal = () => { experienceModal.classList.remove('is-open'); experienceModal.setAttribute('aria-hidden', 'true'); };
  document.querySelectorAll('[data-popup]').forEach(button => button.addEventListener('click', () => {
    const detail = experienceDetails[button.dataset.popup];
    if (!detail) return;
    document.getElementById('experienceModalKicker').textContent = detail.kicker;
    document.getElementById('experienceModalTitle').textContent = detail.title;
    document.getElementById('experienceModalFun').textContent = detail.fun;
    document.getElementById('experienceModalDescription').textContent = detail.description;
    document.getElementById('experienceModalLink').href = detail.link;
    experienceModal.classList.add('is-open');
    experienceModal.setAttribute('aria-hidden', 'false');
    const closeButton = experienceModal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
  }));
  experienceModal.querySelectorAll('[data-close-popup]').forEach(button => button.addEventListener('click', closeExperienceModal));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeExperienceModal(); });
}


// Resilient image recovery: try a relevant backup photo before the local fallback.
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', function handleImageError() {
    const alt = (this.alt || '').toLowerCase();
    const candidates = /food|cuisine|dish|dining|meal|flavour/.test(alt)
      ? ['https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80',
         'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80']
      : /temple|architecture|pagoda|building|pavilion|museum|heritage/.test(alt)
      ? ['https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=80',
         'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80']
      : ['https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80',
         'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=80'];
    const next = Number(this.dataset.fallbackStep || 0);
    if (next < candidates.length) {
      this.dataset.fallbackStep = String(next + 1);
      this.dataset.fallbackApplied = 'true';
      this.src = candidates[next];
      return;
    }
    if (this.dataset.localFallbackApplied) return;
    this.dataset.localFallbackApplied = 'true';
    this.classList.add('image-fallback');
    this.alt = (this.alt || 'Paradise View destination image') + ' (illustrative fallback image)';
    this.removeAttribute('srcset');
    this.src = 'image-fallback.svg';
  });
});

// Resilient interactive Yangzhou map: CDN fallback, two tile providers, accessible external map links.
function initYangzhouMap() {
  const el = document.getElementById('yangzhou-map');
  if (!el) return;
  if (typeof L === 'undefined') {
    if (el.dataset.leafletLoading === '1') return;
    el.dataset.leafletLoading = '1';
    const loader = document.createElement('script');
    loader.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    loader.crossOrigin = 'anonymous';
    loader.onload = function () { el.dataset.leafletLoading = '0'; initYangzhouMap(); };
    loader.onerror = function () {
      el.dataset.leafletLoading = '0';
      el.innerHTML = '<div class="map-fallback"><strong>The interactive map could not load on this connection.</strong><p>You can still open the live map directly or search for the attractions below.</p><a href="https://www.openstreetmap.org/#map=13/32.395/119.425" target="_blank" rel="noopener noreferrer">Open Yangzhou map ↗</a><p><a href="https://www.google.com/maps/search/?api=1&query=Yangzhou+China" target="_blank" rel="noopener noreferrer">Open Google Maps ↗</a></p></div>';
      const status = document.getElementById('map-status');
      if (status) status.textContent = 'Map provider scripts are blocked on this connection. Use the direct map links.';
    };
    document.head.appendChild(loader);
    return;
  }
  if (el.dataset.mapInitialized === '1') return;
  el.dataset.mapInitialized = '1';
  const status = document.getElementById('map-status');
  const map = L.map(el, { scrollWheelZoom: false, preferCanvas: true }).setView([32.395, 119.425], 13);
  window.paradiseViewMap = map;
  const carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 20, attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  });
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  let activeProvider = 'carto', fallbackUsed = false, errors = 0;
  carto.addTo(map);
  function tileError() {
    errors += 1;
    if (errors < 3) return;
    if (!fallbackUsed) {
      fallbackUsed = true;
      errors = 0;
      if (activeProvider === 'carto') {
        activeProvider = 'osm';
        map.removeLayer(carto);
        osm.addTo(map);
      } else {
        if (status) status.textContent = 'Map markers are ready, but map tiles are blocked. Use OpenStreetMap or Google Maps in a new tab.';
      }
    } else if (status) {
      status.textContent = 'Map markers are ready, but map tiles are blocked. Use the direct map links below.';
    }
  }
  carto.on('tileerror', tileError);
  osm.on('tileerror', tileError);
  const places = [
    {name:'Slender West Lake',cn:'瘦西湖',coords:[32.4126,119.4150],type:'Landscape',desc:'Signature lakeside scenery, bridges and garden views.',search:'Slender West Lake Yangzhou'},
    {name:'Daming Temple',cn:'大明寺',coords:[32.4250,119.4070],type:'Temple & heritage',desc:'Historic temple complex north of the lake. Respect worshippers and site rules.',search:'Daming Temple Yangzhou'},
    {name:'Ge Garden',cn:'个园',coords:[32.3990,119.4420],type:'Classical garden',desc:'Known for bamboo and seasonal rockery landscapes.',search:'Ge Garden Yangzhou'},
    {name:'He Garden',cn:'何园',coords:[32.3860,119.4490],type:'Classical garden',desc:'Historic residence and garden architecture.',search:'He Garden Yangzhou'},
    {name:'Dongguan Street',cn:'东关街',coords:[32.3975,119.4445],type:'Historic street',desc:'Old-town lanes, local shops and food discovery.',search:'Dongguan Street Yangzhou'},
    {name:'China Grand Canal Museum',cn:'中国大运河博物馆',coords:[32.3730,119.4240],type:'Museum',desc:'Museum exploring the history and culture of the Grand Canal. Check reservation requirements.',search:'China Grand Canal Museum Yangzhou'},
    {name:'Wenchang Pavilion',cn:'文昌阁',coords:[32.3935,119.4315],type:'City landmark',desc:'Central Yangzhou landmark and useful orientation point.',search:'Wenchang Pavilion Yangzhou'},
    {name:'Yangzhou Ancient Canal',cn:'扬州古运河',coords:[32.3900,119.4495],type:'Waterfront heritage',desc:'Explore canal-side heritage; check local access and cruise availability.',search:'Yangzhou Ancient Canal'}
  ];
  window.paradiseViewPlaces = places;
  window.paradiseViewMarkers = [];
  places.forEach(function (place) {
    const marker = L.marker(place.coords).addTo(map);
    const url = 'https://www.openstreetmap.org/search?query=' + encodeURIComponent(place.search);
    marker.bindPopup('<div class="map-popup"><strong>' + place.name + '</strong><span>' + place.cn + ' · ' + place.type + '</span><p>' + place.desc + '</p><a href="' + url + '" target="_blank" rel="noopener noreferrer">Details &amp; directions ↗</a></div>');
    window.paradiseViewMarkers.push({marker:marker, place:place});
  });
  const bounds = L.latLngBounds(places.map(function (p) { return p.coords; }));
  window.paradiseViewBounds = bounds;
  map.fitBounds(bounds.pad(.12));
  setTimeout(function () { map.invalidateSize(); }, 300);
  if (status) status.textContent = places.length + ' attraction locations loaded. Map tiles are loading; select a pin for details.';
  document.querySelectorAll('[data-map-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = button.dataset.mapFilter;
      document.querySelectorAll('[data-map-filter]').forEach(function (x) { x.classList.toggle('active', x === button); });
      const visible = [];
      window.paradiseViewMarkers.forEach(function (item) {
        const show = filter === 'all' || item.place.type === filter;
        if (show) { if (!map.hasLayer(item.marker)) item.marker.addTo(map); visible.push(item.place.coords); }
        else if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
      });
      if (visible.length) map.fitBounds(L.latLngBounds(visible).pad(.18));
      if (status) status.textContent = visible.length + ' location' + (visible.length === 1 ? '' : 's') + ' shown. Select a marker for details.';
    });
  });
  const reset = document.getElementById('map-reset');
  if (reset) reset.addEventListener('click', function () {
    document.querySelectorAll('[data-map-filter]').forEach(function (x) { x.classList.toggle('active', x.dataset.mapFilter === 'all'); });
    window.paradiseViewMarkers.forEach(function (item) { item.marker.addTo(map); });
    map.fitBounds(bounds.pad(.12));
    if (status) status.textContent = places.length + ' attraction locations loaded. Select a pin for details.';
  });
  window.addEventListener('resize', function () { map.invalidateSize(); }, {passive:true});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initYangzhouMap);
else initYangzhouMap();


// Keep Google Translate's visitor language when moving between local pages.
(function persistentLanguagePreference() {
  const key = 'paradiseViewLanguage';
  function setCookie(lang) {
    try { if (lang && lang !== 'en') document.cookie = 'googtrans=' + encodeURIComponent('/en/' + lang) + '; path=/; SameSite=Lax'; else document.cookie = 'googtrans=; Max-Age=0; path=/; SameSite=Lax'; } catch (_) {}
  }
  function applySavedLanguage() {
    let saved = ''; try { saved = localStorage.getItem(key) || ''; } catch (_) {}
    if (!saved || saved === 'en') return false;
    setCookie(saved);
    const select = document.querySelector('#google_translate_element select.goog-te-combo');
    if (select && select.value !== saved) { select.value = saved; select.dispatchEvent(new Event('change', { bubbles: true })); return true; }
    return !!select;
  }
  window.paradiseRestoreLanguage = applySavedLanguage;
  document.addEventListener('change', function (event) {
    const select = event.target;
    if (!select || !select.matches || !select.matches('#google_translate_element select.goog-te-combo')) return;
    const lang = select.value || 'en'; try { localStorage.setItem(key, lang); } catch (_) {} setCookie(lang);
  }, true);
  const host = document.getElementById('google_translate_element');
  if (host && 'MutationObserver' in window) { const observer = new MutationObserver(function () { if (applySavedLanguage()) observer.disconnect(); }); observer.observe(host, { childList: true, subtree: true }); }
  applySavedLanguage(); window.addEventListener('pageshow', applySavedLanguage);
})();