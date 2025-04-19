export class Budget {
    constructor(id, category, amount, period) {
        this.id = id || this.generateId();
        this.category = category;
        this.amount = parseFloat(amount);
        this.period = period; // 'monthly' o 'yearly'
        this.currentSpent = 0;
    }

    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    updateSpent(spent) {
        this.currentSpent = parseFloat(spent);
    }

    getRemainingAmount() {
        return this.amount - this.currentSpent;
    }

    getPercentage() {
        return (this.currentSpent / this.amount) * 100;
    }

    toJSON() {
        return {
            id: this.id,
            category: this.category,
            amount: this.amount,
            period: this.period,
            currentSpent: this.currentSpent
        };
    }

    static fromJSON(data) {
        const budget = new Budget(
            data.id,
            data.category,
            data.amount,
            data.period
        );
        budget.updateSpent(data.currentSpent);
        return budget;
    }
}