export class Transaction {
    constructor(id, type, amount, category, date, description) {
        this.id = id || this.generateId();
        this.type = type; // 'income' o 'expense'
        this.amount = parseFloat(amount);
        this.category = category;
        this.date = date instanceof Date ? date : new Date(date);
        this.description = description || '';
    }

    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            amount: this.amount,
            category: this.category,
            date: this.date.toISOString(),
            description: this.description
        };
    }

    static fromJSON(data) {
        return new Transaction(
            data.id,
            data.type,
            data.amount,
            data.category,
            new Date(data.date),
            data.description
        );
    }
}