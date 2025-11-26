// CrewAI DevRel - Main Site JavaScript

(function() {
    'use strict';
    
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', 
                navLinks.classList.contains('active'));
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Copy code to clipboard
    function initCodeCopyButtons() {
        document.querySelectorAll('pre code').forEach((codeBlock) => {
            const pre = codeBlock.parentElement;
            const wrapper = pre.parentElement;
            
            // Skip if button already exists
            if (wrapper.querySelector('.copy-button')) return;
            
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeBlock.textContent);
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    button.textContent = 'Error';
                    console.error('Failed to copy:', err);
                }
            });
            
            // Insert button before pre element
            pre.parentNode.insertBefore(button, pre);
        });
    }
    
    // Animate elements on scroll
    function initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-on-scroll');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        document.querySelectorAll('.card, .stat-card, .timeline-item').forEach((el) => {
            observer.observe(el);
        });
    }
    
    // Load and display metrics
    async function loadMetrics() {
        const metricsContainer = document.getElementById('metrics-data');
        if (!metricsContainer) return;
        
        try {
            const response = await fetch('/data/metrics.json');
            const data = await response.json();
            
            // Update DOM with metrics
            updateMetricValue('github-stars', data.github.stars);
            updateMetricValue('github-forks', data.github.forks);
            updateMetricValue('contributors', data.github.contributors_30d);
            updateMetricValue('discord-members', data.community.discord_members);
            updateMetricValue('templates-shipped', data.adoption.templates_shipped);
            updateMetricValue('developer-nps', data.quality.developer_nps);
            
        } catch (error) {
            console.error('Failed to load metrics:', error);
        }
    }
    
    function updateMetricValue(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = formatNumber(value);
        }
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // Set active navigation link
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || 
                (currentPath === '/' && linkPath.endsWith('index.html'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        initCodeCopyButtons();
        initScrollAnimations();
        loadMetrics();
        setActiveNavLink();
    });
    
})();
