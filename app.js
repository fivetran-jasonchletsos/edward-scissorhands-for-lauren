const FACTS = [
  { cat: "Making it", title: "It started as a drawing", short: "Tim Burton sketched the character as a lonely teenager.",
    long: "Burton grew up feeling like an outsider in suburban Burbank, California. He drew a thin, wild-haired figure with scissors for hands, a person who longs to touch but hurts whatever he reaches for. Years later it became the film." },
  { cat: "Making it", title: "Caroline Thompson wrote the script", short: "Burton brought the idea, Thompson built the story.",
    long: "Thompson wrote the screenplay from a story she developed with Burton. She went on to write The Nightmare Before Christmas and Corpse Bride, which is why those films share the same bittersweet fairy tale feel." },
  { cat: "Cast", title: "The studio wanted a bigger star", short: "Burton held out for Johnny Depp.",
    long: "Several famous actors were reportedly considered, including Tom Cruise. Burton wanted Depp, who was best known for the TV show 21 Jump Street and was trying to shake his teen idol image. It changed his career." },
  { cat: "Cast", title: "Edward barely talks", short: "Fewer than 200 words of dialogue in the whole film.",
    long: "Depp built the character almost entirely from body language, big sad eyes, and small hesitant movements. Silent film stars like Charlie Chaplin were a common comparison." },
  { cat: "Cast", title: "A legend's last big role", short: "Vincent Price plays the Inventor who made Edward.",
    long: "Price was Burton's childhood hero. Burton had made a short film called Vincent in 1982, narrated by Price. Casting him as Edward's creator was a tribute, and it was one of his final major film roles. He died in 1993." },
  { cat: "Look and sound", title: "Two worlds, two palettes", short: "Pastel suburb on the bottom, black castle on the hill.",
    long: "The neighborhood was shot in a real Florida community near Tampa, and the production painted the houses in candy colors. The castle and Edward are almost entirely black, grey, and white. The contrast is the whole point of the movie." },
  { cat: "Look and sound", title: "The hands were a feat of engineering", short: "Built by Stan Winston's studio.",
    long: "Winston was the effects master behind The Terminator and Jurassic Park. His team built the metal blade hands, and the film earned an Oscar nomination for Best Makeup." },
  { cat: "Look and sound", title: "Danny Elfman's score", short: "Choirs, celesta, and a theme that sounds like snowfall.",
    long: "Elfman scored nearly all of Burton's early films. The cue most fans love is the Ice Dance, the scene where Kim dances beneath falling ice shavings from Edward's sculpture." },
  { cat: "Story", title: "The reason it snows", short: "A fairy tale explanation told by an older Kim.",
    long: "The film is framed as a bedtime story. A grandmother tells her granddaughter that the snow falls because Edward is still up in the castle, carving ice, thinking of her. It is one of the loveliest endings in modern movies." },
  { cat: "Story", title: "He was never finished", short: "The Inventor dies before giving him real hands.",
    long: "The creator is working on Edward's hands when he has a heart attack, leaving a boy with scissors where hands should be. Everything that happens afterward comes from that one unfinished moment." },
  { cat: "Legacy", title: "A real hit", short: "Roughly $20 million to make, over $86 million worldwide.",
    long: "It opened in December 1990 and became a hit and a lasting cult classic. Depp earned a Golden Globe nomination for the role." },
  { cat: "Legacy", title: "It became a ballet", short: "Matthew Bourne's stage version premiered in 2005.",
    long: "Choreographer Matthew Bourne turned the story into a dance production with no dialogue at all, set to music inspired by Elfman's themes. It has toured around the world." },
  { cat: "Legacy", title: "The start of a partnership", short: "Burton and Depp made many films together afterward.",
    long: "Ed Wood, Sleepy Hollow, Charlie and the Chocolate Factory, Corpse Bride, and Sweeney Todd all followed. Burton has often called this his most personal film." }
];

const CAST = [
  { who: "Johnny Depp", role: "Edward", note: "Plays a gentle, half finished man almost without words." },
  { who: "Winona Ryder", role: "Kim", note: "The teenage girl Edward falls for, and the grandmother narrating the tale." },
  { who: "Dianne Wiest", role: "Peg Boggs", note: "The door to door cosmetics saleswoman who brings Edward home." },
  { who: "Vincent Price", role: "The Inventor", note: "Horror icon and Burton's lifelong hero, in a tender final big role." },
  { who: "Alan Arkin", role: "Bill Boggs", note: "The bewildered dad who never quite knows what to do." },
  { who: "Kathy Baker", role: "Joyce", note: "The neighbor who is thrilled by Edward, perhaps too thrilled." }
];

const QUIZ = [
  { q: "Who directed Edward Scissorhands?", a: ["Tim Burton", "Steven Spielberg", "Wes Anderson", "Ron Howard"], c: 0, e: "Tim Burton, and it is among his most personal films." },
  { q: "What explains why it snows in the story?", a: ["A weather machine", "Edward carving ice sculptures", "A magic spell on the town", "Kim's wish"], c: 1, e: "The ice shavings from Edward's sculptures drift down over the town." },
  { q: "Who played the Inventor who created Edward?", a: ["Christopher Lee", "Vincent Price", "Boris Karloff", "Peter Cushing"], c: 1, e: "Vincent Price, Burton's childhood hero." },
  { q: "Roughly how many words does Edward speak in the whole movie?", a: ["Under 200", "About 1,000", "About 3,000", "More than 5,000"], c: 0, e: "Fewer than 200 words. The rest is pure performance." },
  { q: "What did Peg Boggs sell door to door?", a: ["Vacuum cleaners", "Encyclopedias", "Cosmetics", "Candles"], c: 2, e: "Cosmetics, which is how she ends up at the castle. Candles would have been a good pick though." }
];

