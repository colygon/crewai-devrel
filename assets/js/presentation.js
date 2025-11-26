// CrewAI DevRel - Presentation Engine

class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 0;
        this.slides = [];
        this.notesVisible = false;
        this.narrationEnabled = false;
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        
        this.init();
    }
    
    init() {
        // Find all slides
        this.slides = Array.from(document.querySelectorAll('[data-slide-id]'));
        this.totalSlides = this.slides.length;
        
        if (this.totalSlides === 0) {
            console.error('No slides found');
            return;
        }
        
        // Setup keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Setup navigation buttons
        document.getElementById('prev-slide')?.addEventListener('click', () => this.previousSlide());
        document.getElementById('next-slide')?.addEventListener('click', () => this.nextSlide());
        document.getElementById('toggle-notes')?.addEventListener('click', () => this.toggleNotes());
        document.getElementById('toggle-narration')?.addEventListener('click', () => this.toggleNarration());
        document.getElementById('toggle-fullscreen')?.addEventListener('click', () => this.toggleFullscreen());
        
        // Load saved position or hash
        const hash = window.location.hash;
        if (hash && hash.startsWith('#slide-')) {
            const slideNum = parseInt(hash.replace('#slide-', ''));
            if (slideNum > 0 && slideNum <= this.totalSlides) {
                this.currentSlide = slideNum;
            }
        } else {
            const saved = localStorage.getItem('crewai-presentation-slide');
            if (saved) {
                const slideNum = parseInt(saved);
                if (slideNum > 0 && slideNum <= this.totalSlides) {
                    this.currentSlide = slideNum;
                }
            }
        }
        
        // Show first slide
        this.showSlide(this.currentSlide);
        
        // Update hash on navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash && hash.startsWith('#slide-')) {
                const slideNum = parseInt(hash.replace('#slide-', ''));
                if (slideNum > 0 && slideNum <= this.totalSlides && slideNum !== this.currentSlide) {
                    this.showSlide(slideNum);
                }
            }
        });
    }
    
    handleKeyPress(e) {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                if (e.shiftKey && e.key === ' ') {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'n':
            case 'N':
                e.preventDefault();
                this.toggleNotes();
                break;
            case 'Home':
                e.preventDefault();
                this.showSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.showSlide(this.totalSlides);
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    }
    
    showSlide(n) {
        // Boundary check
        if (n < 1) n = 1;
        if (n > this.totalSlides) n = this.totalSlides;
        
        this.currentSlide = n;
        
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        const currentSlide = this.slides[n - 1];
        if (currentSlide) {
            currentSlide.classList.add('active');
        }
        
        // Update UI
        this.updateUI();
        
        // Save progress
        localStorage.setItem('crewai-presentation-slide', n.toString());
        window.location.hash = `#slide-${n}`;
        
        // Stop any playing narration
        if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        
        // Auto-narrate if enabled
        if (this.narrationEnabled && currentSlide) {
            this.narrateSlide(currentSlide);
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    updateUI() {
        // Update slide counter
        const counter = document.getElementById('slide-counter');
        if (counter) {
            counter.innerHTML = `<span class="current">${this.currentSlide}</span> / ${this.totalSlides}`;
        }
        
        // Update progress bar
        const progress = (this.currentSlide / this.totalSlides) * 100;
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        // Update button states
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.totalSlides;
        }
        
        // Update document title
        document.title = `CrewAI DevRel - Slide ${this.currentSlide}/${this.totalSlides}`;
    }
    
    toggleNotes() {
        this.notesVisible = !this.notesVisible;
        const notesPanel = document.getElementById('notes-panel');
        const notesBtn = document.getElementById('toggle-notes');
        
        if (notesPanel) {
            notesPanel.classList.toggle('active', this.notesVisible);
        }
        if (notesBtn) {
            notesBtn.classList.toggle('active', this.notesVisible);
        }
    }
    
    toggleNarration() {
        if (!this.synthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }
        
        this.narrationEnabled = !this.narrationEnabled;
        const narrationBtn = document.getElementById('toggle-narration');
        
        if (narrationBtn) {
            narrationBtn.classList.toggle('active', this.narrationEnabled);
            narrationBtn.textContent = this.narrationEnabled ? '🔊' : '🔇';
        }
        
        if (this.narrationEnabled) {
            const currentSlide = this.slides[this.currentSlide - 1];
            if (currentSlide) {
                this.narrateSlide(currentSlide);
            }
        } else if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
    }
    
    narrateSlide(slide) {
        if (!this.synthesis || !this.narrationEnabled) return;
        
        // Get narration text from notes or slide content
        const notes = slide.querySelector('.slide-notes');
        let text = '';
        
        if (notes) {
            text = notes.textContent.trim();
        } else {
            // Fallback to slide content (skip code blocks)
            const content = slide.cloneNode(true);
            content.querySelectorAll('pre, code').forEach(el => el.remove());
            text = content.textContent.trim().substring(0, 500);
        }
        
        if (!text) return;
        
        // Stop any ongoing speech
        this.synthesis.cancel();
        
        // Create and configure utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Handle end of speech
        utterance.onend = () => {
            this.currentUtterance = null;
        };
        
        utterance.onerror = (e) => {
            console.error('Speech synthesis error:', e);
            this.currentUtterance = null;
        };
        
        this.currentUtterance = utterance;
        this.synthesis.speak(utterance);
    }
    
    toggleFullscreen() {
        const container = document.querySelector('.presentation-mode');
        if (!container) return;
        
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error('Error entering fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Initialize presentation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.presentation-mode')) {
        new PresentationController();
    }
});
