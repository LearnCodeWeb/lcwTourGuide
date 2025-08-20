/*!
 * lcwTourGuide v1.0.0
 * Author: Zaid Bin Khalid
 * A lightweight JavaScript guided tour library
 */

class lcwTourGuide {
    constructor(options = {}) {
        this.steps = Array.from(document.querySelectorAll('[data-lcw-tour-step]')).sort((a, b) => a.dataset.tourStep - b.dataset.tourStep);

        this.current = 0;
        this.tooltip = null;
        this.overlay = null;

        // callbacks
        this.onStart = options.onStart || (() => { });
        this.onEnd = options.onEnd || (() => { });
        this.onStep = options.onStep || (() => { });
    }

    start() {
        if (!this.steps.length) return;
        this._createOverlay();
        this._showStep(this.current);

        // fire callback
        this.onStart();
    }

    _createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'lcw-tour-overlay';
        document.body.appendChild(this.overlay);
    }

    _showStep(index) {
        const step = this.steps[index];

        // scroll so both element + space for tooltip is visible
        const rect = step.getBoundingClientRect();
        const tooltipHeight = 120; // estimated
        const scrollY = window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);

        let targetScroll = scrollY;
        if (rect.bottom + tooltipHeight > window.innerHeight) {
            targetScroll = window.scrollY + rect.top - tooltipHeight - 20;
        }
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });

        // Remove highlight from all
        this.steps.forEach(el => el.classList.remove('lcw-tour-highlight'));

        setTimeout(() => {
            const rect = step.getBoundingClientRect();
            if (this.tooltip) this.tooltip.remove();

            // Highlight the current step
            step.classList.add('lcw-tour-highlight');

            this.tooltip = document.createElement('div');
            this.tooltip.className = 'lcw-tour-tooltip';
            this.tooltip.innerHTML = `
            <div class="lcw-tour-close" id="close-tour">&times;</div>
            <div style="margin-top: 10px;">${step.dataset.lcwTourText}</div>
            <div style="margin-top: 12px;">
                ${index > 0 ? '<button id="prev-step">Previous</button>' : ''}
                ${index < this.steps.length - 1
                    ? '<button id="next-step">Next</button>'
                    : '<button id="end-tour">Done</button>'}
            </div>`;
            document.body.appendChild(this.tooltip);

            // Decide tooltip position
            const tooltipRect = this.tooltip.getBoundingClientRect();
            let top = rect.bottom + window.scrollY + 10; // default below
            if (rect.bottom + tooltipRect.height + 20 > window.innerHeight) {
                // place above if not enough space
                top = rect.top + window.scrollY - tooltipRect.height - 10;
            }

            let left = rect.left + window.scrollX;
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (left < 0) left = 10;

            this.tooltip.style.top = `${top}px`;
            this.tooltip.style.left = `${left}px`;

            // Button Events
            document.getElementById('next-step')?.addEventListener('click', () => this._next());
            document.getElementById('prev-step')?.addEventListener('click', () => this._prev());
            document.getElementById('end-tour')?.addEventListener('click', () => this._end());
            document.getElementById('close-tour')?.addEventListener('click', () => this._end());

            // fire step callback
            this.onStep(index, step);
        }, 400);
    }

    _next() {
        if (this.current < this.steps.length - 1) {
            this.current++;
            this._showStep(this.current);
        } else {
            this._end();
        }
    }

    _prev() {
        if (this.current > 0) {
            this.current--;
            this._showStep(this.current);
        }
    }

    _end() {
        this.tooltip?.remove();
        this.overlay?.remove();
        this.steps.forEach(el => el.classList.remove('lcw-tour-highlight'));
        this.tooltip = null;
        this.overlay = null;
        this.current = 0;

        // fire callback
        this.onEnd();
    }
}
window.lcwTourGuide = lcwTourGuide;