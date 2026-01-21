// Utility: Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Generate heatmap
    generateHeatmap();

    // Generate 2026 calendar
    generateCalendar2026();

    // Generate charts
    generateDCAChart();
    generateSeasonalityChart();
});

// Generate Heatmap (S&P 500 daily data simulation 2020-2026)
function generateHeatmap() {
    const heatmapGrid = document.getElementById('heatmap-grid');
    if (!heatmapGrid) return;

    // Clear existing content
    heatmapGrid.innerHTML = '';

    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Trading days per month (approximate)
    const tradingDaysPerMonth = [21, 20, 23, 21, 21, 22, 21, 22, 21, 21, 20, 21];

    years.forEach(year => {
        // Create year container
        const yearDiv = document.createElement('div');
        yearDiv.className = 'heatmap-year';

        // Year label
        const yearLabel = document.createElement('div');
        yearLabel.className = 'heatmap-year-label';
        yearLabel.textContent = year;
        yearDiv.appendChild(yearLabel);

        // Months container
        const monthsContainer = document.createElement('div');
        monthsContainer.className = 'heatmap-months';

        months.forEach((month, monthIndex) => {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'heatmap-month';

            // Month label
            const monthLabel = document.createElement('div');
            monthLabel.className = 'heatmap-month-label';
            monthLabel.textContent = month;
            monthDiv.appendChild(monthLabel);

            // Days container
            const daysContainer = document.createElement('div');
            daysContainer.className = 'heatmap-days';

            // Generate trading days for this month
            const numDays = tradingDaysPerMonth[monthIndex];

            for (let day = 0; day < numDays; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'heatmap-cell';

                // Simulate market behavior
                // Base probability: ~55% positive days
                let positiveProb = 0.55;

                // Special months adjustments
                if (monthIndex === 10) positiveProb = 0.73; // November - bullish
                if (monthIndex === 11) positiveProb = 0.71; // December - bullish
                if (monthIndex === 0) positiveProb = 0.68; // January - bullish
                if (monthIndex === 8) positiveProb = 0.45; // September - bearish

                // Create clusters (simulate post-dip rallies)
                // Every ~15th day in certain months, create mini-rally
                if (day % 15 === 0 && [10, 11, 0, 3].includes(monthIndex)) {
                    positiveProb = 0.85; // Strong cluster probability
                }

                const isPositive = Math.random() < positiveProb;
                dayCell.classList.add(isPositive ? 'positive' : 'negative');

                // Tooltip with date info
                dayCell.title = `${month} ${year}`;

                dayCell.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.3)';
                    this.style.zIndex = '10';
                });

                dayCell.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.zIndex = '1';
                });

                daysContainer.appendChild(dayCell);
            }

            monthDiv.appendChild(daysContainer);
            monthsContainer.appendChild(monthDiv);
        });

        yearDiv.appendChild(monthsContainer);
        heatmapGrid.appendChild(yearDiv);
    });
}

