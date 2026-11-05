(function(){
  "use strict";

  /* ---------- Header scroll state ---------- */
  var hdr = document.getElementById('hdr');
  function onScroll(){
    if(window.scrollY > 40){ hdr.classList.add('scrolled'); }
    else { hdr.classList.remove('scrolled'); }
    var tt = document.getElementById('toTop');
    if(tt){ tt.classList.toggle('show', window.scrollY > 600); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  function closeDrawer(){
    drawer.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function(){
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  Array.prototype.forEach.call(drawer.querySelectorAll('a'), function(a){
    a.addEventListener('click', closeDrawer);
  });

  /* ---------- Hero slider ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsBox = document.getElementById('dots');
  var idx = 0, timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach(function(_, i){
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role','tab');
    b.setAttribute('aria-label','Go to slide ' + (i+1));
    if(i === 0){ b.classList.add('active'); }
    b.addEventListener('click', function(){ go(i); restart(); });
    dotsBox.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsBox.children);

  function go(n){
    idx = (n + slides.length) % slides.length;
    slides.forEach(function(s,i){ s.classList.toggle('active', i === idx); });
    dots.forEach(function(d,i){ d.classList.toggle('active', i === idx); });
    var now = document.getElementById('slideNow');
    if(now){ now.textContent = ('0' + (idx + 1)).slice(-2); }
  }
  function next(){ go(idx + 1); }
  function prev(){ go(idx - 1); }
  function restart(){
    if(timer){ clearInterval(timer); }
    if(!reduce){ timer = setInterval(next, 5000); }
  }
  restart();

  var hPrev = document.getElementById('heroPrev');
  var hNext = document.getElementById('heroNext');
  if(hPrev){ hPrev.addEventListener('click', function(){ prev(); restart(); }); }
  if(hNext){ hNext.addEventListener('click', function(){ next(); restart(); }); }

  /* pause on hover */
  var heroEl = document.querySelector('.hero');
  if(heroEl && !reduce){
    heroEl.addEventListener('mouseenter', function(){ if(timer){ clearInterval(timer); timer = null; } });
    heroEl.addEventListener('mouseleave', restart);
  }

  /* ---------- Page loader ---------- */
  var loader = document.getElementById('loader');
  function hideLoader(){ if(loader){ loader.classList.add('done'); } }
  window.addEventListener('load', function(){ setTimeout(hideLoader, 350); });
  setTimeout(hideLoader, 2200);

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if(toTop){
    toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
  }

  /* ---------- Stat counters ---------- */
  var stats = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function runCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if(reduce){ el.textContent = String(target); return; }
    var start = null, dur = 1600;
    function step(ts){
      if(start === null){ start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if(p < 1){ requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveal ---------- */
  var rvs = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    rvs.forEach(function(el){ io.observe(el); });
  } else {
    rvs.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Counters trigger ---------- */
  if('IntersectionObserver' in window){
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ runCount(e.target); io2.unobserve(e.target); }
      });
    }, {threshold:0.5});
    stats.forEach(function(el){ io2.observe(el); });
  } else {
    stats.forEach(runCount);
  }

  /* ---------- Portfolio filters ---------- */
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('#filters button'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.gal-item'));
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      items.forEach(function(it){
        var cats = (it.getAttribute('data-cat') || '').split(/\s+/);
        var show = (f === 'all') || cats.indexOf(f) !== -1;
        it.classList.toggle('hide', !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbTitle = document.getElementById('lbTitle');
  var lbCat = document.getElementById('lbCat');
  var cur = 0;

  function visibleItems(){
    return items.filter(function(it){ return !it.classList.contains('hide'); });
  }
  function openLb(item){
    var list = visibleItems();
    cur = list.indexOf(item);
    if(cur < 0){ cur = 0; }
    render(list);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function render(list){
    if(!list.length){ return; }
    var it = list[cur];
    var src = it.getAttribute('data-img');
    if(window.matchMedia('(max-width:760px)').matches){
      var mob = it.getAttribute('data-img-m');
      if(mob){ src = mob; }
    }
    var img = it.querySelector('img');
    lbImg.setAttribute('src', src);
    lbImg.setAttribute('alt', img ? img.getAttribute('alt') : '');
    lbTitle.textContent = it.getAttribute('data-title') || '';
    lbCat.textContent = it.getAttribute('data-cat-label') || '';
  }
  function stepLb(d){
    var list = visibleItems();
    if(!list.length){ return; }
    cur = (cur + d + list.length) % list.length;
    render(list);
  }
  function closeLb(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  items.forEach(function(it){
    it.addEventListener('click', function(){ openLb(it); });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(e){ e.stopPropagation(); stepLb(-1); });
  document.getElementById('lbNext').addEventListener('click', function(e){ e.stopPropagation(); stepLb(1); });
  lb.addEventListener('click', function(e){ if(e.target === lb){ closeLb(); } });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')){ return; }
    if(e.key === 'Escape'){ closeLb(); }
    else if(e.key === 'ArrowLeft'){ stepLb(-1); }
    else if(e.key === 'ArrowRight'){ stepLb(1); }
  });

  /* ---------- Lead form (front-end only) ---------- */
  var form = document.getElementById('leadForm');
  var ok = document.getElementById('formOk');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('fName');
    var phone = document.getElementById('fPhone');
    var valid = true;
    [name, phone].forEach(function(f){
      if(!f.value.trim()){ f.style.borderColor = '#c0563f'; valid = false; }
      else { f.style.borderColor = ''; }
    });
    if(!valid){ return; }
    ok.classList.add('show');
    form.reset();
  });

  /* ---------- Share ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    if(toastTimer){ clearTimeout(toastTimer); }
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2600);
  }
  function pageUrl(){
    return window.location.href.split('#')[0];
  }
  function sharePage(){
    var url = pageUrl();
    var data = {
      title: 'Molecule Architects & Interior Designers — Lucknow',
      text: 'Luxury architecture and interior design studio in Sharda Nagar, Lucknow.',
      url: url
    };
    if(navigator.share){
      navigator.share(data).catch(function(){ /* user cancelled */ });
      return;
    }
    copyUrl(url);
  }
  function copyUrl(url){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(function(){
        showToast('Link copied to clipboard');
      }).catch(function(){ legacyCopy(url); });
    } else {
      legacyCopy(url);
    }
  }
  function legacyCopy(url){
    var ta = document.createElement('textarea');
    ta.value = url;
    ta.setAttribute('readonly','');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('Link copied to clipboard'); }
    catch(err){ showToast('Copy this link: ' + url); }
    document.body.removeChild(ta);
  }

  ['shareTop','shareMain','shareDrawer','shareFoot'].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.addEventListener('click', sharePage); }
  });
  document.getElementById('copyLink').addEventListener('click', function(){ copyUrl(pageUrl()); });

  /* WhatsApp share link gets the live page URL */
  var waShare = document.getElementById('waShare');
  if(waShare){
    waShare.setAttribute('href', 'https://wa.me/?text=' + encodeURIComponent('Molecule Architects & Interior Designers — Lucknow: ' + pageUrl()));
  }

  /* ---------- Year ---------- */
  document.getElementById('yr').textContent = String(new Date().getFullYear());
})();
