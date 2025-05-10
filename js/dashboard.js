document.addEventListener('DOMContentLoaded', function() {
    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.querySelector('.user-dropdown');

    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', () => {
            userDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Here you would typically load the corresponding content
            const section = link.getAttribute('href').substring(1);
            console.log(`Loading ${section} content...`);
        });
    });

    // Date range filter
    const dateRange = document.getElementById('dateRange');
    if (dateRange) {
        dateRange.addEventListener('change', () => {
            const selectedRange = dateRange.value;
            console.log(`Filtering transactions for: ${selectedRange}`);
            // Here you would typically fetch and update transactions based on the selected range
        });
    }

    // Quick action buttons
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const action = card.querySelector('span').textContent;
            console.log(`Performing action: ${action}`);
            // Here you would typically open the corresponding modal or page
        });
    });

    // Account action buttons
    const accountActions = document.querySelectorAll('.account-actions .btn');
    accountActions.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.textContent.trim();
            const accountCard = button.closest('.account-card');
            const accountType = accountCard.querySelector('h3').textContent;
            console.log(`Performing ${action} for ${accountType}`);
            // Here you would typically open the corresponding modal or page
        });
    });

    // View all transactions button
    const viewAllBtn = document.querySelector('.view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            console.log('Loading all transactions...');
            // Here you would typically load the full transactions page
        });
    }

    // Simulate loading transactions
    function loadTransactions() {
        const transactionsList = document.querySelector('.transactions-list');
        if (!transactionsList) return;

        // Clear existing transactions
        transactionsList.innerHTML = '';

        // Sample transaction data
        const transactions = [
            {
                icon: 'shopping-cart',
                title: 'Grocery Store',
                date: 'Today, 2:30 PM',
                amount: -85.50,
                type: 'debit'
            },
            {
                icon: 'money-bill-wave',
                title: 'Salary Deposit',
                date: 'Yesterday, 9:00 AM',
                amount: 3500.00,
                type: 'credit'
            },
            {
                icon: 'utensils',
                title: 'Restaurant',
                date: 'Yesterday, 7:15 PM',
                amount: -45.75,
                type: 'debit'
            },
            {
                icon: 'home',
                title: 'Rent Payment',
                date: '2 days ago',
                amount: -1200.00,
                type: 'debit'
            }
        ];

        // Create transaction items
        transactions.forEach(transaction => {
            const item = document.createElement('div');
            item.className = 'transaction-item';
            item.innerHTML = `
                <div class="transaction-icon">
                    <i class="fas fa-${transaction.icon}"></i>
                </div>
                <div class="transaction-details">
                    <h4>${transaction.title}</h4>
                    <p class="date">${transaction.date}</p>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'credit' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}
                </div>
            `;
            transactionsList.appendChild(item);
        });
    }

    // Load initial transactions
    loadTransactions();

    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.innerHTML;
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Simulate loading state
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 1000);
            }
        });
    });

    // Add animation to account cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.account-card, .action-card').forEach(card => {
        observer.observe(card);
    });
}); 