// Generate Calendar 2026 with broader periods
function generateCalendar2026() {
    const calendarGrid = document.getElementById('calendar-2026-grid');
    if (!calendarGrid) return;

    const months = [
        { name: 'Ianuarie', days: 31 },
        { name: 'Februarie', days: 28 },
        { name: 'Martie', days: 31 },
        { name: 'Aprilie', days: 30 },
        { name: 'Mai', days: 31 },
        { name: 'Iunie', days: 30 },
        { name: 'Iulie', days: 31 },
        { name: 'August', days: 31 },
        { name: 'Septembrie', days: 30 },
        { name: 'Octombrie', days: 31 },
        { name: 'Noiembrie', days: 30 },
        { name: 'Decembrie', days: 31 }
    ];

    // Define broader favorable periods (green)
    const favorablePeriods = [
        { month: 0, start: 25, end: 31 },    // Final ianuarie
        { month: 1, start: 1, end: 7 },      // Început februarie
        { month: 2, start: 10, end: 20 },    // Mijlocul martie
        { month: 3, start: 1, end: 30 },     // Aprilie întreg
        { month: 6, start: 10, end: 25 },    // Mijlocul iulie
        { month: 9, start: 1, end: 10 },     // Începutul octombrie
        { month: 10, start: 1, end: 30 },    // Noiembrie întreg
        { month: 11, start: 15, end: 31 }    // A doua jumătate decembrie
    ];

    // Caution period (red) - septembrie
    const cautionPeriods = [
        { month: 8, start: 1, end: 30 }      // Septembrie întreg
    ];

    // Major events (date exacte confirmate pentru 2026)
    const majorEvents = [
        // FOMC Meetings (ziua a 2-a, când se anunță decizia)
        { month: 0, day: 28, type: 'FOMC' },      // 27-28 Ianuarie
        { month: 2, day: 18, type: 'FOMC' },      // 17-18 Martie
        { month: 3, day: 29, type: 'FOMC' },      // 28-29 Aprilie
        { month: 5, day: 17, type: 'FOMC' },      // 16-17 Iunie
        { month: 6, day: 29, type: 'FOMC' },      // 28-29 Iulie
        { month: 8, day: 16, type: 'FOMC' },      // 15-16 Septembrie
        { month: 9, day: 28, type: 'FOMC' },      // 27-28 Octombrie
        { month: 11, day: 9, type: 'FOMC' },      // 08-09 Decembrie

        // Non-Farm Payrolls (prima vineri a lunii)
        { month: 1, day: 6, type: 'NFP' },        // Februarie
        { month: 2, day: 6, type: 'NFP' },        // Martie
        { month: 3, day: 3, type: 'NFP' },        // Aprilie
        { month: 4, day: 8, type: 'NFP' },        // Mai
        { month: 5, day: 5, type: 'NFP' },        // Iunie
        { month: 6, day: 3, type: 'NFP' },        // Iulie
        { month: 7, day: 7, type: 'NFP' },        // August
        { month: 8, day: 4, type: 'NFP' },        // Septembrie
        { month: 9, day: 2, type: 'NFP' },        // Octombrie
        { month: 10, day: 6, type: 'NFP' },       // Noiembrie
        { month: 11, day: 4, type: 'NFP' },       // Decembrie

        // CPI (Consumer Price Index - Inflation Data)
        { month: 1, day: 11, type: 'CPI' },       // Februarie
        { month: 2, day: 11, type: 'CPI' },       // Martie
        { month: 3, day: 10, type: 'CPI' },       // Aprilie
        { month: 4, day: 13, type: 'CPI' },       // Mai
        { month: 5, day: 10, type: 'CPI' },       // Iunie
        { month: 6, day: 10, type: 'CPI' },       // Iulie
        { month: 7, day: 12, type: 'CPI' },       // August
        { month: 8, day: 11, type: 'CPI' },       // Septembrie
        { month: 9, day: 14, type: 'CPI' },       // Octombrie
        { month: 10, day: 12, type: 'CPI' },      // Noiembrie
        { month: 11, day: 11, type: 'CPI' }       // Decembrie
    ];

    function getDayType(month, day) {
        // Check if it's a major event day
        const hasEvent = majorEvents.some(e => e.month === month && e.day === day);
        if (hasEvent) return 'event';

        // Check if it's in caution period
        const inCaution = cautionPeriods.some(p =>
            month === p.month && day >= p.start && day <= p.end
        );
        if (inCaution) return 'caution';

        // Check if it's in favorable period
        const inFavorable = favorablePeriods.some(p =>
            month === p.month && day >= p.start && day <= p.end
        );
        if (inFavorable) return 'favorable';

        // Otherwise neutral
        return 'neutral';
    }

    months.forEach((month, monthIndex) => {
        const monthContainer = document.createElement('div');
        monthContainer.style.cssText = `
            margin-bottom: 2rem;
        `;

        const monthHeader = document.createElement('div');
        monthHeader.textContent = month.name;
        monthHeader.style.cssText = `
            font-family: var(--font-display);
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 0.5rem;
        `;

        const daysGrid = document.createElement('div');
        daysGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
        `;

        // Add day cells
        for (let day = 1; day <= month.days; day++) {
            const dayCell = document.createElement('div');
            const dayType = getDayType(monthIndex, day);

            // Check if there's an event on this day
            const event = majorEvents.find(e => e.month === monthIndex && e.day === day);

            // Set content: day number + event symbol if exists
            dayCell.textContent = event ? `${day}⚠️` : day;

            dayCell.style.cssText = `
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
            `;

            // Apply styling based on day type
            if (dayType === 'event') {
                dayCell.style.background = '#f59e0b';
                dayCell.style.color = 'var(--navy-deep)';
                dayCell.style.fontWeight = '700';
                const eventNames = {
                    'FOMC': 'Ședință FOMC (Decizie Rata Dobânzii)',
                    'NFP': 'Non-Farm Payrolls (Raport Piața Muncii)',
                    'CPI': 'Consumer Price Index (Inflație)'
                };
                dayCell.title = eventNames[event.type] || `Event major: ${event.type}`;
            } else if (dayType === 'favorable') {
                dayCell.style.background = 'var(--emerald)';
                dayCell.style.color = 'var(--navy-deep)';
                dayCell.style.fontWeight = '600';
                dayCell.title = 'Perioadă favorabilă statistic';
            } else if (dayType === 'caution') {
                dayCell.style.background = 'var(--coral)';
                dayCell.style.color = 'var(--white)';
                dayCell.style.fontWeight = '600';
                dayCell.title = 'Atenție: lună istoric slabă';
            } else {
                dayCell.style.background = 'rgba(255, 255, 255, 0.05)';
                dayCell.style.color = 'var(--gray-400)';
                dayCell.title = 'Perioadă neutră';
            }

            dayCell.addEventListener('mouseenter', () => {
                dayCell.style.transform = 'scale(1.2)';
                dayCell.style.zIndex = '10';
            });

            dayCell.addEventListener('mouseleave', () => {
                dayCell.style.transform = 'scale(1)';
                dayCell.style.zIndex = '1';
            });

            daysGrid.appendChild(dayCell);
        }

        monthContainer.appendChild(monthHeader);
        monthContainer.appendChild(daysGrid);
        calendarGrid.appendChild(monthContainer);
    });

    calendarGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
    `;
}

// Generate DCA Comparison Chart
function generateDCAChart() {
    const canvas = document.getElementById('dca-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size - increased height for better spacing
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 500 * 2;
    ctx.scale(2, 2);

    const width = canvas.width / 2;
    const height = canvas.height / 2;
    const padding = 60; // Increased padding for labels

    // Simulate data (2015-2024, 10 years)
    const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

    // Starting with 50000€, compound at 12.3% (DCA fix) and 14.1% (DCA adapted = 12.3 + 1.8)
    const dcaFixData = [50000];
    const dcaAdaptedData = [50000];

    for (let i = 1; i < 10; i++) {
        dcaFixData.push(dcaFixData[i-1] * 1.123);
        dcaAdaptedData.push(dcaAdaptedData[i-1] * 1.141);
    }

    // Find max value for scaling
    const maxValue = Math.max(...dcaAdaptedData);
    const minValue = Math.min(...dcaFixData);

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height - 2 * padding) * i / 5;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw DCA Fix line (blue)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    years.forEach((year, i) => {
        const x = padding + (width - 2 * padding) * i / (years.length - 1);
        const y = height - padding - (height - 2 * padding) * (dcaFixData[i] - minValue) / (maxValue - minValue);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw DCA Adapted line (green)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    years.forEach((year, i) => {
        const x = padding + (width - 2 * padding) * i / (years.length - 1);
        const y = height - padding - (height - 2 * padding) * (dcaAdaptedData[i] - minValue) / (maxValue - minValue);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw points and labels
    ctx.font = '14px DM Sans';
    ctx.textAlign = 'center';

    years.forEach((year, i) => {
        const x = padding + (width - 2 * padding) * i / (years.length - 1);

        // Year label - increased spacing
        ctx.fillStyle = '#6b7280';
        ctx.fillText(year, x, height - padding + 30);

        // Value points
        const yFix = height - padding - (height - 2 * padding) * (dcaFixData[i] - minValue) / (maxValue - minValue);
        const yAdapted = height - padding - (height - 2 * padding) * (dcaAdaptedData[i] - minValue) / (maxValue - minValue);

        // DCA Fix point
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, yFix, 4, 0, 2 * Math.PI);
        ctx.fill();

        // DCA Adapted point
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, yAdapted, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw legend
    ctx.font = '14px DM Sans';
    ctx.textAlign = 'left';

    // DCA Fix
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(width - 250, 20, 20, 3);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('DCA Fix (standard)', width - 225, 25);

    // DCA Adapted
    ctx.fillStyle = '#10b981';
    ctx.fillRect(width - 250, 40, 20, 3);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('DCA Adaptat (+17-70 bp/an)', width - 225, 45);

    // Final values
    ctx.font = 'bold 16px DM Sans';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(`${Math.round(dcaFixData[9]).toLocaleString('ro-RO')}€`, width - 250, 70);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`${Math.round(dcaAdaptedData[9]).toLocaleString('ro-RO')}€`, width - 250, 90);
}

// Generate Seasonality Chart
function generateSeasonalityChart() {
    const canvas = document.getElementById('seasonality-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size - increased for better visibility
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 500 * 2;
    ctx.scale(2, 2);

    const width = canvas.width / 2;
    const height = canvas.height / 2;
    const padding = 60; // Increased padding

    // Data: Average monthly returns 1950-2025 (corrected)
    const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const returns = [1.2, -0.1, 0.5, 1.2, 0.1, 0.8, 1.7, 0.7, -0.7, 0.5, 1.5, 1.3];

    // Top 3 months (for special coloring)
    const topMonths = [6, 10, 11]; // July, November, December

    const maxReturn = Math.max(...returns);
    const minReturn = Math.min(...returns);
    const range = maxReturn - minReturn;

    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw zero line
    const zeroY = height - padding - (height - 2 * padding) * (0 - minReturn) / range;
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, zeroY);
    ctx.lineTo(width - padding, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw bars
    const barWidth = (width - 2 * padding) / months.length * 0.8;
    const barSpacing = (width - 2 * padding) / months.length;

    months.forEach((month, i) => {
        const x = padding + barSpacing * i + barSpacing * 0.1;
        const returnValue = returns[i];
        const barHeight = Math.abs((height - 2 * padding) * returnValue / range);

        let y;
        let barColor;

        if (returnValue < 0) {
            // Negative month - RED
            y = zeroY;
            barColor = '#ef4444';
        } else if (topMonths.includes(i)) {
            // Top 3 months - INTENSE GREEN
            y = zeroY - barHeight;
            barColor = '#059669';
        } else {
            // Neutral months - YELLOW/ORANGE
            y = zeroY - barHeight;
            barColor = '#f59e0b';
        }

        ctx.fillStyle = barColor;

        // Draw bar
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw month label - larger font
        ctx.fillStyle = '#6b7280';
        ctx.font = '13px DM Sans';
        ctx.textAlign = 'center';
        ctx.fillText(month, x + barWidth / 2, height - padding + 25);

        // Draw value label - larger font
        if (returnValue < 0) {
            ctx.fillStyle = '#dc2626';
        } else if (topMonths.includes(i)) {
            ctx.fillStyle = '#059669';
        } else {
            ctx.fillStyle = '#d97706';
        }
        ctx.font = 'bold 13px DM Sans';
        ctx.fillText(`${returnValue > 0 ? '+' : ''}${returnValue}%`, x + barWidth / 2, returnValue >= 0 ? y - 8 : y + barHeight + 18);
    });

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px DM Sans';
    ctx.textAlign = 'left';
    ctx.fillText('Return Mediu Lunar (%) - S&P 500, 1950-2025', padding, padding - 15);

    // Draw legend
    ctx.font = '12px DM Sans';
    const legendX = width - 280;
    const legendY = 30;

    // Green legend
    ctx.fillStyle = '#059669';
    ctx.fillRect(legendX, legendY, 15, 15);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Top 3 luni', legendX + 20, legendY + 11);

    // Yellow legend
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(legendX, legendY + 25, 15, 15);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Luni neutre', legendX + 20, legendY + 36);

    // Red legend
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(legendX, legendY + 50, 15, 15);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Luni negative', legendX + 20, legendY + 61);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect removed - kept hero always visible

// Animate portfolio allocation bars on scroll
const animateAllocationBars = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.allocation-segment');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transition = 'all 1s ease';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const allocationBars = document.querySelectorAll('.allocation-bar');
    allocationBars.forEach(bar => observer.observe(bar));
};

animateAllocationBars();

// Add hover effect to window cards
document.querySelectorAll('.window-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Console message
console.log('%c🎯 Masterclass: Timing & Execuție în Investiții', 'font-size: 20px; font-weight: bold; color: #10b981;');
console.log('%cSistemul bate ghicirea. De fiecare dată.', 'font-size: 14px; color: #6b7280;');