/* facts grid */
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const cats = ["All", ...new Set(FACTS.map(f => f.cat))];

FACTS.forEach(f => {
  const el = document.createElement("button");
  el.className = "card";
  el.dataset.cat = f.cat;
  el.setAttribute("aria-label", f.title + ". Press to flip.");
  el.innerHTML = `<div class="in">
    <div class="face front"><div><span class="tag">${f.cat}</span><h3>${f.title}</h3><p>${f.short}</p></div><span class="hint">Tap to flip</span></div>
    <div class="face back"><div><span class="tag">${f.cat}</span><p style="margin-top:.7rem">${f.long}</p></div><span class="hint">Tap to flip back</span></div>
  </div>`;
  el.addEventListener("click", () => el.classList.toggle("flip"));
  grid.appendChild(el);
});

cats.forEach((c, i) => {
  const b = document.createElement("button");
  b.textContent = c;
  if (i === 0) b.classList.add("on");
  b.addEventListener("click", () => {
    filters.querySelectorAll("button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    grid.querySelectorAll(".card").forEach(card => {
      card.classList.toggle("hide", c !== "All" && card.dataset.cat !== c);
    });
  });
  filters.appendChild(b);
});

/* random fact */
let last = -1;
document.getElementById("randomBtn").addEventListener("click", () => {
  let i;
  do { i = Math.floor(Math.random() * FACTS.length); } while (i === last);
  last = i;
  document.getElementById("randomOut").textContent = FACTS[i].title + ". " + FACTS[i].short;
});

/* cast */
document.getElementById("castList").innerHTML = CAST.map(p =>
  `<div class="person"><div class="who">${p.who}</div><div class="role">${p.role}</div><p>${p.note}</p></div>`).join("");

/* quiz */
const box = document.getElementById("quizBox");
let qi = 0, score = 0;
function renderQ() {
  if (qi >= QUIZ.length) {
    const msg = score === QUIZ.length ? "Perfect. You are officially finished." :
                score >= 3 ? "Very nice. You clearly know your scissors." : "Not bad. Time for a rewatch with a candle lit.";
    box.innerHTML = `<p class="score">${score} of ${QUIZ.length}</p><p>${msg}</p><button class="btn next" id="again">Play again</button>`;
    document.getElementById("again").onclick = () => { qi = 0; score = 0; renderQ(); };
    return;
  }
  const q = QUIZ[qi];
  box.innerHTML = `<div class="qn">Question ${qi + 1} of ${QUIZ.length}</div><h3>${q.q}</h3>
    <div class="opts">${q.a.map((t, i) => `<button data-i="${i}">${t}</button>`).join("")}</div>
    <p class="explain" id="explain" aria-live="polite"></p>`;
  box.querySelectorAll(".opts button").forEach(b => b.addEventListener("click", () => {
    const pick = +b.dataset.i;
    box.querySelectorAll(".opts button").forEach((x, i) => {
      x.disabled = true;
      if (i === q.c) x.classList.add("right");
      else if (i === pick) x.classList.add("wrong");
    });
    if (pick === q.c) score++;
    document.getElementById("explain").textContent = q.e;
    const n = document.createElement("button");
    n.className = "btn next";
    n.textContent = qi === QUIZ.length - 1 ? "See my score" : "Next question";
    n.onclick = () => { qi++; renderQ(); };
    box.appendChild(n);
  }));
}
renderQ();

/* candle button */
const lightBtn = document.getElementById("lightBtn");
const lightOut = document.getElementById("lightOut");
const smallCandle = document.querySelector(".candle.small");
const notes = [
  "Somewhere, a snowfall just started.",
  "Edward would have loved this one.",
  "Warm light, soft grey evening. Perfect.",
  "Doolies approve."
];
let lit = true, ni = 0;
lightBtn.addEventListener("click", () => {
  lit = !lit;
  smallCandle.classList.toggle("out", !lit);
  lightBtn.textContent = lit ? "Blow it out" : "Light a candle";
  lightOut.textContent = lit ? notes[ni++ % notes.length] : "Until next time.";
});
lightBtn.textContent = "Blow it out";

/* snow */
(function () {
  const c = document.getElementById("snow"), x = c.getContext("2d");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let w, h, flakes = [];
  function size() { w = c.width = innerWidth; h = c.height = innerHeight; }
  size(); addEventListener("resize", size);
  const n = innerWidth < 600 ? 45 : 90;
  for (let i = 0; i < n; i++) flakes.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2.2 + .6, s: Math.random() * .6 + .25, d: Math.random() * Math.PI * 2 });
  (function tick() {
    x.clearRect(0, 0, w, h);
    x.fillStyle = "rgba(255,255,255,.85)";
    flakes.forEach(f => {
      f.y += f.s; f.d += .01; f.x += Math.sin(f.d) * .35;
      if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
      x.beginPath(); x.arc(f.x, f.y, f.r, 0, 6.283); x.fill();
    });
    requestAnimationFrame(tick);
  })();
})();
