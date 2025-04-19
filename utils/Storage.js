// src/utils/Storage.js
import { Transaction } from '../models/Transaction.js';
import { Budget } from '../models/Budget.js';
import { SavingGoal } from '../models/SavingGoal.js';

export class Storage {
    constructor() {
        this.storage = window.localStorage;
        this.keys = {
            transactions: 'finanzas_transactions',
            budgets: 'finanzas_budgets',
            savingGoals: 'finanzas_saving_goals',
            categories: 'finanzas_categories'
        };
        
        // Inicializar categorías predeterminadas si no existen
        if (!this.getCategories().length) {
            this.initializeDefaultCategories();
        }
    }

    // Transacciones
    getTransactions() {
        const data = this.storage.getItem(this.keys.transactions);
        if (!data) return [];
        
        try {
            const parsed = JSON.parse(data);
            return parsed.map(item => Transaction.fromJSON(item));
        } catch (e) {
            console.error('Error al cargar transacciones:', e);
            return [];
        }
    }

    saveTransaction(transaction) {
        const transactions = this.getTransactions();
        const index = transactions.findIndex(t => t.id === transaction.id);
        
        if (index !== -1) {
            transactions[index] = transaction;
        } else {
            transactions.push(transaction);
        }
        
        this.storage.setItem(this.keys.transactions, JSON.stringify(transactions.map(t => t.toJSON())));
        return transaction;
    }

    deleteTransaction(transactionId) {
        let transactions = this.getTransactions();
        transactions = transactions.filter(t => t.id !== transactionId);
        this.storage.setItem(this.keys.transactions, JSON.stringify(transactions.map(t => t.toJSON())));
    }

    // Presupuestos
    getBudgets() {
        const data = this.storage.getItem(this.keys.budgets);
        if (!data) return [];
        
        try {
            const parsed = JSON.parse(data);
            return parsed.map(item => Budget.fromJSON(item));
        } catch (e) {
            console.error('Error al cargar presupuestos:', e);
            return [];
        }
    }

    saveBudget(budget) {
        const budgets = this.getBudgets();
        const index = budgets.findIndex(b => b.id === budget.id);
        
        if (index !== -1) {
            budgets[index] = budget;
        } else {
            budgets.push(budget);
        }
        
        this.storage.setItem(this.keys.budgets, JSON.stringify(budgets.map(b => b.toJSON())));
        return budget;
    }

    deleteBudget(budgetId) {
        let budgets = this.getBudgets();
        budgets = budgets.filter(b => b.id !== budgetId);
        this.storage.setItem(this.keys.budgets, JSON.stringify(budgets.map(b => b.toJSON())));
    }

    // Objetivos de Ahorro
    getSavingGoals() {
        const data = this.storage.getItem(this.keys.savingGoals);
        if (!data) return [];
        
        try {
            const parsed = JSON.parse(data);
            return parsed.map(item => SavingGoal.fromJSON(item));
        } catch (e) {
            console.error('Error al cargar objetivos de ahorro:', e);
            return [];
        }
    }

    saveSavingGoal(goal) {
        const goals = this.getSavingGoals();
        const index = goals.findIndex(g => g.id === goal.id);
        
        if (index !== -1) {
            goals[index] = goal;
        } else {
            goals.push(goal);
        }
        
        this.storage.setItem(this.keys.savingGoals, JSON.stringify(goals.map(g => g.toJSON())));
        return goal;
    }

    deleteSavingGoal(goalId) {
        let goals = this.getSavingGoals();
        goals = goals.filter(g => g.id !== goalId);
        this.storage.setItem(this.keys.savingGoals, JSON.stringify(goals.map(g => g.toJSON())));
    }

    // Categorías
    getCategories() {
        const data = this.storage.getItem(this.keys.categories);
        if (!data) return [];
        
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Error al cargar categorías:', e);
            return [];
        }
    }

    saveCategory(category) {
        const categories = this.getCategories();
        if (!categories.find(c => c.id === category.id)) {
            categories.push(category);
            this.storage.setItem(this.keys.categories, JSON.stringify(categories));
        }
        return category;
    }

    deleteCategory(categoryId) {
        let categories = this.getCategories();
        categories = categories.filter(c => c.id !== categoryId);
        this.storage.setItem(this.keys.categories, JSON.stringify(categories));
    }

    initializeDefaultCategories() {
        const incomeCategories = [
            { id: 'salary', name: 'Salario', type: 'income' },
            { id: 'investment', name: 'Inversiones', type: 'income' },
            { id: 'freelance', name: 'Trabajo freelance', type: 'income' },
            { id: 'gifts', name: 'Regalos', type: 'income' },
            { id: 'other_income', name: 'Otros ingresos', type: 'income' }
        ];

        const expenseCategories = [
            { id: 'housing', name: 'Vivienda', type: 'expense' },
            { id: 'food', name: 'Alimentación', type: 'expense' },
            { id: 'transport', name: 'Transporte', type: 'expense' },
            { id: 'utilities', name: 'Servicios', type: 'expense' },
            { id: 'health', name: 'Salud', type: 'expense' },
            { id: 'entertainment', name: 'Entretenimiento', type: 'expense' },
            { id: 'education', name: 'Educación', type: 'expense' },
            { id: 'shopping', name: 'Compras', type: 'expense' },
            { id: 'savings', name: 'Ahorros', type: 'expense' },
            { id: 'other_expense', name: 'Otros gastos', type: 'expense' }
        ];

        const defaultCategories = [...incomeCategories, ...expenseCategories];
        this.storage.setItem(this.keys.categories, JSON.stringify(defaultCategories));
    }

    // Utilidades
    clearAllData() {
        Object.values(this.keys).forEach(key => {
            this.storage.removeItem(key);
        });
        this.initializeDefaultCategories();
    }
}

// Singleton instance
export const storageInstance = new Storage();