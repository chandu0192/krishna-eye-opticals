import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ChevronRight,
  CircleArrowRight,
  Clipboard,
  Compass,
  Eye,
  MapPin,
  Menu,
  MessageCircle,
  MoveRight,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  X,
} from 'lucide-react';

type GalleryImage = { src: string; alt: string; label: string };

const business = {
  name: 'Krishna Eye Optical',
  city: 'Yelahanka, Bengaluru',
  address: ['38/6, 36/7, KHB, Near Vishal Mart,', 'Industrial Area, Yelahanka,', 'Bengaluru, Karnataka 560064, India'],
  addressOneLine: '38/6, 36/7, KHB, Near Vishal Mart, Industrial Area, Yelahanka, Bengaluru, Karnataka 560064, India',
  googleSource: 'https://share.google/aC4ROlhydUBestwTj',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Krishna Eye Optical, 38/6, 36/7, KHB, Near Vishal Mart, Industrial Area, Yelahanka, Bengaluru, Karnataka 560064, India')}`,
};

const gallery: GalleryImage[] = [
  { src: '/eyewear-editorial-hero.jpg', alt: 'Generic editorial image of sculptural eyeglasses on a stone plinth; not a photograph of the Krishna Eye Optical store.', label: 'Frame study / 01' },
  { src: '/frames-editorial.jpg', alt: 'Generic editorial close-up of eyeglass frames on a pale teal surface; not a photograph of the store.', label: 'Acetate / 02' },
  { src: '/acetate-editorial.jpg', alt: 'Generic editorial photograph of translucent acetate glasses on linen; not a photograph of the store.', label: 'Material / 03' },
  { src: '/optical-studio.jpg', alt: 'Generic editorial still life of round eyeglasses and metal frames; not a photograph of the store.', label: 'Studio / 04' },
  { src: '/frames-editorial.jpg', alt: 'Generic editorial image of eyewear details; not a photograph of the Krishna Eye Optical store.', label: 'Detail / 05' },
  { src: '/acetate-editorial.jpg', alt: 'Generic editorial image of sunglasses and eyewear; not a photograph of the store.', label: 'Light / 06' },
];

const navItems = [
  ['about', 'About'],
  ['products', 'Products'],
  ['services', 'Services'],
  ['why-us', 'Why us'],
  ['reviews', 'Reviews'],
  ['gallery', 'Gallery'],
  ['location', 'Location'],
  ['contact', 'Contact'],
];

