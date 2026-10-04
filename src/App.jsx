import { useState } from "react";
import {
  CONFIG, PRICES, NAMES, STORY, SPECIALITY, BEST_FIT, TESTIMONIALS, PROJECTS,
} from "./data.js";

const pkr = (n) => n.toLocaleString("en-US");
const WA_HELLO = encodeURIComponent("Hi Ayesha, I saw your portfolio and I'd like to talk about a website.");

const WA_PATH_1 = "M16 4a12 12 0 0 0-10.3 18L4 28l6.2-1.6A12 12 0 1 0 16 4z";
const WA_PATH_2 = "M12 10c-.7 0-1.6 1-1.6 2.2 0 3.6 4.7 8.3 8.3 8.3 1.2 0 2.2-.9 2.2-1.6l-2.6-1.6-1.5 1c-1.7-.7-3.4-2.4-4.1-4.1l1-1.5L12 10z";

const ICONS = {
  whatsapp: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d={WA_PATH_1} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d={WA_PATH_2} fill="currentColor" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
};

function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#top">Ayesha<i>.</i></a>
        <div className="links">
          <a href="#about">About</a>
          <a href="#difference">The difference</a>
          <a href="#estimate">Estimate</a>
          <a href="#work">Work</a>
          <a className="pill" href="#contact">Hire me</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="aurora" aria-hidden="true"><b></b><b></b><b></b></div>
      <div className="lattice" aria-hidden="true"></div>
      <div className="wrap">
        <div className="hero-grid has-photo" id="heroGrid">
          <div>
            <div className="status"><span className="dot"></span> Taking new projects, Lahore or remote</div>
            <h1>
              <span>Your business</span> <span>deserves a site</span> <span>that looks <em>serious.</em></span>
            </h1>
            <p className="sub">
              I'm Ayesha Nadeem, a Full Stack web developer in Lahore. I build <strong>business websites and web apps</strong> that look sharp on every phone, load fast and bring customers to you.
            </p>
            <div className="cta">
              <a className="btn fill" href="#contact">Start a project</a>
              <a className="btn" href="#estimate">Get a quick estimate</a>
            </div>
          </div>
          <img className="photo on" id="photo" alt="Portrait of Ayesha Nadeem" src="/images/ayesha.jpg" />
        </div>
      </div>
    </header>
  );
}

