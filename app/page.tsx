import { useEffect, useRef, useState } from "react";

const projects = [
  { id: "01", title: "NT GIS", type: "WEB GIS / MONITORING", description: "Developed GIS-based monitoring and interactive map visualization for clearer, location-aware operations.", tags: ["Interactive maps", "Spatial data", "Monitoring"] },
  { id: "02", title: "TRD MA", type: "LAND / VALUATION", description: "Worked with land and geospatial data to support valuation workflows and turn complex spatial information into usable insight.", tags: ["Land data", "GIS workflows", "Analysis"] },
  { id: "03", title: "TRD Integrate", type: "SYSTEMS / BACKEND", description: "Developed backend services for system integration, reliable data processing, and connected operational workflows.", tags: ["Backend", "Integration", "Data pipelines"] },
];

const focusAreas = [
  ["01", "Interactive maps", "Designing map experiences that make spatial information intuitive and useful."],
  ["02", "Geospatial data", "Exploring patterns, relationships, and stories hidden inside location data."],
  ["03", "Spatial systems", "Learning how indexing and data architecture keep large map products fast."],
  ["04", "Remote sensing", "Connecting earth observation data with practical software applications."],
  ["05", "Backend engineering", "Building APIs and services that make complex systems dependable."],
  ["06", "DevOps", "Creating repeatable environments and smoother paths from code to production."],
];

