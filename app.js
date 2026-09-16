const drawings = [
  {id:'01-design-brief',n:'01',title:'Design General Notes',caption:'Design basis, influent/effluent criteria, selected process train and key unit dimensions.'},
  {id:'02-general-layout',n:'02',title:'General Plant Layout',caption:'Site-wide arrangement of the main and auxiliary treatment structures.'},
  {id:'03-piping-layout',n:'03',title:'Process Piping Layout',caption:'Plant-wide process piping routes and pipe/material schedule.'},
  {id:'04-hydraulic-profile',n:'04',title:'Hydraulic Profile',caption:'Working water levels and hydraulic connection of the water and sludge lines.'},
  {id:'05-aao-plan-section',n:'05',title:'A²/O Biological Tank · Plan & Sections',caption:'Anaerobic, anoxic and aerobic reactor configuration with structural sections.'},
  {id:'06-aeration-system',n:'06',title:'A²/O Aeration System',caption:'Diffuser and air-distribution arrangement for the aerobic zone.'},
  {id:'07-secondary-clarifier',n:'07',title:'Secondary Clarifier · Plan & Sections',caption:'Circular clarifier plan, sections and equipment schedule.'},
  {id:'08-hds-plan',n:'08',title:'High-Density Sedimentation · Plan',caption:'Tertiary sedimentation plan showing mixing, flocculation and settling zones.'},
  {id:'09-hds-section',n:'09',title:'High-Density Sedimentation · Sections',caption:'Sectional design and equipment arrangement for the tertiary settling unit.'},
  {id:'10-contact-disinfection',n:'10',title:'Contact Disinfection Tank',caption:'Baffled contact tank flow path, sections and equipment schedule.'},
  {id:'11-coarse-screen-pump',n:'11',title:'Coarse Screen & Lift Pumping Station',caption:'Preliminary treatment and influent lift station with pump duties and equipment list.'}
];

const gallery = document.getElementById('gallery');
drawings.forEach(d => {
  const card = document.createElement('article');
  card.className = 'gallery-card';
  card.dataset.viewer = d.id;
  card.innerHTML = `<div class="gallery-image"><img src="assets/thumbs/${d.id}.webp" alt="${d.title}" loading="lazy"></div><div class="gallery-body"><span class="gallery-num">DRAWING ${d.n}</span><h3>${d.title}</h3><p>${d.caption}</p></div>`;
  gallery.appendChild(card);
});

const viewer = document.getElementById('viewer');
const viewerImage = document.getElementById('viewerImage');
const viewerTitle = document.getElementById('viewerTitle');
const viewerIndex = document.getElementById('viewerIndex');
const viewerCaption = document.getElementById('viewerCaption');
let current = 0;

function openViewer(id){
  current = Math.max(0, drawings.findIndex(d=>d.id===id));
  renderViewer();
  viewer.classList.add('open');
  viewer.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeViewer(){
  viewer.classList.remove('open');
  viewer.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function renderViewer(){
  const d=drawings[current];
  viewerImage.src=`assets/drawings/${d.id}.webp`;
  viewerImage.alt=d.title;
  viewerTitle.textContent=d.title;
  viewerIndex.textContent=`${d.n} / ${String(drawings.length).padStart(2,'0')}`;
  viewerCaption.textContent=d.caption;
  document.querySelector('.viewer-scroll').scrollTo({top:0,left:0});
}
function step(delta){ current=(current+delta+drawings.length)%drawings.length; renderViewer(); }

document.addEventListener('click', e=>{
  const trigger=e.target.closest('[data-viewer]');
  if(trigger) openViewer(trigger.dataset.viewer);
  const explicit=e.target.closest('[data-open-drawing]');
  if(explicit) openViewer(explicit.dataset.openDrawing);
});
document.getElementById('viewerClose').addEventListener('click',closeViewer);
document.getElementById('viewerPrev').addEventListener('click',()=>step(-1));
document.getElementById('viewerNext').addEventListener('click',()=>step(1));
viewer.addEventListener('click',e=>{if(e.target===viewer) closeViewer();});
document.addEventListener('keydown',e=>{if(!viewer.classList.contains('open')) return; if(e.key==='Escape')closeViewer(); if(e.key==='ArrowLeft')step(-1); if(e.key==='ArrowRight')step(1);});

document.querySelectorAll('.tab-button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});
    document.querySelectorAll('.tab-panel').forEach(p=>{p.classList.remove('active');p.hidden=true});
    btn.classList.add('active');btn.setAttribute('aria-selected','true');
    const panel=document.getElementById(`tab-${btn.dataset.tab}`);panel.hidden=false;panel.classList.add('active');
  });
});
