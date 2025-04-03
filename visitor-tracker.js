// Visitor Tracking System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visitor tracking system
    initVisitorTracking();
    
    function initVisitorTracking() {
        // Get current date in format YYYY-MM-DD
        const today = new Date();
        const dateString = formatDate(today);
        
        // Calculate yesterday's date string
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = formatDate(yesterday);
        
        // Initialize localStorage if first time
        if (!localStorage.getItem('visitorStats')) {
            localStorage.setItem('visitorStats', JSON.stringify({
                allTimeVisits: 0,
                dailyVisits: {},
                lastVisit: null
            }));
        }
        
        // Get visitor stats from localStorage
        let stats = JSON.parse(localStorage.getItem('visitorStats'));
        
        // Check if this is a new visit (at least 30 minutes since last visit)
        const isNewVisit = isNewVisitor(stats.lastVisit);
        
        if (isNewVisit) {
            // Increment all time count
            stats.allTimeVisits++;
            
            // Initialize today's count if not exists
            if (!stats.dailyVisits[dateString]) {
                stats.dailyVisits[dateString] = 0;
            }
            
            // Increment today's count
            stats.dailyVisits[dateString]++;
            
            // Update last visit timestamp
            stats.lastVisit = new Date().getTime();
            
            // Save updated stats to localStorage
            localStorage.setItem('visitorStats', JSON.stringify(stats));
        }
        
        // Update display
        updateVisitorDisplay(stats, dateString, yesterdayString);
    }
    
    function isNewVisitor(lastVisitTime) {
        if (!lastVisitTime) return true;
        
        // Consider it a new visit if 30+ minutes have passed
        const thirtyMinutes = 30 * 60 * 1000;
        return (new Date().getTime() - lastVisitTime) > thirtyMinutes;
    }
    
    function formatDate(date) {
        return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
    }
    
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }
    
    function updateVisitorDisplay(stats, todayString, yesterdayString) {
        // Get today's count
        const todayCount = stats.dailyVisits[todayString] || 0;
        const todayElement = document.getElementById('today-count');
        if (todayElement) {
            todayElement.textContent = todayCount.toLocaleString();
        }
        
        // Get yesterday's count
        const yesterdayCount = stats.dailyVisits[yesterdayString] || 0;
        const yesterdayElement = document.getElementById('yesterday-count');
        if (yesterdayElement) {
            yesterdayElement.textContent = yesterdayCount.toLocaleString();
        }
        
        // Get all time count
        const alltimeElement = document.getElementById('alltime-count');
        if (alltimeElement) {
            alltimeElement.textContent = stats.allTimeVisits.toLocaleString();
        }
    }
});
