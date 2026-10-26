(()=>{"use strict";
  document.addEventListener("DOMContentLoaded",()=>{
    const hero=document.querySelector(".hero-image,.page-hero>img");
    if(hero){hero.loading="eager";hero.fetchPriority="high";hero.decoding="async";}
    document.querySelectorAll("img").forEach(img=>{img.decoding="async";if(img!==hero&&!img.hasAttribute("loading"))img.loading="lazy";});
    document.querySelectorAll('iframe[src*="canva.com/design"]').forEach((frame,index)=>{
      frame.setAttribute("allow","autoplay; fullscreen; picture-in-picture; encrypted-media");
      frame.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
      if(index===0)frame.loading="eager";
    });
    const map=window.paradiseViewMap;
    const status=document.getElementById("map-status");
    if(map){
      map.on("tileerror",()=>{if(status)status.textContent="Map pins are available, but some map tiles failed to load. Check your connection or open the full OpenStreetMap view.";});
      map.on("load",()=>{if(status&&!status.textContent.includes("failed"))status.textContent="Interactive map ready. Select a marker for details, then filter attractions above.";});
    }
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{if(!a.rel.includes("noopener"))a.rel=(a.rel+" noopener noreferrer").trim();});
  });
})();