function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void import("three").then((THREE) => {
      if (disposed || !mountRef.current) return;
      const mount = mountRef.current;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 6.4);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 48, 48), new THREE.MeshBasicMaterial({ color: 0x74f7c4, wireframe: true, transparent: true, opacity: 0.16 }));
      sphere.rotation.z = -0.22;
      globeGroup.add(sphere);
      const inner = new THREE.Mesh(new THREE.SphereGeometry(1.97, 48, 48), new THREE.MeshPhongMaterial({ color: 0x071b22, emissive: 0x05231f, transparent: true, opacity: 0.82, shininess: 20 }));
      globeGroup.add(inner);
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.09, 48, 48), new THREE.MeshBasicMaterial({ color: 0x5af0d1, transparent: true, opacity: 0.055, side: THREE.BackSide }));
      globeGroup.add(atmosphere);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x5af0d1, transparent: true, opacity: 0.25 });
      [0.25, 1.12, 2.06].forEach((rotation, index) => {
        const points: InstanceType<typeof THREE.Vector3>[] = [];
        for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; points.push(new THREE.Vector3(Math.cos(a) * (2.35 + index * 0.12), Math.sin(a) * (2.35 + index * 0.12), 0)); }
        const orbit = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial);
        orbit.rotation.set(rotation, rotation * 0.38, rotation * 0.17);
        globeGroup.add(orbit);
      });
      const nodeGeo = new THREE.SphereGeometry(0.035, 10, 10);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xb7ffe7 });
      const nodes: InstanceType<typeof THREE.Mesh>[] = [];
      [[0.52, 0.28], [1.02, -0.42], [1.8, 0.52], [2.6, -0.18], [3.4, 0.7], [4.5, -0.58], [5.3, 0.15]].forEach(([lon, lat], index) => {
        const radius = index % 3 === 0 ? 2.4 : 2.035;
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(radius * Math.cos(lat) * Math.cos(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.sin(lon));
        globeGroup.add(node); nodes.push(node);
      });
      scene.add(new THREE.AmbientLight(0x4b9f94, 2.5));
      const light = new THREE.DirectionalLight(0xa8ffe5, 4); light.position.set(3, 2, 4); scene.add(light);
      let dragging = false; let previousX = 0;
      const onDown = (event: PointerEvent) => { dragging = true; previousX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); };
      const onMove = (event: PointerEvent) => { if (!dragging) return; globeGroup.rotation.y += (event.clientX - previousX) * 0.008; previousX = event.clientX; };
      const onUp = () => { dragging = false; };
      renderer.domElement.addEventListener("pointerdown", onDown); renderer.domElement.addEventListener("pointermove", onMove); renderer.domElement.addEventListener("pointerup", onUp);
      const resize = () => { const { width, height } = mount.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); };
      const observer = new ResizeObserver(resize); observer.observe(mount); resize();
      const animationStart = performance.now(); let frame = 0;
      const render = () => { const elapsed = (performance.now() - animationStart) / 1000; if (!reduceMotion && !dragging) globeGroup.rotation.y += 0.0016; nodes.forEach((node, index) => node.scale.setScalar(1 + Math.sin(elapsed * 2 + index) * 0.35)); renderer.render(scene, camera); frame = requestAnimationFrame(render); };
      render();
      cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.domElement.removeEventListener("pointerdown", onDown); renderer.domElement.removeEventListener("pointermove", onMove); renderer.domElement.removeEventListener("pointerup", onUp); renderer.dispose(); sphere.geometry.dispose(); inner.geometry.dispose(); atmosphere.geometry.dispose(); nodeGeo.dispose(); nodeMat.dispose(); lineMaterial.dispose(); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); };
    });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div className="globe-shell" aria-label="Interactive rotating geospatial data globe. Drag to rotate."><div ref={mountRef} className="globe-canvas" /><div className="globe-label label-a"><span />13.7563° N</div><div className="globe-label label-b"><span />100.5018° E</div><div className="globe-status">LIVE SPATIAL FIELD <i /></div><p className="drag-hint">DRAG TO ROTATE</p></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.15 });
    elements.forEach((element) => observer.observe(element));
    const onScroll = () => document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <main>
    <header className="nav-wrap"><a className="brand" href="#top" aria-label="Phurinat Khrueatan — home"><span className="brand-mark"><img src="./favicon.svg" alt="" /></span><span>PHURINAT<br />KHRUEATAN</span></a><button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button><nav className={menuOpen ? "open" : ""} aria-label="Main navigation"><a href="#about" onClick={closeMenu}>01 / ABOUT</a><a href="#projects" onClick={closeMenu}>02 / PROJECTS</a><a href="#capabilities" onClick={closeMenu}>03 / CAPABILITIES</a><a className="nav-contact" href="#contact" onClick={closeMenu}>LET&apos;S CONNECT ↗</a></nav></header>
    <section className="hero" id="top"><div className="hero-grid" /><div className="hero-copy" data-reveal><p className="eyebrow"><span /> SOFTWARE ENGINEERING × GEOSPATIAL</p><h1>BUILDING<br /><em>WHERE</em> TECH<br />MEETS EARTH.</h1><p className="hero-intro">I&apos;m <strong>Phurinat Khrueatan</strong> — a software engineering student, developer, and GIS enthusiast turning location data into useful, interactive systems.</p><div className="hero-actions"><a className="button primary" href="#projects">EXPLORE MY WORK <span>↓</span></a><a className="text-link" href="#about">MORE ABOUT ME ↘</a></div></div><div className="hero-visual" data-reveal><Globe /></div><div className="hero-foot left">BASED IN THAILAND<br /><span>AVAILABLE FOR COLLABORATION</span></div><div className="hero-foot right">SCROLL TO EXPLORE <span>↓</span></div></section>
    <section className="manifesto" id="about"><div className="section-number">01 / ABOUT</div><div className="manifesto-copy" data-reveal><p className="kicker">MY COORDINATES</p><h2>I DON&apos;T JUST<br />WRITE CODE. I BUILD<br /><em>CONTEXT.</em></h2><p>My work sits at the intersection of software systems and the physical world. I enjoy building interactive maps, exploring geospatial data, and turning complex location information into experiences people can actually use.</p></div><div className="profile-card" data-reveal><div className="portrait-monogram"><span>PK</span><i>SOFTWARE × EARTH</i></div><div className="profile-meta"><span>STATUS</span><strong><i /> LEARNING & BUILDING</strong><span>FOCUS</span><strong>WEB GIS / BACKEND</strong><span>MISSION</span><strong>MAKE SPATIAL DATA USEFUL</strong></div></div></section>
    <section className="focus-section"><div className="section-heading" data-reveal><p className="kicker">WHAT PULLS ME IN</p><h2>AREAS OF<br /><em>EXPLORATION.</em></h2></div><div className="focus-list">{focusAreas.map(([id,title,text]) => <article className="focus-row" key={id} data-reveal><span>{id}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>)}</div></section>
    <section className="projects-section" id="projects"><div className="project-grid-bg" /><div className="section-number light">02 / SELECTED EXPERIENCE</div><div className="projects-heading" data-reveal><p className="kicker">FIELD NOTES</p><h2>SELECTED<br /><em>PROJECTS.</em></h2><p>Three systems. One direction: practical software built around data, place, and reliable infrastructure.</p></div><div className="project-list">{projects.map((project) => <article className="project-card" key={project.id} data-reveal><div className="project-top"><span>{project.id}</span><small>{project.type}</small><b>↗</b></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
    <section className="capabilities" id="capabilities"><div className="section-number">03 / CAPABILITIES</div><div className="cap-copy" data-reveal><p className="kicker">TOOLS FOR THE TERRAIN</p><h2>FROM MAP<br />TO <em>STACK.</em></h2><p>I like understanding the whole path — how spatial data is stored, how a service moves it, and how an interface helps someone make sense of it.</p></div><div className="cap-grid" data-reveal><div><span>01</span><h3>GIS & MAPS</h3><p>Web GIS<br />Spatial visualization<br />Geospatial data<br />Map interaction</p></div><div><span>02</span><h3>DEVELOPMENT</h3><p>TypeScript<br />Node.js<br />Go<br />API design</p></div><div><span>03</span><h3>DATA & OPS</h3><p>SQL databases<br />Docker<br />Data pipelines<br />DevOps workflows</p></div></div></section>
    <section className="contact" id="contact"><div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" /><div className="contact-content" data-reveal><p className="kicker">OPEN CHANNEL</p><h2>LET&apos;S MAP<br /><em>WHAT&apos;S NEXT.</em></h2><p>Have a spatial idea, a backend challenge, or just want to talk maps and software? I&apos;d like to hear from you.</p><div className="contact-links"><a href="mailto:your-email@example.com">EMAIL <span>your-email@example.com ↗</span></a><a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GITHUB <span>github.com/yourusername ↗</span></a></div><small>PLACEHOLDER CONTACTS — REPLACE BEFORE PUBLISHING PUBLICLY</small></div><footer><span>© 2026 PHURINAT KHRUEATAN</span><a href="#top">BACK TO TOP ↑</a></footer></section>
  </main>;
}