function BeforeAfter() {
  const [p, setP] = useState(50);
  return (
    <section className="ba" id="difference">
      <div className="wrap">
        <h2>See the difference</h2>
        <p className="lede">Same bakery, same information. Drag the slider to compare an old-style website with the kind I build.</p>
        <div className="frame" id="frame" style={{ "--p": p + "%" }}>
          <div className="layer after">
            <div className="neu">
              <div className="top"><b>Noor Bakers</b><span>Order on WhatsApp</span></div>
              <h4>Fresh from the oven, every morning.</h4>
              <p>Naan khatai, cakes and custom orders. Delivered across Lahore.</p>
              <div className="cards">
                <div><b>Naan khatai</b>Box of 12</div>
                <div><b>Chocolate cake</b>1 kg</div>
                <div><b>Custom orders</b>Birthdays, weddings</div>
              </div>
            </div>
          </div>
          <div className="layer before" aria-hidden="true">
            <div className="old">
              <h4>WELCOME TO NOOR BAKERS WEBSITE!!!</h4>
              <div className="mq">*** Best bakery in town *** Call us now ***</div>
              <div className="row">
                <div className="box">Click here for products<br />Click here for contact<br />Click here for more</div>
                <div className="box">Our products are very good and tasty. We make cakes and other items also.</div>
              </div>
              <div className="small"><span className="blink">UNDER CONSTRUCTION</span> | You are visitor no. 000124</div>
            </div>
          </div>
          <span className="tag l">Before</span><span className="tag r">After</span>
          <div className="handle"></div>
          <input
            type="range" id="slider" min="0" max="100" value={p}
            onChange={(e) => setP(Number(e.target.value))}
            aria-label="Compare before and after website design"
          />
        </div>
        <p className="caption">This is a concept design for a made-up bakery, not a real client.</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="wrap">
        <h2>Who you'll be working with</h2>
        <div className="about">
          <div className="story" id="story">
            {STORY.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <aside className="fit">
            <h3>My speciality</h3>
            <p id="speciality">{SPECIALITY}</p>
            <h3>I enjoy working with</h3>
            <ul id="fitList">
              {BEST_FIT.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    ["Business website", "Pages for your services, prices, location and contact, designed to work on every phone.", "HTML, CSS, JavaScript, React"],
    ["Portfolio or landing page", "One focused page that shows your work and makes it easy for people to message you.", "React, responsive design"],
    ["Web app with login and data", "Customer accounts, forms, dashboards and admin panels that save to a real database.", "MongoDB, Express, React, Node"],
    ["Basic on-page SEO", "Clear titles, descriptions and page structure so Google can understand your site.", "On-page SEO"],
  ];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>What I build for you</h2>
        <p className="lede">Tell me what your business needs. I'll suggest the simplest thing that works.</p>
        <div className="grid">
          {items.map(([h, p, t]) => (
            <div className="svc" key={h}><h3>{h}</h3><p>{p}</p><span className="tag2">{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Estimate() {
  const [type, setType] = useState("business");
  const [adds, setAdds] = useState([]);
  const toggle = (v) => setAdds((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));

  let lo = PRICES.types[type][0];
  let hi = PRICES.types[type][1];
  adds.forEach((a) => { lo += PRICES.addons[a][0]; hi += PRICES.addons[a][1]; });

  const msg =
    `Hi Ayesha, I'd like a ${NAMES[type]}` +
    (adds.length ? ` with ${adds.map((a) => NAMES[a]).join(", ")}` : "") +
    `. Your estimate was PKR ${pkr(lo)} to ${pkr(hi)}. Can we talk?`;

  let sendProps = { href: "#contact" };
  if (CONFIG.whatsapp) {
    sendProps = { href: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, target: "_blank", rel: "noopener" };
  } else if (CONFIG.email) {
    sendProps = { href: `mailto:${CONFIG.email}?subject=${encodeURIComponent("Project estimate")}&body=${encodeURIComponent(msg)}` };
  }

  const types = [
    ["landing", "Landing page", "One page, clear message, contact button"],
    ["business", "Business website", "4 to 6 pages: home, services, about, contact"],
    ["webapp", "Web app", "Logins, database, custom features"],
  ];
  const addons = [
    ["seo", "On-page SEO", "Titles, descriptions, page structure"],
    ["contact", "Contact form and WhatsApp button", "Customers reach you in one tap"],
    ["admin", "Admin panel", "Update your own content without code"],
  ];
  const rows = [type, ...adds];

  return (
    <section className="calc" id="estimate">
      <div className="wrap">
        <h2>Get a quick estimate</h2>
        <p className="lede">Pick what you need. You'll see a rough price range right away, no signup.</p>
        <div className="calc-box">
          <div>
            <fieldset>
              <legend>What are you building?</legend>
              {types.map(([v, b, s]) => (
                <label className="opt" key={v}>
                  <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} />
                  <span><b>{b}</b><small>{s}</small></span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Add-ons</legend>
              {addons.map(([v, b, s]) => (
                <label className="opt" key={v}>
                  <input type="checkbox" name="addon" value={v} checked={adds.includes(v)} onChange={() => toggle(v)} />
                  <span><b>{b}</b><small>{s}</small></span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className="result" aria-live="polite">
            <small>Estimated price</small>
            <div className="price" id="price">PKR {pkr(lo)} to {pkr(hi)}</div>
            <ul id="breakdown">
              {rows.map((k) => {
                const r = PRICES.types[k] || PRICES.addons[k];
                return <li key={k}>{NAMES[k]}: PKR {pkr(r[0])} to {pkr(r[1])}</li>;
              })}
            </ul>
            <a className="btn fill" id="sendEst" {...sendProps}>Send this to Ayesha</a>
            <p className="note">This is a rough range. The final price is confirmed after we talk about your project.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Flow() {
  const nodes = [
    ["Customer opens your page", "They see a clean page that fits their phone.", "React, HTML, CSS"],
    ["They click or submit a form", "The page sends their request to your server.", "REST API"],
    ["Your server handles it", "Checks the login, applies your rules, prepares the answer.", "Node.js, Express"],
    ["Your data is saved", "Orders, messages and accounts are stored and found fast.", "MongoDB"],
  ];
  return (
    <section>
      <div className="wrap">
        <h2>What "full stack" means for your site</h2>
        <p className="lede">One person can build every layer a website needs. Here's what happens when a customer uses it.</p>
        <div className="flow">
          {nodes.map(([h, p, t]) => (
            <div className="node" key={h}><h3>{h}</h3><p>{p}</p><span className="tech">{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const real = PROJECTS.filter((p) => !p.placeholder);
  const list = real.length ? real : PROJECTS;
  return (
    <section id="work" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>Selected work</h2>
        <p className="lede">Self-initiated demo projects, labelled as such. Live links and source code appear on each card when available.</p>
        <div className="grid" id="projects">
          {list.map((p) =>
            p.placeholder ? (
              <article className="proj empty" key={p.title || "placeholder"}>
                <div className="shot">Project screenshot</div>
                <div className="body">
                  <h3>Your next project here</h3>
                  <p>Add a real project in the PROJECTS list in src/data.js, with a live link and your GitHub code.</p>
                </div>
              </article>
            ) : (
              <article className="proj" key={p.title}>
                <div className="shot">
                  {p.image ? <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" /> : p.title}
                </div>
                <div className="body">
                  {p.label && <span className="lab">{p.label}</span>}
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="chips">{(p.tech || []).map((t) => <span key={t}>{t}</span>)}</div>
                  <div className="row">
                    {p.live && <a href={p.live} target="_blank" rel="noopener">Live demo</a>}
                    {p.code && <a href={p.code} target="_blank" rel="noopener">Source code</a>}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section id="feedback" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>What people say</h2>
        <p className="lede">Feedback from people I've built for.</p>
        <div className="grid" id="quotes">
          {TESTIMONIALS.map((q, i) => (
            <figure className="quote" key={i}>
              {q.label && <span className="lab">{q.label}</span>}
              <p>&ldquo;{q.text}&rdquo;</p>
              <figcaption className="who">{q.name}{q.role && <small>{q.role}</small>}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const core = ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"];
  const other = ["JavaScript (ES6+)", "HTML5", "CSS3", "Responsive design", "MySQL", "Git and GitHub", "Prompt engineering", "On-page SEO", "Microsoft Excel"];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>Skills</h2>
        <p className="lede">The MERN stack is where I work every day. The rest supports it.</p>
        <div className="skills">
          {core.map((s) => <span className="core" key={s}>{s}</span>)}
          {other.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>Training and certificates</h2>
        <p className="lede">Where I learned, and the proof.</p>
        <div className="rows">
          <div className="edu"><h3>Full Stack Web Development (MERN)</h3><div className="meta">Arfa Software Technology Park, Lahore. Certificate program, March to September 2026.</div></div>
          <div className="edu"><h3>Start Writing Prompts like a Pro</h3><div className="meta">Google, offered through Coursera. Completed March 2026. <a href="https://coursera.org/verify/YXYIEEXEI4J1" target="_blank" rel="noopener">Verify this certificate</a></div></div>
          <div className="edu"><h3>Matriculation, Science with Computer Science</h3><div className="meta">Tehzeeb ul Atfal High School. 1014 out of 1100 marks (92.2%).</div></div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["We talk", "You explain your business and what the site must do. I send a clear plan and price."],
    ["You see a demo", "I share a first design before the full build, so changes are cheap and early."],
    ["I build it", "You get regular updates. Revisions are agreed in writing beforehand."],
    ["We launch", "I put it online, test it on phones and show you how to manage it."],
  ];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>How we'd work together</h2>
        <p className="lede">A simple process, so you always know what happens next.</p>
        <div className="steps">
          {steps.map(([h, p]) => <div className="step" key={h}><h3>{h}</h3><p>{p}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const btns = [];
  if (CONFIG.whatsapp) btns.push(["whatsapp", "WhatsApp", `https://wa.me/${CONFIG.whatsapp}?text=${WA_HELLO}`, true]);
  if (CONFIG.email) btns.push(["email", "Email", `mailto:${CONFIG.email}?subject=${encodeURIComponent("Website project")}`, false]);
  if (CONFIG.linkedin) btns.push(["linkedin", "LinkedIn", CONFIG.linkedin, true]);
  if (CONFIG.github) btns.push(["github", "GitHub", CONFIG.github, true]);
  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="contact">
          <h2>Have a project in mind?</h2>
          <p>Send me a short message about your business and what you need. I reply personally, usually within a day.</p>
          <div id="contactLinks">
            {btns.length ? (
              btns.map(([key, label, href, ext], i) => (
                <a key={key} className={"btn " + (i ? "" : "fill")} href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>
                  {ICONS[key]}{label}
                </a>
              ))
            ) : (
              <span style={{ color: "#bcd6d1" }}>Add your WhatsApp, email and LinkedIn in src/data.js.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppFloat() {
  if (!CONFIG.whatsapp) return null;
  return (
    <a className="wa-float" target="_blank" rel="noopener"
       href={`https://wa.me/${CONFIG.whatsapp}?text=${WA_HELLO}`}
       aria-label="Chat with Ayesha on WhatsApp">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path d={WA_PATH_1} fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <path d={WA_PATH_2} fill="#fff" />
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <BeforeAfter />
      <About />
      <Services />
      <Estimate />
      <Flow />
      <Projects />
      <Testimonials />
      <Skills />
      <Education />
      <Process />
      <Contact />
      <footer><div className="wrap">Ayesha Nadeem, Full Stack Web Developer, Lahore, Pakistan.</div></footer>
      <WhatsAppFloat />
    </>
  );
}