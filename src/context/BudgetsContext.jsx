import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

const BudgetsContext = createContext();

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter((expense) => expense.budgetId === budgetId);
    };
    const addBudget = ({ name, max }) => {
        setBudgets((prevBudgets) => {
            if (prevBudgets.find((budget) => budget.name === name))
                return prevBudgets;
            return [...prevBudgets, { id: nanoid(), name, max }];
        });
    };
    const addExpense = ({ description, amount, budgetId }) => {
        setExpenses((prevExpenses) => {
            return [
                ...prevExpenses,
                { id: nanoid(), description, amount, budgetId },
            ];
        });
    };
    const deleteBudget = ({ id }) =>
        setBudgets((prevBudgets) =>
            prevBudgets.filter((budget) => budget.id !== id)
        );
    const deleteExpense = ({ id }) =>
        setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== id)
        );

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    );
};
