export class SavingGoal {
    constructor(id, name, targetAmount, deadline, description) {
        this.id = id || this.generateId();
        this.name = name;
        this.targetAmount = parseFloat(targetAmount);
        this.deadline = deadline instanceof Date ? deadline : new Date(deadline);
        this.description = description || '';
        this.currentAmount = 0;
        this.contributions = [];
    }

    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    addContribution(amount, date) {
        const contribution = {
            id: this.generateId(),
            amount: parseFloat(amount),
            date: date instanceof Date ? date : new Date(date)
        };
        this.contributions.push(contribution);
        this.currentAmount += contribution.amount;
        return contribution;
    }

    removeContribution(contributionId) {
        const index = this.contributions.findIndex(c => c.id === contributionId);
        if (index !== -1) {
            const contribution = this.contributions[index];
            this.currentAmount -= contribution.amount;
            this.contributions.splice(index, 1);
            return true;
        }
        return false;
    }

    getProgress() {
        return (this.currentAmount / this.targetAmount) * 100;
    }

    getDaysRemaining() {
        const today = new Date();
        const diffTime = this.deadline.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            targetAmount: this.targetAmount,
            deadline: this.deadline.toISOString(),
            description: this.description,
            currentAmount: this.currentAmount,
            contributions: this.contributions.map(c => ({
                id: c.id,
                amount: c.amount,
                date: c.date.toISOString()
            }))
        };
    }

    static fromJSON(data) {
        const goal = new SavingGoal(
            data.id,
            data.name,
            data.targetAmount,
            new Date(data.deadline),
            data.description
        );
        goal.currentAmount = data.currentAmount;
        goal.contributions = data.contributions.map(c => ({
            id: c.id,
            amount: c.amount,
            date: new Date(c.date)
        }));
        return goal;
    }
}