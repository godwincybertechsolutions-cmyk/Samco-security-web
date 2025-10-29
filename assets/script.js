(function(){
	const toggle = document.getElementById('nav-toggle');
	const nav = document.getElementById('site-nav');
	if (toggle && nav) {
		toggle.addEventListener('click', function(){
			nav.classList.toggle('open');
		});
	}
	// Smooth scroll for in-page anchors
	document.querySelectorAll('a[href^="#"]').forEach(function(link){
		link.addEventListener('click', function(e){
			const targetId = this.getAttribute('href').slice(1);
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
	// Header shadow on scroll
	const header = document.querySelector('.header');
	if (header) {
		const onScroll = function(){
			if (window.scrollY > 4) header.classList.add('scrolled');
			else header.classList.remove('scrolled');
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
	}
	// Reveal on scroll (respect reduced motion)
	const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const autoRevealSelectors = [
		'.section h2', '.section h3', '.section .card', '.cta-band', '.hero .hero-grid > div'
	];
	if (!prefersReduced && 'IntersectionObserver' in window) {
		const toReveal = document.querySelectorAll(autoRevealSelectors.join(','));
		toReveal.forEach(function(el){ el.classList.add('reveal'); });
		const io = new IntersectionObserver(function(entries){
			entries.forEach(function(entry){
				if (entry.isIntersecting) {
					entry.target.classList.add('is-in');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });
		toReveal.forEach(function(el){ io.observe(el); });
	} else {
		// If reduced motion, ensure content is visible
		document.querySelectorAll(autoRevealSelectors.join(',')).forEach(function(el){
			el.classList.remove('reveal');
			el.classList.add('is-in');
		});
	}
})();