function PlaceholderAction({ kind, className = '', onNotice }: { kind: 'phone' | 'whatsapp'; className?: string; onNotice: (message: string) => void }) {
  const label = kind === 'phone' ? 'Phone number' : 'WhatsApp number';
  const Icon = kind === 'phone' ? Phone : MessageCircle;
  return (
    <button
      type="button"
      className={`${className} placeholder-action`}
      onClick={() => onNotice(`${label} placeholder — add the verified ${kind === 'phone' ? 'phone number' : 'WhatsApp number'} to activate this action.`)}
      data-testid={`button-placeholder-${kind}`}
      aria-label={`${kind === 'phone' ? 'Call' : 'WhatsApp'} placeholder`}
    >
      <Icon size={15} aria-hidden="true" />
      {kind === 'phone' ? 'Call' : 'WhatsApp'}
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notice, setNotice] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', interest: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'fallback'>('idle');
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.title = 'Krishna Eye Optical | Optical Store in Yelahanka, Bengaluru';
    const description = 'Krishna Eye Optical is a local eyewear destination in Yelahanka, Bengaluru for considered frame and eyewear selection with personal help.';
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    setMeta('description', description);
    setMeta('theme-color', '#1b2b45');
    setMeta('robots', 'index, follow');
    setMeta('og:title', 'Krishna Eye Optical | Yelahanka', true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', business.name, true);
    setMeta('og:url', '[PRODUCTION_DOMAIN]', true);
    setMeta('og:image', '/og-krishna-eye-optical.jpg', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Krishna Eye Optical | Yelahanka');
    setMeta('twitter:description', description);
    setMeta('twitter:image', '/og-krishna-eye-optical.jpg');
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = '[PRODUCTION_DOMAIN]';
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'OpticalStore',
      name: business.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '38/6, 36/7, KHB, Near Vishal Mart, Industrial Area, Yelahanka',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560064',
        addressCountry: 'IN',
      },
    });
    document.head.querySelector('script[data-business-schema]')?.remove();
    ld.dataset.businessSchema = 'true';
    document.head.appendChild(ld);
    return () => ld.remove();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    lightboxCloseRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const handleNotice = (message: string) => setNotice(message);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(business.addressOneLine);
      setNotice('Address copied to your clipboard.');
    } catch {
      setNotice('Copy is unavailable in this browser. The full address is shown above.');
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = 'Please add your name.';
    if (!formState.phone.trim()) errors.phone = 'Please add a phone number.';
    else if (!/^[+]?[\d\s()-]{7,18}$/.test(formState.phone.trim())) errors.phone = 'Please check the phone number format.';
    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) errors.email = 'Please check the email format.';
    if (!formState.message.trim() || formState.message.trim().length < 10) errors.message = 'Please share a little more about your enquiry.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    setFormStatus('fallback');
    setNotice('Your enquiry is ready to continue via WhatsApp once the verified number is added.');
  };

  const fieldChange = (field: keyof typeof formState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    if (formErrors[field]) setFormErrors((current) => ({ ...current, [field]: '' }));
    if (formStatus !== 'idle') setFormStatus('idle');
  };

  return (
    <div className="site-shell">
      <div className="announcement">A considered eyewear destination in <span>Yelahanka, Bengaluru</span></div>
      <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-wide nav-inner">
          <a href="#home" className="brand-lockup focus-ring" onClick={() => setMenuOpen(false)} data-testid="link-brand-home">
            <span className="brand-mark" aria-hidden="true" />
            <span><span className="brand-name">Krishna Eye Optical</span><span className="brand-place">Yelahanka · Bengaluru</span></span>
          </a>
          <nav className="desktop-links" aria-label="Primary navigation">
            {navItems.map(([id, label]) => <a href={`#${id}`} key={id} data-testid={`link-nav-${id}`}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <PlaceholderAction kind="phone" className="button-main nav-call" onNotice={handleNotice} />
            <button type="button" className="button-quiet nav-call" onClick={() => scrollTo('contact')} data-testid="button-nav-enquiry">Enquire</button>
          </div>
          <button type="button" className="menu-button focus-ring" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${id}`}>{label}</a>)}
          <div className="mobile-menu-actions">
            <PlaceholderAction kind="phone" onNotice={handleNotice} />
            <a href="#contact" onClick={() => setMenuOpen(false)} data-testid="link-mobile-enquiry">Enquire</a>
          </div>
        </nav>}
      </header>

      <main>
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="container-wide hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker eyebrow"><span>Optical retail · Since your next frame</span></div>
              <h1 id="hero-title">Frames with<br /><em>good sense.</em></h1>
              <p className="hero-lede">Krishna Eye Optical is a local Yelahanka destination for choosing eyewear with a little more care, clarity and personal help.</p>
              <div className="hero-actions">
                <a className="button-main" href={business.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="link-hero-directions"><MapPin size={16} /> Get directions</a>
                <PlaceholderAction kind="whatsapp" className="button-quiet" onNotice={handleNotice} />
              </div>
              <div className="hero-note"><ShieldCheck size={15} /> Retail eyewear guidance, not medical advice.</div>
            </div>
            <div className="hero-visual" aria-label="Generic eyewear editorial image, not the store">
              <div className="hero-image-wrap"><img src="/eyewear-editorial-hero.jpg" alt="Generic editorial eyewear still life; this image does not represent the Krishna Eye Optical store." fetchPriority="high" /></div>
              <div className="hero-frame-line" aria-hidden="true" />
              <div className="hero-stamp" aria-hidden="true"><span>Near</span> Vishal<br />Mart</div>
              <div className="hero-coordinate">13.1000° N / Yelahanka</div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Store values">
          <div className="container-wide proof-inner">
            {[
              [<Eye size={16} />, 'Eyewear focus', 'A retail destination for frames and eyewear'],
              [<Sparkles size={16} />, 'Personal help', 'Thoughtful support as you choose'],
              [<Compass size={16} />, 'Local & easy', 'Find us near Vishal Mart, Yelahanka'],
              [<Store size={16} />, 'Visit in person', 'See what suits you at the store'],
            ].map(([icon, title, copy], index) => <div className="proof-item" key={index}><span className="proof-icon">{icon}</span><span><strong>{title}</strong><span>{copy}</span></span></div>)}
          </div>
        </section>

        <section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="container-wide about-grid">
            <div className="about-side"><div className="eyebrow section-tag">01 / The local edit</div><div className="about-index">01</div></div>
            <div className="about-body">
              <h2 id="about-title" className="section-title">A better way to choose <span className="serif">your everyday pair.</span></h2>
              <p>Krishna Eye Optical is an optical retail boutique in Yelahanka, Bengaluru. The focus is simple: help you look through a considered selection of eyewear and leave with a frame that feels like you.</p>
              <p>Come by for a closer look at the categories you are considering, or enquire before you visit. No rush, no grand claims — just a more personal way to find your next pair.</p>
              <div className="address-line"><span>Find us</span><span>Near Vishal Mart · Industrial Area<br />Yelahanka, Bengaluru</span></div>
            </div>
          </div>
        </section>

        <section id="products" className="products-section section-pad" aria-labelledby="products-title">
          <div className="container-wide">
            <div className="section-head"><div><div className="eyebrow section-tag">02 / The collection</div><h2 id="products-title" className="section-title">What are you<br /><span className="serif">looking for?</span></h2></div><p>Explore the eyewear categories you might want to ask us about. Availability, fit and selection can be confirmed at the store.</p></div>
            <div className="product-grid">
              {[
                ['Frames', 'Everyday shapes, considered in person.', '/frames-editorial.jpg'],
                ['Eyeglasses', 'An easy place to start your search.', '/eyewear-editorial-hero.jpg'],
                ['Sunglasses', 'Explore your preferred look and feel.', '/acetate-editorial.jpg'],
                ['Lenses', 'Ask about lens options for your frame.', '/optical-studio.jpg'],
                ['Contact lenses', 'Enquire about contact lens assistance.', '/frames-editorial.jpg'],
                ['Kids eyewear', 'A comfortable conversation for younger wearers.', '/acetate-editorial.jpg'],
              ].map(([title, copy, image], index) => <article className="product-card" key={title} data-testid={`card-product-${index}`}>
                <div className="product-art"><img src={image} alt={`Generic editorial eyewear imagery for ${title}; not a photograph of the store.`} loading="lazy" /></div>
                <div className="product-copy"><div className="eyebrow">{String(index + 1).padStart(2, '0')} / category</div><h3>{title}</h3><p>{copy}</p><button type="button" onClick={() => { scrollTo('contact'); fieldChange('interest', title); }} data-testid={`button-enquire-${title.toLowerCase().replaceAll(' ', '-')}`}>Enquire <ArrowRight size={13} /></button></div>
              </article>)}
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-pad" aria-labelledby="services-title">
          <div className="container-wide services-grid">
            <div className="services-intro"><div className="eyebrow section-tag">03 / How we help</div><h2 id="services-title" className="section-title">Small details.<br /><span className="serif">Better choices.</span></h2><p>Good eyewear is personal. Ask questions, compare what catches your eye and take the time to decide what feels right for your day-to-day.</p><button type="button" className="button-dark" onClick={() => scrollTo('contact')} data-testid="button-services-enquiry">Start an enquiry <ArrowRight size={15} /></button></div>
            <div><div className="service-list">
              {[
                ['01', 'Frame selection', 'Talk through shapes, proportions and the look you want.'],
                ['02', 'Lens selection', 'Ask about lens options for the frame you choose.'],
                ['03', 'Eyewear enquiry', 'Share what you are looking for before a store visit.'],
                ['04', 'Personal assistance', 'A little help narrowing down your shortlist.'],
              ].map(([number, title, copy]) => <div className="service-row" key={number}><span className="service-number">{number}</span><span><h3>{title}</h3><p>{copy}</p></span><ChevronRight size={18} /></div>)}
            </div><div className="service-note">We are an optical retail store. This website does not offer eye examinations, diagnosis or medical treatment.</div></div>
          </div>
        </section>

        <section id="why-us" className="why-section section-pad" aria-labelledby="why-title">
          <div className="container-wide why-grid">
            <div className="why-visual"><div className="why-visual-copy"><span>04 / The reason to visit</span><p>Take your time. Your face is worth it.</p></div></div>
            <div><div className="eyebrow section-tag">Why Krishna Eye Optical</div><h2 id="why-title" className="section-title">The local advantage is <span className="serif">personal.</span></h2>
              <div className="benefit-list">
                {[
                  ['01', 'A nearby starting point', 'Located in the KHB area near Vishal Mart, making your eyewear errand easy to place.'],
                  ['02', 'Help without the hard sell', 'A calm space to ask, compare and make a choice at your own pace.'],
                  ['03', 'Style meets the everyday', 'Look for a frame that works with your routine, your comfort and your sense of self.'],
                ].map(([mark, title, copy]) => <div className="benefit" key={mark}><span className="benefit-mark">{mark}</span><span><h3>{title}</h3><p>{copy}</p></span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews-section section-pad" aria-labelledby="reviews-title">
          <div className="container-wide"><div className="eyebrow section-tag">05 / Real words only</div><div className="review-panel"><h2 id="reviews-title">See what customers are <em>saying.</em></h2><div className="review-panel-copy"><p>We are keeping this space honest until genuine customer reviews can be confirmed. Visit the official Google share source to read the latest feedback directly.</p><a className="external-link" href={business.googleSource} target="_blank" rel="noopener noreferrer" data-testid="link-google-reviews">Open Google listing <CircleArrowRight size={15} /></a><div className="auth-note"><Quote size={12} /> No names, ratings or review text have been invented here.</div></div></div></div>
        </section>

        <section id="gallery" className="gallery-section section-pad" aria-labelledby="gallery-title">
          <div className="container-wide"><div className="section-head"><div><div className="eyebrow section-tag">06 / A visual reference</div><h2 id="gallery-title" className="section-title">A few things to <span className="serif">look for.</span></h2></div><p>Generic editorial eyewear imagery for atmosphere only — these images do not represent the Krishna Eye Optical store.</p></div>
            <div className="gallery-grid">{gallery.map((image, index) => <button type="button" className="gallery-item" key={image.label} onClick={() => setLightboxIndex(index)} data-testid={`button-gallery-${index}`} aria-label={`Open ${image.label}`}><img src={image.src} alt={image.alt} loading="lazy" /><span className="gallery-label">{image.label}</span></button>)}</div>
            <p className="gallery-caption">Imagery note: all gallery visuals are generic optical editorial images, not photographs of this business location.</p>
          </div>
        </section>

        <section id="location" className="location-section section-pad" aria-labelledby="location-title">
          <div className="container-wide location-grid"><div className="location-copy"><div className="eyebrow section-tag">07 / Come by</div><h2 id="location-title" className="section-title">Easy to find.<br /><span className="serif">Worth the stop.</span></h2><p>Use the verified address below to navigate directly to Krishna Eye Optical in Yelahanka.</p><div className="address-card"><strong>Krishna Eye Optical</strong><p>{business.address.map((line) => <span key={line}>{line}<br /></span>)}</p></div><div className="location-actions"><a className="button-main" href={business.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="link-location-directions"><MapPin size={15} /> Get directions</a><button type="button" className="button-quiet" onClick={handleCopy} data-testid="button-copy-address"><Clipboard size={15} /> Copy address</button></div></div><div className="map-card" aria-label="Stylised location card; use the directions link for Google Maps navigation"><div className="map-grid-lines" /><div className="map-pin" aria-hidden="true" /><div className="map-label"><strong>Near Vishal Mart</strong>Industrial Area · Yelahanka</div></div></div>
        </section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="container-wide contact-grid"><div className="contact-intro"><div className="eyebrow section-tag">08 / Start a conversation</div><h2 id="contact-title" className="section-title">Tell us what you are <span className="serif">looking for.</span></h2><p>Use this form to prepare an enquiry. With no recipient endpoint connected yet, we will not pretend it has been sent.</p><div className="contact-details"><div className="detail-row"><span>Phone</span><span className="placeholder">[ADD PHONE NUMBER]</span></div><div className="detail-row"><span>WhatsApp</span><span className="placeholder">[ADD WHATSAPP NUMBER]</span></div><div className="detail-row"><span>Email</span><span className="placeholder">[ADD EMAIL]</span></div><div className="detail-row"><span>Hours</span><span className="placeholder">[ADD BUSINESS HOURS]</span></div></div></div>
            <div className="contact-form-wrap"><h3>Enquiry form</h3><p className="form-caption">Required fields are marked in the form. Your details stay in this browser until you choose what to do next.</p><form className="enquiry-form" onSubmit={handleFormSubmit} noValidate>
              <div className="field"><label htmlFor="name">Name <span aria-hidden="true">*</span></label><input id="name" value={formState.name} onChange={(event) => fieldChange('name', event.target.value)} placeholder="Your name" autoComplete="name" data-testid="input-name" aria-invalid={Boolean(formErrors.name)} />{formErrors.name && <span className="field-error" role="alert">{formErrors.name}</span>}</div>
              <div className="field"><label htmlFor="phone">Phone <span aria-hidden="true">*</span></label><input id="phone" value={formState.phone} onChange={(event) => fieldChange('phone', event.target.value)} placeholder="+91 or local number" inputMode="tel" autoComplete="tel" data-testid="input-phone" aria-invalid={Boolean(formErrors.phone)} />{formErrors.phone && <span className="field-error" role="alert">{formErrors.phone}</span>}</div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" value={formState.email} onChange={(event) => fieldChange('email', event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" data-testid="input-email" aria-invalid={Boolean(formErrors.email)} />{formErrors.email && <span className="field-error" role="alert">{formErrors.email}</span>}</div>
              <div className="field"><label htmlFor="interest">Interested in</label><select id="interest" value={formState.interest} onChange={(event) => fieldChange('interest', event.target.value)} data-testid="select-interest"><option value="">Choose a category</option><option>Eyeglasses</option><option>Frames</option><option>Lenses</option><option>Contact lenses</option><option>Sunglasses</option><option>Kids eyewear</option><option>Other</option></select></div>
              <div className="field full"><label htmlFor="message">Message <span aria-hidden="true">*</span></label><textarea id="message" value={formState.message} onChange={(event) => fieldChange('message', event.target.value)} placeholder="What would you like help choosing?" data-testid="textarea-message" aria-invalid={Boolean(formErrors.message)} />{formErrors.message && <span className="field-error" role="alert">{formErrors.message}</span>}</div>
              {formStatus === 'fallback' && <div className="form-fallback" role="status"><strong>Form checked.</strong> Nothing was sent because a recipient endpoint is not connected. <button type="button" onClick={() => handleNotice(`WhatsApp number placeholder — add the verified WhatsApp number to continue this enquiry.`)} data-testid="button-form-whatsapp-fallback">Continue via WhatsApp after setup</button>.</div>}
              <button type="submit" className="button-main form-submit" data-testid="button-submit-enquiry">Check enquiry <Send size={15} /></button>
            </form></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-wide"><div className="footer-grid"><div className="footer-brand"><a href="#home" className="brand-lockup focus-ring" data-testid="link-footer-home"><span className="brand-mark" aria-hidden="true" /><span><span className="brand-name">Krishna Eye Optical</span><span className="brand-place">Yelahanka · Bengaluru</span></span></a><p>A local optical retail destination for considered eyewear choices and personal assistance.</p></div><div><p className="footer-title">Explore</p><div className="footer-links">{navItems.slice(0, 6).map(([id, label]) => <a href={`#${id}`} key={id} data-testid={`link-footer-${id}`}>{label}</a>)}</div></div><div><p className="footer-title">Visit</p><p className="footer-address">{business.address.map((line) => <span key={line}>{line}<br /></span>)}</p><a className="external-link" href={business.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="link-footer-directions">Directions <MoveRight size={14} /></a></div></div><div className="footer-bottom"><span>© 2026 Krishna Eye Optical. All rights reserved.</span><span>Business details shown here are limited to verified information.</span></div></div>
      </footer>

      {notice && <div className="notice" role="status" data-testid="status-notice"><span>{notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Dismiss notification" data-testid="button-dismiss-notice"><X size={15} /></button></div>}
      <div className="mobile-action-bar" aria-label="Quick actions"><PlaceholderAction kind="whatsapp" onNotice={handleNotice} /><PlaceholderAction kind="phone" onNotice={handleNotice} /><a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="link-mobile-directions"><MapPin size={14} /> Directions</a></div>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}><div className="lightbox-inner"><button type="button" className="icon-button" ref={lightboxCloseRef} onClick={() => setLightboxIndex(null)} aria-label="Close image viewer" data-testid="button-close-lightbox"><X size={18} /></button><img src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].alt} /><p>{gallery[lightboxIndex].label} · Use left and right arrow keys to browse.</p></div></div>}
    </div>
  );
}

export default App;