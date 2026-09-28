import "./App.css";
import TransactionForm from "./Components/TransactionForm";
import { useState, useEffect } from "react";
import TransactionList from "./Components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]); // yahaan hum transactions ke liye state create kar rhe h jisme hum user ke input ko store karenge.

  const [search, setSearch] = useState(""); // ye hum search state  lga rhe h taaki search ki hui value ko store aur update kar sake

  const [filterType, setFilterType] = useState("All"); // ye hum transactions ke type ko filter karne ke liye kar rhe h

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.title.toLowerCase().includes(search.toLowerCase()) && // yaha hum apne transaction ko search ke hisab se filter karke show karenge
      (filterType === "All" || transaction.type === filterType), // yaha hum type bhi filter kar rhe h yani sirf wahi transactio dikhaye jo hum  select kiye ho
  );

  const [isLoaded, setIsLoaded] = useState(false);
  // ab hum apne transactions ko loacalstorage me save karenge useEffect ka use karke
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  // ab hum saved transactions ko wapas screen pe layenge
  useEffect(() => {
    const savedTransaction = localStorage.getItem("transactions");
    if (savedTransaction) {
      setTransactions(JSON.parse(savedTransaction));
    }
    setIsLoaded(true);
  }, []);

  const [editingId, setEditingId] = useState(null); //Humne ye track karne ke liye use kiya hai ki currently kaunsa transaction edit ho raha hai.
  const [showForm, setShowForm] = useState(false); // ye hum form ko hide rakhne ke liye kar rhe h taaki form button click hone par hi show ho

  function addTransaction(transaction) {
    // New transaction object bana rahe hain
    const newTransaction = {
      id: Date.now(), // Isko ek unique ID de rahe hain
      ...transaction, // Current transaction ki saari properties copy kar rahe hain
    };
    // Purane transactions ko rakho + new transaction add karo
    setTransactions([...transactions, newTransaction]);

    // Transaction add hone ke baad form hide karo
    setShowForm(false);
  }

  // ye function hum harr transaction ke sath delete button attach karne kae liyye use kar rhe h
  function deleteTransaction(id) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
    /* 
          // Jis transaction ki ID given ID se match nahi karti,
          // un sab transactions ko new array mein rakhenge.
        // Matching ID wala transaction remove ho jayega. */
  }

  function updateTransaction(id, updatedTransaction) {
    setTransactions(
      transactions.map((transaction) => {
        // Jis transaction ki ID match hogi,
        // usko updated transaction se replace karenge
        if (transaction.id === id) {
          return {
            ...updatedTransaction,
            id: transaction.id, // original ID ko preserve kar rahe hain
          };
        }
        // Baaki transactions same rahenge
        return transaction;
      }),
    );
    setEditingId(null);
    setShowForm(false);
  }

  function editTransaction(id) {
    //ye hum edit button ka function likh rhe h
    setEditingId(id);
    setShowForm(true);
  }

  // total income ko calculate karke usko income wale card me dikhane ke liey ye function
  function totalIncome() {
    const incomeTransaction = transactions.filter(
      (transaction) => transaction.type === "Income",
    );
    const total = incomeTransaction.reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);
    return total;
  }

  // ab hum same function Total expense ke liye bhi bana rhe h
  function totalExpense() {
    const expenseTransaction = transactions.filter(
      (transaction) => transaction.type === "Expense",
    );
    const Total = expenseTransaction.reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);
    return Total;
  }

  return (
    <div className="app">
      <h1>Expense-Income-Manager</h1>

    <div className="summaryCards">

      <div className="incomeCard">
        <p>Total Income</p>
        <p>₹{totalIncome()}</p>
      </div>

      <div className="balanceCard">
        <p>Total Balance</p>
        <p>₹{totalIncome() - totalExpense()}</p>
      </div>

      <div className="expenseCard">
        <p>Total Expense</p>
        <p>₹{totalExpense()}</p>
      </div>

      </div>

      <button className="transactionBtn" onClick={() => setShowForm(!showForm)}>
        Add Transaction
      </button>

      {/* yaha hum props pass kar rhe h components ko  */}

      {showForm && ( //ager showForm true hua to ye component show hoga verna nhi hoga ye condition isme lagayi gyi h
        <TransactionForm
          addTransaction={addTransaction}
          editingId={editingId}
          transactions={transactions}
          updateTransaction={updateTransaction}
        />
      )}

      <div className="filterSection">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search here"
      />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
      </div>
  );
}

export default App;
