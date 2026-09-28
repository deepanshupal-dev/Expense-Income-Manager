import { useState, useEffect } from "react";

// yaha humne addTransaction ko as a props liya h aur bhi baaki ke props hi h 
const TransactionForm = ({
  addTransaction,
  editingId,
  transactions,
  updateTransaction,
}) => {
  
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Income",
    category: "Food",
  });

  // hum ek function banayenge ki form submit hone ke baad form me koi data n rhe vo empty ho jaye
  function resetForm() {
    setFormData({
      title: "",
      amount: "",
      type: "Income",
      category: "Food",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.title.trim() === "") {
      alert("Enter the Title");
      return;
    }
    if (Number(formData.amount) <= 0) {
      alert("Enter the Valid Amount");
      return;
    }

    if (editingId === null) {
      addTransaction(formData); // ab ye data parent element ko share hoga ya bheja ja rha h
    } else {
      updateTransaction(editingId, formData);
    }
    resetForm();
  }

  // yaha hum edit button click hone ke baad transation ke data ko wapas form me dalne ke liye ye kar rhe h taaki transaction update ho sake
  useEffect(() => {
    if (editingId !== null) {
      const transaction = transactions.find(
        (transaction) => transaction.id === editingId,
      );
      setFormData(transaction);
    }
  }, [editingId, transactions]);

  return (

    <div className="transactionForm">
      <h2> {editingId===null?"Add Transactions":"Edit Transaction"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={formData.title} 
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} // yahaan hum formData ke title ko update kar rhe h jab user input field me kuch type karega.
          placeholder="Enter the title"
        />

        <label>Amount</label>
        <input
          value={formData.amount}
          type="number"
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Enter the Amount"
        />

        <label>Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="Food">Food</option>
          <option value="Job">Job</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit"> {editingId===null?"Submit Transaction":"Update Transaction"}</button>
      </form>
    </div>
  );
};

export default TransactionForm;
